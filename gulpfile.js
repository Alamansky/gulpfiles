const gulp = require("gulp");
const imagemin = require("gulp-imagemin");

const BASEDIR = "./public";

const path = {
  raw: `${BASEDIR}/raw_imgs/*.jpg`,
  opt: `${BASEDIR}/opt_imgs/`
};

//paths var

gulp.task("default", () =>
  gulp
    .src(path.raw)
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest(path.opt))
);
