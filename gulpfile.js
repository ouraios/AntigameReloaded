const gulp = require('gulp');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');

const SRC = 'src/*.js';
const DEST = 'js';

gulp.task('stream', function () {
    // Endless stream mode
    return watch(SRC, { ignoreInitial: false })
        .pipe(uglify()).pipe(gulp.dest(DEST));
});

gulp.task('callback', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch(SRC, function () {
        gulp.src(SRC)
            .pipe(uglify()).pipe(gulp.dest(DEST));
    });
});