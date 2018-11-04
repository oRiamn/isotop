'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');

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

gulp.task('watch', function () {
    gulp.watch(`${src}/style/**/*.scss`, ['sass']);
});

gulp.task('default', ['sass', 'watch']);