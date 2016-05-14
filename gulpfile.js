"use strict"

const gulp    = require('gulp');
const merge   = require('merge2');
const clean   = require('gulp-clean');
const through = require('through2');
const path    = require('path');
const fs      = require('fs')

const srcDir = 'src';
const componentDir = path.join(srcDir, 'components');

gulp.task('delete_component_index', [], ()=>{
    return gulp.src(`${componentDir}/index.js`).pipe(clean({force: true}));
})

gulp.task('create_component_index', ['delete_component_index'], ()=>{
    return gulp.src(`${componentDir}/**/*.js`).pipe(through.obj(function(file, enc, done){
        let stream = fs.createWriteStream(`${componentDir}/index.js`, {flags: 'a'});
        stream.once('open', (fd)=> {
            let name = path.basename(file.path, '.js');
            let importPart = `import { ${name} as _${name} } from './${name}';`
            let exportPart = `export const ${name} = _${name};`
            stream.write(`\n${importPart}\n${exportPart}\n`);
            stream.end();

            this.push(file);
            done();
        });
    }));
})

gulp.task('default', ['create_component_index']);

gulp.task('watch', ['default'], ()=> {
    gulp.watch(`${componentDir}/**/*.js`, ['create_component_index']);
});
