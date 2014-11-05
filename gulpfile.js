var gulp = require('gulp');
var connect = require('gulp-connect');

var baseDir = './app/';
var scriptDir = 'js/';
var styleDir = 'styles/'

var testFiles = [
    'test/client/*.js'
];

gulp.task('server', function() {
    connect.server({
        root: baseDir,
        port: 3000,
        livereload: true
    });
});

gulp.task('scripts', function() {
    gulp.src(scriptDir)
        .pipe(connect.reload());
});

gulp.task('styles', function(){
   gulp.src(styleDir)
       .pipe(connect.reload());
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

gulp.task('build', function() {

});

