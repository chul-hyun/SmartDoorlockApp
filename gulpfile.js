"use strict"

const gulp    = require('gulp')
const merge   = require('merge2')
const clean   = require('gulp-clean')
const through = require('through2')
const path    = require('path')
const fs      = require('fs')
const Q       = require('q')

const srcDir = 'src'
const componentDir = path.join(srcDir, 'components')
const actionDir = path.join(srcDir, 'actions')
const reducerDir = path.join(srcDir, 'reducers')

gulp.task('delete_component_index', [], ()=>{
    return gulp.src(`${componentDir}/index.js`).pipe(clean({force: true}))
})

gulp.task('create_component_index', ['delete_component_index'], ()=>{
    return gulp.src(`${componentDir}/*.js`).
        pipe(through.obj(function(file, enc, done){
            let name = path.basename(file.path, '.js')
            let importPart = `import { ${name} as _${name} } from './${name}';\n`
            let exportPart = `export const ${name} = _${name};\n`

            this.push(importPart + exportPart);
            done();
        })).
        pipe(through.obj(function(code, enc, done){
            let stream = fs.createWriteStream(`${componentDir}/index.js`, {flags: 'a'});
            stream.once('open', (fd)=> {
                stream.end(code);
                done();
            })
        }));
})

gulp.task('delete_action_index', [], ()=>{
    return gulp.src(`${actionDir}/*/index.js`).pipe(clean({force: true}));
})

gulp.task('create_action_index', ['delete_action_index'], ()=>{
    return gulp.src(`${actionDir}/*/*.js`).
        pipe(through.obj(function(file, enc, done){
            let name       = path.basename(file.path, '.js');
            let folder     = path.basename(path.resolve(file.path, '..'));

            if(!(name == 'types')){
                let importPart = `import { ${name} as _${name} } from './${name}';\n`
                let exportPart = `export const ${name}ActionCreators = _${name};\n`
                this.push([folder, importPart + exportPart]);
            }
            done();
        })).
        pipe(through.obj(function(data, enc, done){
            let folder = data[0];
            let code   = data[1];
            let stream = fs.createWriteStream(`${actionDir}/${folder}/index.js`, {flags: 'a'});
            stream.once('open', (fd)=> {
                stream.end(code);
                done();
            })
        }));
})

gulp.task('delete_reducer_index', [], ()=>{
    return gulp.src(`${reducerDir}/*/index.js`).pipe(clean({force: true}));
})

gulp.task('create_reducer_index', ['delete_reducer_index'], function(){
    // @TODO 비동기 설정이 이상하게 안됨..;;
    var rootReducers = {};
    return gulp.src(`${reducerDir}/*/*.js`).pipe(through.obj(function(file, enc, done){
        let name       = path.basename(file.path, '.js');
        let folder     = path.basename(path.resolve(file.path, '..'));


        if(!(name == 'initState' || name == folder)){
            rootReducers[folder] = (rootReducers[folder]) ? rootReducers[folder] : [];
            rootReducers[folder].push(name);
        }

        this.push(file);
        done();
    })).on('end',()=>{
        for(let key in rootReducers){
            let reducers = rootReducers[key];

            let code = `
'use strict';

import { combineReducers } from 'redux-immutablejs';

import ${key} from './${key}';

import initialState from './initialState';

${reducers.reduce((imports, reducer) => {
    return imports + `import ${reducer} from './${reducer}'\n`
}, '')}

const childReducer = combineReducers({
    ${reducers.join(',')}
});

export default function(state = initialState, action){
    return Immutable.Map().mergeDeep(${key}(childReducer(state, action), action));
}`

            let stream = fs.createWriteStream(`${reducerDir}/${key}/index.js`, {flags: 'a'});
            stream.once('open', ()=> {
                stream.end(code);
            });
        }
    })
})

gulp.task('sync', function (cb) {
    // setTimeout could be any async task
    setTimeout(function () {
        console.log('cb');
        cb();
    }, 10000);
});


gulp.task('default', ['create_component_index', 'create_action_index', 'create_reducer_index']);

gulp.task('watch', ['default'], ()=> {
    gulp.watch(`${componentDir}/**/*.js`, ['create_component_index']);
    gulp.watch(`${actionDir}/**/*.js`, ['create_action_index']);
    gulp.watch(`${reducerDir}/**/*.js`, ['create_reducer_index']);
});
