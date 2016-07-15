"use strict"

const gulp    = require('gulp')
const merge   = require('merge2')
const clean   = require('gulp-clean')
const through = require('through2')
const path    = require('path')
const fs      = require('fs')
const pump    = require('pump')
const _       = require('lodash');

const rootDir      = path.join(__dirname, 'workspace')
const srcDir       = path.join(rootDir, 'src');
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

gulp.task('create_action_index', ['delete_action_index'], (cb)=>{
    let indexFiles = [];
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
            let folder    = data[0];
            let code      = data[1];
            let indexFile = `${actionDir}/${folder}/index.js`;
            indexFiles.push(indexFile);
            let writeStream = fs.createWriteStream(indexFile, {flags: 'a'});
            writeStream.once('open', (fd)=> {
                writeStream.end(code);
                done();
            });
        }, ()=>{
            indexFiles = _.uniq(indexFiles);
            let pendIndexFileNumber = indexFiles.length;
            indexFiles.forEach((indexFile)=>{
                fs.readFile(indexFile, (err, code)=>{
                    let writeStream = fs.createWriteStream(indexFile, {flags: 'w'});
                    writeStream.once('open', (fd)=> {
                        writeStream.end(`
                            // gulp 로 자동생성된 파일.
                            // combine actions
                            ${code}
                        `);
                        pendIndexFileNumber--;
                        if(pendIndexFileNumber == 0){
                            cb();
                        }
                    });
                });
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

            if(!(name == 'initialState' || name == 'root' || name == 'filter' || name == folder)){
                rootReducers[folder] = (rootReducers[folder]) ? rootReducers[folder] : [];
                rootReducers[folder].push(name);
            }

            this.push(file);
            done();
        }, ()=>{
            let pendIndexFileNumber = _.keys(rootReducers).length;
            for(let key in rootReducers){
                let reducers = rootReducers[key];

                let code = `
                    // gulp 로 자동생성된 파일.
                    // combine reducers

                    'use strict';
                    import { combineReducers } from '../../util/extend-redux';
                    import filter from './filter';
                    import root from './root';
                    import initialState from './initialState';
                    import Immutable from 'immutable';
                    ${reducers.reduce((imports, reducer) => {
                        return imports + `import ${reducer} from './${reducer}'\n`
                    }, '')}
                    const childReducer = combineReducers({
                        ${reducers.join(',')}
                    });
                    export default function(state = initialState, action){
                        return filter(root(childReducer(state, action), action), action);
                    }`

                let stream = fs.createWriteStream(`${reducerDir}/${key}/index.js`, {flags: 'a'});
                stream.once('open', ()=> {
                    stream.end(code);
                    pendIndexFileNumber--;
                    if(pendIndexFileNumber == 0){
                        cb();
                    }
                });
            }
        })
    ]);
})

gulp.task('default', ['create_component_index', 'create_action_index', 'create_reducer_index']);

gulp.task('watch', ['default'], ()=> {
    gulp.watch(`${componentDir}/**/*.js`, ['create_component_index']);
    gulp.watch(`${actionDir}/**/*.js`, ['create_action_index']);
    gulp.watch(`${reducerDir}/**/*.js`, ['create_reducer_index']);
});
