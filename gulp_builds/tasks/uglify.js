'use strict';

var gulp = require('gulp')
  , uglify = require('gulp-uglify')
  , rename = require('gulp-rename')
  , paths = require('../paths');

gulp.task('uglify', function() {
  gulp.src(paths.dist + '*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist));
});