const gulp         = require('gulp');
const ts           = require('gulp-typescript');
const merge        = require('merge2');
const clean        = require('gulp-clean');
const through      = require('through2');
const path         = require('path');
const fs           = require('fs')
const gutil        = require("gulp-util");

var srcDir    = 'src';
var builtDir  = 'built';
var defineDir = 'define'

var srcFile     = [`${srcDir}/**/*.tsx`, `${srcDir}/**/*.ts`];
var builtFile   = [`${builtDir}/**/*.tsx`, `${builtDir}/**/*.ts`];
var dtsFile     = [`${defineDir}/**/*.d.ts`];
var dtsMainFile = `${defineDir}/main.d.ts`;

gulp.task('source_build', ['clean_build_file', 'define_build'], ()=> {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src(srcFile).
        pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest(builtDir));
});

gulp.task('clean_build_file', ()=>{
    return gulp.src(builtFile).
        pipe(clean({force: true}));
});

gulp.task('add_typings', ['main_define_create'], ()=>{
    return gulp.src(dtsMainFile).pipe(addText('\n/// <reference path="typings/browser.d.ts"/>\n'));
});

gulp.task('main_define_create', ['define_delete'], ()=> {
    return gulp.src(builtFile).pipe(createAppDts(builtDir, dtsMainFile));
});

gulp.task('define_delete', [], ()=>{
    return gulp.src(dtsMainFile).pipe(clean({force: true}));
});

gulp.task('define_create', ['add_typings'], ()=> {
    var tsProject = ts.createProject('tsconfig.json', {noEmitOnError : true});
    var tsResult = gulp.src(srcDir).
        pipe(ts(tsProject));

    return tsResult.dts.pipe(gulp.dest(builtDir));
});

gulp.task('watch', ['source_build'], ()=> {
  gulp.watch(srcDir, ['source_build']);
});

gulp.task('default', ['source_build']);


function createAppDts( root, filePath){
    function trans(file, enc, cb){
        console.log(`\n/// <reference path="${(path.relative(root, file.path)).replace(/\.[^\.]+$/, '.d.ts')}"/>\n`);
        /*var stream = fs.createWriteStream(filePath, {flags: 'a'});
            stream.once('open', (fd)=> {

                stream.write(`\n/// <reference path="${(path.relative(root, file.path)).replace(/\.[^\.]+$/, '.d.ts')}"/>\n`);
                stream.end();
*/
                // make sure the file goes through the next gulp plugin
                this.push(file);
                // tell the stream engine that we are done with this file
                cb();
        //    });
    }
    return through.obj(trans);
}

function addText(text){
    function trans(file, enc, cb){
        var stream = fs.createWriteStream(file.path, {flags: 'a'});
            stream.once('open', (fd)=> {
                //console.log("/// <reference path=\"" + path.relative(root, file.path) + "\"/>\n");
                stream.write(text);
                stream.end();

                // make sure the file goes through the next gulp plugin
                this.push(file);
                // tell the stream engine that we are done with this file
                cb();
            });
    }
    return through.obj(trans);
}
