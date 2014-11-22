var gulp = require('gulp')
  , paths = require('./gulp_builds/paths');

/** import tasks */
require(paths.tasks + 'build.js');
require(paths.tasks + 'uglify.js');

/* Sychronous */
gulp.task('build', ['build-all', 'uglify']);

gulp.task('default', function() {
  gulp.run('build');

  gulp.watch(paths.button + '*.js', ['build-button']);
  gulp.watch(paths.dist + '*.js', ['uglify']);
});