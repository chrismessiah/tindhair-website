// Handy addons

// var jshint = require('gulp-jshint');
// var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');
// var cache = require('gulp-cache');

const SASS_PATH = 'assets/styles';
const SCRIPT_PATH = 'assets/scripts';

// *************************** IMPORTS ***********************************

// Basic tools
var gulp = require('gulp');
var open = require('gulp-open');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var del = require('del');
var minify = require('gulp-minify');
var pump = require('pump');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

// for CSS
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var stripCssComments = require('gulp-strip-css-comments');

// for JS
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');

// *************************** IMPORTS ***********************************



// **************************** CSS ******************************************

gulp.task('compile-sass', function() {
  return gulp.src(`${SASS_PATH}/master.sass`)
    .pipe(sass({indentedSyntax: true}))
    .pipe(rename({suffix: '.sass'}))
    .pipe(gulp.dest('public'));
});

gulp.task('concat-css',['compile-sass'], function() {
  return gulp.src([
    'public/master.sass.css',
    //'node_modules/sweetalert/src/sweetalert.css',
  ])
  .pipe(concat('master.css'))
  .pipe(gulp.dest('public'));
});

gulp.task('minify-css',['compile-sass', 'concat-css'], function() {
  return gulp.src('public/master.css')
  .pipe(rename({suffix: '.min'}))
  .pipe(stripCssComments())
  .pipe(cssnano())
  .pipe(gulp.dest('public'));
});

// **************************** CSS *******************************************




// **************************** JS  *******************************************

gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: 'assets/scripts/master.js',
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [reactify]
  });

  return b.bundle()
    .pipe(source('master.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest('./public/'));
});

// **************************** JS  *******************************************

// **************************** GULP TASKS  ***********************************

gulp.task('cleanup',['minify-css'], function() {
  del('public/master.js');
  del('public/master.css');
  del('public/master.sass.css');
});

gulp.task('styles', ['compile-sass', 'concat-css', 'minify-css']);
gulp.task('scripts', ['javascript']);
gulp.task('default', ['styles', 'scripts', 'cleanup', 'watch']);

gulp.task('watch', function() {
  gulp.watch(`${SASS_PATH}/*.sass`, ['styles', 'cleanup']);
  gulp.watch(['bower_components/*', `${SCRIPT_PATH}/*.js`], ['scripts', 'cleanup']);
  gulp.watch(['public/master.html', 'public/master.min.js', 'public/master.min.css']);
});
