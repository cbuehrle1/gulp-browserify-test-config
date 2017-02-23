var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var browserify = require("browserify");
var concat = require("gulp-concat");
var watchify = require('watchify');
var babelify = require('babelify');

gulp.task('default', ['sass', 'sass:watch', 'concat', 'concat:watch', 'build', 'watch', 'start']);

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

gulp.task('concat', function() {
  return gulp.src('./client/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./client/concat'));
});

gulp.task('concat:watch', function() {
  gulp.watch('./client/js/**/*.js', ['concat']);
});

function compile(watch) {
  var bundler = watchify(browserify('./client/concat/all.js', { debug: true }).transform(babelify, {presets: ["es2015", "react"]}));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('start', function () {
  nodemon({
    script: './server/server.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  })
});
