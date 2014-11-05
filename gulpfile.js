var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var minifyCSS = require('gulp-minify-css');
var karma = require('gulp-karma');
var zip = require('gulp-zip');

var baseDir = './dist/';
var scriptDir = 'js/';
var styleDir = 'css/';

var testFiles = [
    'test/test-main-js'
];

gulp.task('server', function() {
    connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });
});

gulp.task('test', function() {
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err){
            console.log(err);
            this.emit('end');
        });
});

gulp.task('watch', function(){
    gulp.watch('./src/css/*.css', ['styles']);
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./src/**/*.jade', ['templates']);

});

gulp.task('default', ['build', 'server', 'watch']);

gulp.task('build', ['scripts', 'templates', 'styles', 'load']);

gulp.task('templates', function() {
    var YOUR_LOCALS = {};

    gulp.src('./src/views/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./dist/views/'))
        .pipe(connect.reload())

    gulp.src('./src/index.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload())
});

gulp.task('scripts', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(connect.reload())
});

gulp.task('styles', function() {
    return  gulp.src('./src/css/*.css')
        .pipe(concat('style.min.css'))
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(connect.reload())
});

gulp.task('load', function(){
    gulp.src('./bower_components/**/*.min.js*')
        .pipe(gulp.dest('./dist/js/'))
    gulp.src('./bower_components/**/*.min.css')
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task('deploy', function(){
    return gulp.src('dist/*')
        .pipe(zip('ArchitectWirelessWebServices.zip'))
        .pipe(gulp.dest('dist'))
});







