'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const fileinclude = require('gulp-file-include');
const concat = require('gulp-concat');

const src = './app/src';
const dest = './app/dist';
 
gulp.task('javascript', function() {
  return gulp.src(`${src}/js/**/*.js`)
    .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${dest}/js`));
});

gulp.task('html', function() {
    return gulp.src(`${src}/**/*.html`)
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest(`${dest}`));
});

gulp.task('sass', function () {
    return gulp.src(`${src}/style/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 1 Electron version'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${dest}/style`));
});

gulp.task('images', function () {
    return gulp.src(`${src}/img/**/*.+(png|jpg|jpeg|gif|svg)`)
        .pipe(imagemin({
            interlaced: true,
        }))
        .pipe(gulp.dest(`${dest}/img`))
});

gulp.task('watch', function () {
    gulp.watch(`${src}/style/**/*.scss`, ['sass']);
    gulp.watch(`${src}/html/**/*.html`, ['html']);
    gulp.watch(`${src}/js/**/*.js`, ['javascript']);
    gulp.watch(`${src}/img/**/*.+(png|jpg|jpeg|gif|svg)`, ['images']);
});

gulp.task('default', ['sass','images','html', 'javascript', 'watch']);