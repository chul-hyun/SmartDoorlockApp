import { middleServerURL } from '../static/app';
import { incodeJSON } from './rsa';

let rsaInfo = {
    N        : 0,
    e        : 0,
    interval : 0
};

let rsaInfoSetTime = 0;

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
        if(+new Date() - rsaInfoSetTime >= rsaInfo.interval){
            console.log(`rsa url: /rsa/get`);
            data = await post(`${middleServerURL}/rsa/get`);
        }else{
            console.log(`rsa url: /rsa/${op}`);
            data = await post(`${middleServerURL}/rsa/${op}`, {
                rsaInfo,
                screetData: incodeJSON(message, rsaInfo.e, rsaInfo.N)
            });
        }
        console.log(data);
        if(data.state == 'rsaInfo'){
            rsaInfoSetTime = +new Date();
            rsaInfo = data.rsaInfo;
            return _rsaPost();
        }else{
            return data;
        }
    }
}

export default {
    rsaPost
}
