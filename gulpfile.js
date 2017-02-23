var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var browserify = require("browserify");

gulp.task('default', ['sass', 'sass:watch', 'babel', 'babel:watch', 'build', 'build:watch', 'start']);

gulp.task('sass', function () {
  //wildcard search for files
  return gulp.src('./client/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public'));
});

//for watching for scss file changes
gulp.task('sass:watch', function () {
  gulp.watch('./client/scss/**/*.scss', ['sass']);
});

gulp.task('babel', function() {
  return gulp.src('./client/js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel({
          presets: ['es2015', 'react'] // only es2015 preset now. React later.
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public'));
});

gulp.task('babel:watch', function () {
  gulp.watch('./client/js/**/*.js', ['babel']);
});

gulp.task('build', function () {

  return browserify({
    entries: "./public/script.js"
  }).bundle()
    .pipe(source('./bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public'));
});

gulp.task('build:watch', function() {
  gulp.watch('./public/script.js', ['build']);
});

gulp.task('start', function () {
  nodemon({
    script: './server/server.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  })
});
