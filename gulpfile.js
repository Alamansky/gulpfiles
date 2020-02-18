const gulp = require("gulp");
const imagemin = require("gulp-imagemin");

const BASEDIR = "./public";

//paths var
const path = {
  raw: `${BASEDIR}/raw_imgs/*.jpg`,
  opt: `${BASEDIR}/opt_imgs/`
};

gulp.task("default", () =>
  gulp
    .src(path.raw)
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest(path.opt))
);
