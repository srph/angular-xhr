'use strict';

var gulp = require('gulp')
  , concat = require('gulp-concat')
  , annotate = require('gulp-ng-annotate')
  , plumber = require('gulp-plumber')
  , paths = require('../paths');

gulp.task('build-all', function() {
  var src = [
    paths.src + 'module.js',
    paths.src + '*.js',
  ]

  return gulp.src(src)
    .pipe(plumber())
    .pipe(concat('angular-srph-xhr.js'))
    .pipe(annotate())
    .pipe(gulp.dest(paths.dist));
});