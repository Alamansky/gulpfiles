// dependencies
const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
var reload = browserSync.reload;

// dev server vars
const PORT = 3000;
const BASEDIR = "./public";

// path vars
const path = {
  html: `${BASEDIR}/*.html`,
  css: `${BASEDIR}/`,
  sass: `${BASEDIR}/*.scss`,
  js: `${BASEDIR}/*.js`
};

// dev server task
gulp.task("serve", function() {
  browserSync.init({
    server: BASEDIR,
    port: PORT
  });
});

// sass task
gulp.task("sass", function() {
  return gulp
    .src(path.sass)
    .pipe(sass())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(path.css))
    .pipe(reload({ stream: true }));
  // ^ reload browsersync after transform
});

// defaultask - call from terminal with `npx gulp`
gulp.task("default", function() {
  // dev server is independant task - `gulp.series` returns func from string which is then executed
  gulp.series("serve")();

  // abbreviated gulp.watch syntax for sass watch
  gulp.watch(path.sass, gulp.series("sass"));
  gulp.watch(path.html).on("change", reload);
  gulp.watch(path.js).on("change", reload);
});
