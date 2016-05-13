const gulp    = require('gulp');
const ts      = require('gulp-typescript');
const merge   = require('merge2');
const clean   = require('gulp-clean');
const through = require('through2');
const path    = require('path');
const fs      = require('fs')
const gutil   = require("gulp-util");
const mkdirp  = require('mkdirp');

var srcDir    = 'src';
var builtDir  = 'built';
var defineDir = 'definition'

var srcFile     = [`${srcDir}/**/*.tsx`, `${srcDir}/**/*.ts`];
var builtFile   = [`${builtDir}/**/*.tsx`, `${builtDir}/**/*.ts`];
var dtsMainFile = `${defineDir}/main.d.ts`;
var dtsFile     = [`${defineDir}/**/*.d.ts`];



gulp.task('delete_build_file', [], ()=>{
    return gulp.src(builtDir).pipe(clean({force: true}));
});

gulp.task('delete_define_file', [], ()=>{
    return gulp.src(defineDir).pipe(clean({force: true}));
});

gulp.task('delete', ['delete_define_file', 'delete_build_file']);

gulp.task('copy', ['delete'], ()=>{
    return gulp.src(`${srcDir}/**/*`, {base: srcDir}).pipe(gulp.dest(builtDir));
})

gulp.task('add_typings', ['copy'], (cb)=>{
    addText(dtsMainFile, '\n/// <reference path="..\\typings\\browser.d.ts"/>\n', cb);
});

gulp.task('define_create', ['add_typings'], ()=> {
    var tsProject = ts.createProject('tsconfig.json', {declaration: true});
    var tsResult = gulp.src(builtFile).pipe(ts(tsProject));

    return tsResult.dts.pipe(gulp.dest(defineDir));
});

gulp.task('main_define_create', ['define_create'], ()=> {
    return gulp.src(dtsFile.concat([`!${dtsMainFile}`])).pipe(createAppDts(defineDir, dtsMainFile));
});

gulp.task('source_build', ['copy'], ()=> {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src(builtFile).
        pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest(builtDir));
});

gulp.task('default', ['source_build', 'main_define_create']);

gulp.task('watch', ['default'], ()=> {
    gulp.watch(srcDir, ['default']);
});

function createAppDts(src, filePath){
    function trans(file, enc, cb){
        //console.log(`\n/// <reference path="${(path.relative(src, file.path)).replace(/\.[^\.]+$/, '.d.ts')}"/>\n`);
        var stream = fs.createWriteStream(filePath, {flags: 'a'});
            stream.once('open', (fd)=> {

                stream.write(`\n/// <reference path="${path.relative(src, file.path)}"/>\n`);
                stream.end();

                // make sure the file goes through the next gulp plugin
                this.push(file);
                // tell the stream engine that we are done with this file
                cb();
            });
    }
    return through.obj(trans);
}

function addText(filePath, text, cb){
    mkdirp(path.dirname(filePath), (err)=> {
        if (err) console.error(err)
        else{
            var stream = fs.createWriteStream(filePath, {flags: 'a'});
            stream.once('open', (fd)=> {
                stream.end(text);
                cb();
            });
        }
    });
}
