// ---------------------------------------
// Require Variables
// ---------------------------------------
// Here are all of the dependencies
// We install these by doing 'npm install --save-dev pluginName'

var gulp    = require('gulp'), // main gulp plugin
    postcss = require('gulp-postcss'), // post-production css modifications
    cssnano = require('cssnano'), // minifies css through postcss
    autoprefixer = require('autoprefixer'), // autoprefixes so you dont have to
    sourcemaps = require('gulp-sourcemaps'), // tells you the scss file a style came from in devtools
    lost    = require('lost'), // percentage based grid system
    sass    = require('gulp-sass'), // main sass library
    concat  = require('gulp-concat'), // combines various files
    uglify  = require('gulp-uglify'), // minifies files
    jshint  = require('gulp-jshint'), // does js error checking
    size    = require('gulp-size'), // lists file sizes in terminal
    browserSync = require('browser-sync'), // live reload & browser syncing
    reload = browserSync.reload; // browserSync specific variable

// ---------------------------------------
// Path Variables
// ---------------------------------------
// We use them below with dot notation 'example: path.cssSource'

var paths = {
    cssSource: 'dev/scss/',
    cssDestination: 'dist/css',
    jsSource: 'dev/js/',
    jsDestination: 'dist/js',
    bowerSource: 'bower_components/',
    bowerDestination: 'dev/js/vendor'
};

// ---------------------------------------
// Style Task
// ---------------------------------------
// We're using PostCSS to handle style specific manipulation.
// We're doing this because we get to pick exactly what we need.
// Each PostCSS plugin gets managed individually and is more modular.

gulp.task('style', function () {
  var processors = [
    lost({}),
    cssnano({}),
    autoprefixer({browsers:['last 2 versions']})
  ];
  return gulp.src(paths.cssSource + 'main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.cssDestination));
});

gulp.task('html', function(){
  return gulp.src('./*.html')
});

// ---------------------------------------
// JS Task
// ---------------------------------------
// When we move to using Webpack, we'll likely remove these, you can integrate Webpack & Gulp.
// Here we're using uglify(minification), size(lists file sizes), concat(combines files)

gulp.task('js', function() {
  gulp.src(paths.jsSource +'main.js')
    .pipe(uglify())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.jsDestination));
});

// ---------------------------------------
// JS Hint Task
// ---------------------------------------
// We're using it to throw errors in the console.
// We keep this task seperate in case we need to run it by itself.

gulp.task('jshint', function() {
  gulp.src(paths.jsDestination + 'main.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// ---------------------------------------
// JS Libs Task
// ---------------------------------------
// We're using it to minify & throw them into the dist folder.

// gulp.task( 'lib', function () {
//   return gulp.src( [
//       paths.bowerSource + 'calc-polyfill/calc.min.js',
//       paths.bowerSource + 'calc-polyfill/calc.min.js',
//     ])
//     .pipe(uglify())
//     .pipe( gulp.dest( paths.bowerDestination ))
// });

// ---------------------------------------
// Browser Sync Specific Tasks.
// ---------------------------------------
// First we're creating two new tasks which watch existing tasks.
// We do this because we want to make sure they run first and we see the changes automatically.
// We are attaching the Browser Sync Reload to each task.
gulp.task('style-watch', ['style'], browserSync.reload);
gulp.task('html-watch', ['html'], browserSync.reload);

// ---------------------------------------
// Watch Task
// ---------------------------------------
// It is running Browser Sync, & watching scss, js, & html files for changes.
gulp.task('watch', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('dev/scss/*.scss', ['style-watch']);
  gulp.watch('dev/js/*.js', ['jshint', 'js']);
  gulp.watch('*.html', ['html-watch']);
});

// ---------------------------------------
// Default Task
// ---------------------------------------
// If I run just 'gulp' all of my other tasks will run in the order their listed.

gulp.task('default', ['style', 'js', 'jshint', 'watch']);
