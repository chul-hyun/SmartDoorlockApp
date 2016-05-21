import { middleServerURL } from '../static/app';

export async function RSAConnecterCreat(){
    //@TODO 유저 password가 설정 안됬을시 사용
}

export async function SHA256ConnecterCreat(){
    //@TODO 유저 password가 설정 됬을시 사용
}

export async function regist(name, doorlockID, doorlockKey){
    try {
        let response = await fetch(`${middleServerURL}/regist`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                doorlockID,
                doorlockKey
            }
        });
        let responseJson = await response.json();
        return responseJson;
    } catch(error) {
        // Handle error
        console.error(error);
    }
}
