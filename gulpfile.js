var gulp  = require('gulp');
var ts    = require('gulp-typescript');
var merge = require('merge2');
var clean = require('gulp-clean');

var tsProject = ts.createProject('tsconfig.json');

var builtDir = 'built';
var srcDir   = ['src/**/*.tsx', 'src/**/*.ts'];

gulp.task('clean', ()=>{
    return gulp.src(builtDir)
		.pipe(clean({force: true}));
})

gulp.task('build', ['clean'], ()=> {
    var tsResult = gulp.src(srcDir, {base: 'src/'}).
      pipe(ts(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest('built/definitions')),
        tsResult.js.pipe(gulp.dest(builtDir))
    ]);
});

gulp.task('watch', ['build'], ()=> {
  gulp.watch(srcDir, ['build']);
});

gulp.task('default', ['build']);
