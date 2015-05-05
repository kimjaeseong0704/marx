'use strict';
var gulp = require('gulp');
var $g = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var scsslint = require('gulp-scss-lint');
var cp = require('child_process');

gulp.task('browser-sync', ['sass', 'jekyll'], function () {
	browserSync({
		server: {
			baseDir: '_site'
		}
	});
});

gulp.task('images', function () {
	gulp.src('public/_images-build/*.*')
		.pipe($g.imagemin())
		.pipe(gulp.dest('_site/public/images'))
		.pipe(gulp.dest('public/images/'));
});

gulp.task('js-hint', function() {
  return gulp.src('public/_js-build/*.js')
    .pipe($g.jshint())
    .pipe($g.jshint.reporter('jshint-stylish'));
});

gulp.task('js', ['js-hint'], function () {
	return gulp.src('public/_js-build/*.js')
		.pipe($g.rename(function (path) {
			path.basename += '.min';
    }))
		.pipe($g.sourcemaps.init({loadMaps: true}))
				.pipe($g.uglify())
		.pipe($g.sourcemaps.write('./'))
		.pipe(gulp.dest('public/js/'));
});

gulp.task('jekyll', function(done) {
  browserSync.notify('Compiling Jekyll');

  return cp.spawn('jekyll', ['build'], { stdio: 'inherit' })
  .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll'], function () {
	reload();
});

gulp.task('scss-lint', function(){
  return gulp.src('_sass/**/*.scss')
    .pipe(scsslint());
});

gulp.task('sass', ['scss-lint'], function () {
	return gulp.src('_sass/main.scss')
    .pipe($g.sourcemaps.init())
    .pipe($g.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
		.pipe($g.autoprefixer(['last 2 versions, > 5%'], {
			cascade: true
		}))
    .pipe($g.sourcemaps.write('.'))
		.pipe(gulp.dest('_site/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
		.pipe(gulp.dest('css'));
});

gulp.task('watch', ['images', 'js-hint', 'js', 'scss-lint', 'sass', 'browser-sync'], function () {
	gulp.watch('_sass/**/*.scss', ['scss-lint', 'sass', 'jekyll-rebuild']);
	gulp.watch('public/_js-build/*.js', ['js', 'jekyll-rebuild']);
	gulp.watch('public/_images-build/*.*', ['images', reload]);
	gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html',
		'_posts/*'
	], [
		'jekyll-rebuild'
	]);
});

gulp.task('default', ['images', 'js-hint', 'js', 'scss-lint', 'sass', 'browser-sync', 'watch']);
