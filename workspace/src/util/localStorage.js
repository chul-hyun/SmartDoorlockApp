/*
기존 AsyncStorage는 String값만 저장할수 있는 것을 모든 타입 저장 가능하게 개선.
*/

'use strict';

import { AsyncStorage } from 'react-native';

async function getItem(key){
    let jsonStr = await AsyncStorage.getItem(key);

    if (jsonStr === null){
        return null;
    }else{
        return (JSON.parse(jsonStr)).value;
    }
}

async function setItem(key, value){
    return await AsyncStorage.setItem(key, JSON.stringify({value}));
}

async function removeItem(key){
    return await AsyncStorage.removeItem(key)
}

async function multiSet(keyValuePairs){
    keyValuePairs.forEach((keyValuePair, i) => {
        keyValuePairs[i][1] = JSON.stringify({value: keyValuePairs[i][1] })
    });

    return await AsyncStorage.multiSet(keyValuePairs);
}

async function multiGet(keys){
    let jsonStrList = await AsyncStorage.multiGet(keys);
    jsonStrList.forEach((jsonStr, i)=>{
        if (jsonStr[1] === null){
            jsonStrList[i][1] = null
        }else{
            jsonStrList[i][1] =(JSON.parse(jsonStr[1])).value;
        }
    })
    return jsonStrList;
}

async function multiGetObject(keys){
    let jsonStrList = await AsyncStorage.multiGet(keys);
    let jsonResult = {};
    jsonStrList.forEach((jsonStr, i)=>{
        if (jsonStr[1] === null){
            jsonResult[jsonStr[0]] = null;
        }else{
            jsonResult[jsonStr[0]] = (JSON.parse(jsonStr[1])).value;
        }
    })
    return jsonResult;
}

async function multiRemove(keys){
    return await AsyncStorage.multiRemove(keys);
}

export default {
    getItem, setItem, removeItem, multiSet, multiGet, multiGetObject, multiRemove
}
