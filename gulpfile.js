var gulp = require('gulp');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require("gulp-rename");
var wrap = require("gulp-wrap");
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('clean', function () {
    return del([
      'build/**/*'
  ]);
});

gulp.task('less', function () {
    return gulp.src('src/**/*.less')
        .pipe(concat('vitae.less'))
        .pipe(less())
        .pipe(gulp.dest('build/release/css'));
});

gulp.task('templates', function () {
    return gulp.src('src/**/*.html')
        .pipe(templateCache('templates.js', {
            module: 'vitae.templates',
            transformUrl: function (url) {
                return url.replace(/^.*\//, '')
            }
        }))
        .pipe(gulp.dest('src/templates'));
});

gulp.task('js', ['templates'], function () {
    return gulp.src(['src/**/module.js', 'src/**/*.js'])
        .pipe(concat('vitae.js'))
        .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
        .pipe(gulp.dest('build/release/js'));
});

gulp.task('js-min', ['js'], function () {
    return gulp.src('./dist/js/vitae.js')
        .pipe(rename('vitae.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('build/release/js'));
});

gulp.task('layout', function () {
    gulp.src('layout/**/*.*')
        .pipe(gulp.dest('build/release/'));
});

gulp.task('build', ['js-min', 'less', 'layout']);

gulp.task('clean-build', function () {
    runSequence('clean', 'build');
});

gulp.task('watch', ['js-min', 'less', 'layout'], function () {
    gulp.watch('src/**/*.less', ['less']);
    gulp.watch(['src/**/*.js', 'src/**/*.html'], ['js-min']);
    gulp.watch('layout/**/*.*', ['layout']);
});