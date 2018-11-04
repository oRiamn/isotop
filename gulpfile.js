'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let imagemin = require('gulp-imagemin');

let src = './app/src';
let dest = './app/dist';

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
    gulp.watch(`${src}/img/**/*.+(png|jpg|jpeg|gif|svg)`, ['images']);
});

gulp.task('default', ['sass','images','watch']);