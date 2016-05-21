"use strict"

const gulp    = require('gulp')
const merge   = require('merge2')
const clean   = require('gulp-clean')
const through = require('through2')
const path    = require('path')
const fs      = require('fs')
const Q       = require('q')
const babel   = require('gulp-babel')
const _       = require('lodash')
const uglify  = require('gulp-uglify');
const pump    = require('pump');

const rootDir      = path.resolve(__dirname, '../workspace')
const srcDir       = path.join(__dirname, 'src');
const tempDir      = path.join(__dirname, 'dist');
const distDir      = path.join(rootDir, 'src');
const componentDir = path.join(srcDir, 'components')
const actionDir    = path.join(srcDir, 'actions')
const reducerDir   = path.join(srcDir, 'reducers')

gulp.task('delete_component_index', [], ()=>{
    return pump([
        gulp.src(`${componentDir}/index.js`),
        clean({force: true})
    ]);
})

gulp.task('create_component_index', ['delete_component_index'], ()=>{
    return pump([
        gulp.src(`${componentDir}/*.js`),
        through.obj(function(file, enc, done){
            let name = path.basename(file.path, '.js')
            let importPart = `import { ${name} as _${name} } from './${name}';\n`
            let exportPart = `export const ${name} = _${name};\n`

            this.push(importPart + exportPart);
            done();
        }),
        through.obj(function(code, enc, done){
            let stream = fs.createWriteStream(`${componentDir}/index.js`, {flags: 'a'});
            stream.once('open', (fd)=> {
                stream.end(code);
                done();
            })
        })
    ]);
})

gulp.task('delete_action_index', [], ()=>{
    return pump([
        gulp.src(`${actionDir}/*/index.js`),
        clean({force: true})
    ])
})

gulp.task('create_action_index', ['delete_action_index'], ()=>{
    return pump([
        gulp.src(`${actionDir}/*/*.js`),
        through.obj(function(file, enc, done){
            let name       = path.basename(file.path, '.js');
            let folder     = path.basename(path.resolve(file.path, '..'));

            if(!(name == 'types')){
                let importPart = `import * as ${name} from './${name}';\n`
                let exportPart = `export const ${name}ActionCreators = ${name};\n`
                this.push([folder, importPart + exportPart]);
            }
            done();
        }),
        through.obj(function(data, enc, done){
            let folder = data[0];
            let code   = data[1];
            let stream = fs.createWriteStream(`${actionDir}/${folder}/index.js`, {flags: 'a'});
            stream.once('open', (fd)=> {
                stream.end(code);
                done();
            })
        })
    ]);
})

gulp.task('delete_reducer_index', [], ()=>{
    return pump([
        gulp.src(`${reducerDir}/*/index.js`),
        clean({force: true})
    ]);
})

gulp.task('create_reducer_index', ['delete_reducer_index'], function(cb){
    var rootReducers = {};
    return pump([
        gulp.src(`${reducerDir}/*/*.js`),
        through.obj(function(file, enc, done){
            let name       = path.basename(file.path, '.js');
            let folder     = path.basename(path.resolve(file.path, '..'));

            if(!(name == 'initialState' || name == 'filter' || name == folder)){
                rootReducers[folder] = (rootReducers[folder]) ? rootReducers[folder] : [];
                rootReducers[folder].push(name);
            }

            this.push(file);
            done();
        }, ()=>{
            for(let key in rootReducers){
                let reducers = rootReducers[key];

                let code = `
                    'use strict';

                    import { combineReducers } from '../../util/extend-redux';

                    import filter from './filter';

                    import initialState from './initialState';

                    import Immutable from 'immutable';

                    ${reducers.reduce((imports, reducer) => {
                        return imports + `import ${reducer} from './${reducer}'\n`
                    }, '')}

                    const childReducer = combineReducers({
                        ${reducers.join(',')}
                    });

                    export default function(state = initialState, action){
                        return childReducer(filter(state, action), action);
                    }`

                let stream = fs.createWriteStream(`${reducerDir}/${key}/index.js`, {flags: 'a'});
                stream.once('open', ()=> {
                    stream.end(code);
                    cb();
                });
            }
        })
    ]);
})

gulp.task('build', ()=>{
    return pump([
        gulp.src(`${srcDir}/**/*.js`),
        //babel({
        //    presets: ['es2015', 'react'],
        //    plugins: [
        //        "transform-strict-mode",
        //        ["transform-async-to-module-method", {
        //          "module": "bluebird",
        //          "method": "coroutine"
        //        }],
        //    ]
        //}),
        uglify(),
        gulp.dest(tempDir)
    ]);
});

gulp.task('delete_dist', ()=>{
    return pump([
        gulp.src(distDir),
        clean({force: true})
    ]);
})

gulp.task('copy', ['build', 'delete_dist'], ()=>{
    return pump([
        gulp.src(`${tempDir}/**/*`, {base: tempDir}),
        gulp.dest(distDir)
    ]);
});

gulp.task('default', ['copy']);

gulp.task('watch', ['default'], ()=> {
    gulp.watch([`${srcDir}/**/*.js`, `!${actionDir}/*/index.js`, `!${reducerDir}/*/index.js`, `!${componentDir}/index.js`], ['build']);
});
