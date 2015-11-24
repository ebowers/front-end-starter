// ---------------------------------------
// JS Task
// ---------------------------------------
// Here we're using uglify(minification), size(lists file sizes), concat(combines files)

module.exports = function (gulp, plugins) {
  return function () {

    var paths = {
        jsSource: 'dev/js/',
        jsDestination: 'dist/js'
    };

    gulp.src(paths.jsSource +'main.js')
    .pipe(plugins.uglify())
    .pipe(plugins.size({ gzip: true, showFiles: true }))
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest(paths.jsDestination));
  };
};
