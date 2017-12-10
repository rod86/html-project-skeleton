var gulp    = require('gulp'),
    rename  = require('gulp-rename'),
    sass    = require('gulp-sass'),
    cssMin  = require('gulp-css'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    browserSync = require('browser-sync');

var srcPath = './src',
    buildPath = './dist',
    javascriptFiles = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        srcPath + '/js/script.js'
    ];

gulp.task('server', function() {
    browserSync.init({
        server: './'
    });

    gulp.watch([srcPath + '/sass/**/*.scss'], ['sass']);
    gulp.watch([srcPath + '/js/**/*.js'], ['js']);
    gulp.watch(['*.html'], browserSync.reload);
});

gulp.task('sass', function() {
    gulp.src(srcPath + '/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(buildPath))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src(javascriptFiles)
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('fonts'));
});

gulp.task('default', ['js', 'sass', 'server', 'fonts']);
