// ---------------------------------------
// Style Task
// ---------------------------------------
// We're using PostCSS to handle style specific manipulation.
// We're doing this because we get to pick exactly what we need.
// Each PostCSS plugin gets managed individually and is more modular.

module.exports = function (gulp, plugins) {
  return function () {
    var paths = {
        cssSource: 'dev/scss/',
        cssDestination: 'dist/css'
    };
    var processors = [
        plugins.lost({}),
        plugins.cssnano({}),
        plugins.autoprefixer({browsers:['last 2 versions']})
    ];
  return gulp.src(paths.cssSource + 'main.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    // .pipe(plugins.postcss(processors))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.cssDestination));
  };
};
