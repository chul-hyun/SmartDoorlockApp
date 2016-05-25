import { middleServerURL } from '../static/app';
import { incodeJSON } from './rsa';

let rsaInfo = {
    N: 0,
    e: 0
};

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
    let send = {
        rsaInfo,
        screetData: incodeJSON(message, rsaInfo.e, rsaInfo.N)
    };

    console.log(send);

    return await _rsaPost();

    async function _rsaPost(){
        let data = await post(`${middleServerURL}/rsa/${op}`, send);
        if(data.state == 'rsa changed'){
            rsaInfo = data.rsaInfo;
            send = {
                rsaInfo,
                screetData: incodeJSON(message, rsaInfo.e, rsaInfo.N)
            };

            return _rsaPost();
        }else{
            return data;
        }
    }
}

export default {
    rsaPost
}
