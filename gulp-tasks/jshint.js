// ---------------------------------------
// JS Hint Task
// ---------------------------------------
// We're using it to throw errors in the console.
// We keep this task seperate in case we need to run it by itself.

module.exports = function (gulp, plugins) {
  return function () {
    var paths = {
        jsSource: 'dev/js/',
        jsDestination: 'dist/js'
    };

    gulp.src(paths.jsDestination + 'main.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));

  };
};
