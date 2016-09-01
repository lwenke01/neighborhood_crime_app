'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const sources = {
  html: __dirname + '/app/**/*.html',
  js: __dirname + '/app/**/*.js',
  images: __dirname + '/app/**/*'
};
gulp.task('default', function() {
  return gulp.src('./app.js')
    .pipe(webpack())
    .pipe(gulp.dest('build/'));
});

gulp.task('build:css', function() {
  gulp.src('app/sass/index.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

gulp.task('bundle:dev', () => {
  return gulp.src(sources.js)
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('copy:html', () => {
  return gulp.src(sources.html)
    .pipe(gulp.dest('./build'));
});


gulp.task('default', ['bundle:dev', 'copy:html', 'build:css']);
