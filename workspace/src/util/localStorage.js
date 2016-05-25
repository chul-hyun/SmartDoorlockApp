import { AsyncStorage } from 'react-native';
import Q from 'q';

function getItem(key){
    let def = Q.defer();

    (async function(){
        try{
            let jsonStr = await AsyncStorage.getItem(key);
            if (jsonStr === null){
                def.resolve(null);
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

export default {
    getItem, setItem
}
