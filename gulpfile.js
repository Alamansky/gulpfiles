//require  Guilp
var gulp = require("gulp");

//require plugins for HTML task
const imagemin = require("gulp-imagemin"); //minifies images

//require plugins for CSS task
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cleancss = require("gulp-clean-css");

//require plugins for JS task
var concat = require("gulp-concat");
var jshint = require("gulp-jshint");
var uglify = require("gulp-uglify");
var pump = require("pump"); //required by gulp-uglify

//require plugins for Live Reload
var changed = require("gulp-changed");
var connect = require("gulp-connect-php"); //allows browserSync to process PHP
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

//HTML task: compresses images (on *.php change)
gulp.task("html", function() {
  return gulp
    .src("./assets/development/images/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 4 }),
        imagemin.svgo({ plugins: [{ removeViewBox: true }] })
      ])
    )
    .pipe(gulp.dest("./assets/production/images"));
});

//CSS task: compiles SASS, autoprefixes, and minifies (on *.scss change)
gulp.task("css", function() {
  gulp
    .src("./assets/development/sass/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleancss({ compatibility: "ie8" }))
    .pipe(gulp.dest("./assets/production/css"));
});

//JS 2 task: runs jshint, concatenates files, then moves master file to js-concat for access by original JS task
gulp.task("js2", function() {
  gulp
    .src("./assets/development/js/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("./assets/development/js-concat"));
});

//JS task: Calls JS2 task for debugging and concatenation, then compresses file (on *.js change)
gulp.task("js", ["js2"], function(cb) {
  pump(
    [
      gulp.src("./assets/development/js-concat/scripts.js"),
      uglify(),
      gulp.dest("./assets/production/js")
    ],
    cb
  );
});

//Watch task: calls the HTML, CSS, and JS task
gulp.task("watch", function() {
  connect.server({}, function() {
    browserSync.init({
      proxy: "http://127.0.0.1/wordpress/"
    });
  });

  gulp.watch("./*.php", ["html"]).on("change", function() {
    browserSync.reload();
  });

  gulp
    .watch("./assets/development/sass/*.scss", ["css"])
    .on("change", function() {
      browserSync.reload();
    });

  gulp.watch("./assets/development/js/*.js", ["js"]).on("change", function() {
    browserSync.reload();
  });
});

//Default task
gulp.task("default", ["watch"]);
