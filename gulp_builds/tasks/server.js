var gulp = require('gulp')
  , express = require('express')
  , app = express();

/**
 * Opens an express "server" to the given directory
 * @param  {} dir [directory]
 */
module.exports = function serveExpressTo(dir) {
  gulp.task('server', function serverTask() {
    app.use(dir || express.static(__dirname));

    var server = app.listen(6969, function() {
      console.log('Listening to port %d', server.address().port);
    });
  });
}