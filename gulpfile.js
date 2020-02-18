// dependencies
const gulp = require("gulp");
const browserSync = require("browser-sync").create();
var reload = browserSync.reload;

// dev server vars
const PORT = 3000;
const BASEDIR = "./public";

// path variables
const path = {
  html: `${BASEDIR}/*.html`,
  css: `${BASEDIR}/*.css`,
  js: `${BASEDIR}/*.js`
};

// defaultask - call from terminal with `npx gulp`
// start dev server then order gulp to watch files defined in path obj
gulp.task("default", function() {
  browserSync.init({
    server: BASEDIR,
    port: PORT
  });

  // `gulp.series` not needed bc browsersync already exposes reload func
  gulp.watch(path.html).on("change", reload);
  gulp.watch(path.css).on("change", reload);
  gulp.watch(path.js).on("change", reload);
});
