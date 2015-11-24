// ---------------------------------------
// JS Task
// ---------------------------------------
// Here we're using uglify(minification), size(lists file sizes), concat(combines files)

module.exports = function (gulp, plugins) {
  return function () {

    var paths = {
        bowerSource: 'bower_components/',
        bowerDestination: 'dist/js/vendor'
    };

    gulp.task( 'lib', function () {
      return gulp.src( [
          paths.bowerSource + 'calc-polyfill/calc.min.js',
          paths.bowerSource + 'contentloaded/src/contentloaded.min.js',
          paths.bowerSource + 'jquery/dist/jquery.min.js',
          paths.bowerSource + 'jquery-1.11.2/index.js',
          paths.bowerSource + 'modernizr/modernizr.js',
          paths.bowerSource + 'requestAnimationFrame/app/requestAnimationFrame.js',
          paths.bowerSource + 'respond/dest/respond.min.js',
          paths.bowerSource + 'selectivizr/selectivizr.js'
        ])
        .pipe(plugins.uglify())
        .pipe(gulp.dest( paths.bowerDestination ))
    });
  };
};
