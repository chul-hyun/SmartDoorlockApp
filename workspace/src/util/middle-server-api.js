'use strict';

import { middleServerURL } from '../static/app';
import { incodeJSON } from './rsa';

// 서버에서 받은 공개키와 공개키 갱신주기 값
let rsaInfo = {
    N        : 0,
    e        : 0,
    interval : 0
};

// 공개키 설정 시간
let publicKeySetTime = 0;

async function post(url, send){
    try {
        console.log(url);
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(send)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch(error) {
        // Handle error
        console.error(error);
    }
}

async function rsaPost(op, message){
    return _rsaPost();

    async function _rsaPost(){
        let data;
        if(+new Date() - publicKeySetTime >= rsaInfo.interval){
            // 키 재설정 시간(interval)이 지났을시 공개키를 받는다.
            console.log(`rsa url: /rsa/get`);
            data = await post(`${middleServerURL}/rsa/get`);
        }else{
            console.log(`rsa url: /rsa/${op}`);
            data = await post(`${middleServerURL}/rsa/${op}`, {
                rsaInfo,
                screetData: await incodeJSON(message, rsaInfo.e, rsaInfo.N) //암호화
            });
        }
        console.log(data);
        if(data.state == 'rsaInfo'){
            // 공개키 재설정후 서버에 재요청
            publicKeySetTime = +new Date();
            rsaInfo = data.rsaInfo;
            return _rsaPost();
        }else{
            return data;
        }
    }
}

async function userPost(op, loginInfo, data = {}){
    let req = await rsaPost(`user/${op}`, {loginInfo, data})
    if(req.loginFailed){
        //@TODO Error 처리
        throw new Error('message');
    }

    return req;
}

export default {
    rsaPost, userPost
}
