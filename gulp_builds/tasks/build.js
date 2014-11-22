'use strict';

var gulp = require('gulp')
  , concat = require('gulp-concat')
  , paths = require('../paths');

gulp.task('build-all', function() {
  var src = [
    paths.dist + '{*|!angular-srph-xhr}.js',
    paths.src + 'module.js',
    paths.src + 'provider.js'
  ];

  gulp.src(src)
    .pipe(concat('angular-srph-xhr.js'))
    .pipe(gulp.dest(paths.dist));
});