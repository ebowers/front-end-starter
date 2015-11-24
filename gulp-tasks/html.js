// ---------------------------------------
// HTML Task
// ---------------------------------------
// We're currently just moving the html to the dist folder with this task

module.exports = function (gulp, plugins) {
  return function () {

    var paths = {
        htmlSource: '**',
        htmlDestination: 'dist/'
    };

    gulp.src(paths.htmlSource +'*.html')
    .pipe(plugins.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(paths.htmlDestination));
  };
};
