// dependencies
const gulp = require("gulp");
const sass = require("gulp-sass");

const BASEDIR = "./public";

// path variables
const path = {
  css: `${BASEDIR}/`,
  sass: `${BASEDIR}/*.scss`
};

// sass task
gulp.task("sass", function() {
  return gulp
    .src(path.sass)
    .pipe(sass())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(path.css));
});

// default ask - call from terminal with `npx gulp`
// `gulp.series` maps string "sass" to func called `on` method
gulp.task("default", function() {
  gulp.watch(path.sass).on("change", gulp.series("sass"));
});
