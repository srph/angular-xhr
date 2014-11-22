var gulp = require('gulp')
  , paths = require('./gulp_builds/paths')
  , express = require('express');

/** import tasks */
require(paths.tasks + 'build.js');
require(paths.tasks + 'uglify.js');
require(paths.tasks + 'server.js')(express.static(__dirname));

/* Sychronous */
gulp.task('build', ['build-all', 'uglify']);

gulp.task('default', function() {
  gulp.run('build');
  gulp.run('server');

  gulp.watch(paths.src + '*.js', ['build']);
  gulp.watch(paths.dist + 'angular-srph-xhr.js', ['uglify']);
});