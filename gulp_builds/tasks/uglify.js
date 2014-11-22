'use strict';

var gulp = require('gulp')
  , uglify = require('gulp-uglify')
  , rename = require('gulp-rename')
  , plumber = require('gulp-plumber')
  , paths = require('../paths');

gulp.task('uglify', ['build-all'], function() {
  return gulp.src(paths.dist + 'angular-srph-xhr.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist));
});