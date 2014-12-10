var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var prefix = require('gulp-autoprefixer');

gulp.task('less', function() {
    return gulp.src('public/css/*.less')
        .pipe(less())
        .pipe(prefix())
        .pipe(gulp.dest('public/css'));
});
gulp.task('watch', function() {
    gulp.watch('public/css/*.less', ['less']);
});

gulp.task('default', ['watch']);