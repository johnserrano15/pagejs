const gulp = require('gulp');
// const sass = require('gulp-sass');
const rename = require('gulp-rename');
// const babel = require('babelify');
const browserify = require('browserify'); 
const watchify = require('watchify'); 
const source = require('vinyl-source-stream');

/*gulp.task('styles', function () {
  gulp
    .src('index.scss')
    .pipe(sass())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public'));
})*/

// Enviar todo lo que esta en el folder assets a public
/*gulp.task('assets', function () {
  gulp
    .src('assets/*')
    .pipe(gulp.dest('public'));
})
*/
function compile(watch) {
  var bundle = browserify('./src/index.js', {debug: true});

  if (watch) {
    bundle = watchify(bundle);
    bundle.on('update', function () {
      console.log('--> Bundling...');
      rebundle();
    });
  }

  function rebundle() {
    bundle
      // .transform(babel, { presets: [ 'es2015' ], plugins: [ 'syntax-async-functions', 'transform-regenerator' ] })
      .bundle()
      .on('error', function (err) { console.log(err); this.emit('end') })
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'));
  }

  rebundle();
}

gulp.task('build', function () {
  return compile();
});

gulp.task('watch', function () { return compile(true); });

// gulp.task('default', ['styles', 'assets', 'build']);
gulp.task('default', ['build']);