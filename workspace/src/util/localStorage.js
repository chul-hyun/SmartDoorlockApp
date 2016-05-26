import { AsyncStorage } from 'react-native';
import Q from 'q';

function getItem(key){
    let def = Q.defer();

    (async function(){
        try{
            let jsonStr = await AsyncStorage.getItem(key);
            if (jsonStr === null){
                def.reject();
                return;
            }
            def.resolve((JSON.parse(jsonStr)).value);
        }catch(error){
            def.reject(error);
        }
    })();

    return def.promise;
}

function setItem(key, value){
    let def = Q.defer();

    (async function(){
        try{
            def.resolve(await AsyncStorage.setItem(key, JSON.stringify({value})));
        }catch(error){
            def.reject(error);
        }
    })();

    return def.promise;
}

function removeItem(key){
    let def = Q.defer();

    (async function(){
        try{
            def.resolve(await AsyncStorage.removeItem(key));
        }catch(error){
            def.reject(error);
        }
    })();

    return def.promise;
}

function multiSet(keyValuePairs){
    let def = Q.defer();

    (async function(){
        keyValuePairs.forEach((keyValuePair, i) => {
            keyValuePairs[i][1] = JSON.stringify({value: keyValuePairs[i][1] })
        })
        try{
            def.resolve(await AsyncStorage.multiSet(keyValuePairs));
        }catch(error){
            def.reject(error);
        }
    })();

    return def.promise;
}

function multiGet(keys){
    let def = Q.defer();

    (async function(){
        try{
            let jsonStrList = await AsyncStorage.multiGet(keys);
            jsonStrList.forEach((jsonStr, i)=>{
                if (jsonStr[1] === null){
                    jsonStrList[i][1] = null
                }else{
                    jsonStrList[i][1] =(JSON.parse(jsonStr[1])).value;
                }
            })
            def.resolve(jsonStrList);
        }catch(error){
            def.reject(error);
        }
    })();

    return def.promise;
}

function multiGetObject(keys){
    let def = Q.defer();

    (async function(){
        try{
            let jsonStrList = await AsyncStorage.multiGet(keys);
            let jsonResult = {};
            jsonStrList.forEach((jsonStr, i)=>{
                if (jsonStr[1] === null){
                    jsonResult[jsonStr[0]] = null;
                }else{
                    jsonResult[jsonStr[0]] = (JSON.parse(jsonStr[1])).value;
                }
            })
            def.resolve(jsonResult);
        }catch(error){
            def.reject(error);
        }
    })();

    return def.promise;
}

function multiRemove(keys){
    let def = Q.defer();

    (async function(){
        try{
            def.resolve(await AsyncStorage.multiRemove(keys));
        }catch(error){
            def.reject(error);
        }
    })();

    return def.promise;
}

export default {
    getItem, setItem, removeItem, multiSet, multiGet, multiGetObject, multiRemove
}
