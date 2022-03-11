const gulp = require("gulp");
const babel = require("gulp-babel");
const nodemon = require("gulp-nodemon");

gulp.task("default", function () {
    return gulp.src("src/app.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task('dev', gulp.series('default', function () {
    return nodemon({
        script: 'dist/app.js',
        ext: 'js',
        ignore: ['dist/'],
        env: {'NODE_ENV': 'development'},
        tasks: ['default'],
        args: ['/Users/alex.yip/Desktop/zzz.png']
    });
}));
