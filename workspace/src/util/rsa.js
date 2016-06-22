'use strict';

import Q from 'q';

/**
 * 고속 누승 알고리즘 구현.
 * x^p mod(m) 계산
 * 참고: http://a.nex.kr.pe/wordpress/2015/10/21/제-6강-고속-누승-알고리즘과-모듈러/
 * @method powMod
 * @param  {int}    x   피제수
 * @param  {int}    p   지수
 * @param  {int}    m   제수
 * @return {int}        x^p mod(m) 계산 결과값
 */
function powMod(a, b, n){
    let result = 1;

    while(b)
   {
      if(b & 1)
      {
         result = (result * a) % n ;
      }
       b = parseInt(b / 2);
       a  = (a * a) % n ;
   }
   return result;
}

function IncodeRSA(num, e, N){
    return new Promise((resolve)=>{
        resolve(powMod(0+num, e, N));
    })
}

function incodeString(message, e, N){
    let promiseList = [];

    (message+'').split('').forEach((str) => {
        let codes = zeroFill(str.charCodeAt(0) + 3, 6);
        codes.split('');
        codes = [codes[0]+codes[1]+codes[2], codes[3]+codes[4]+codes[5]];
        codes.forEach((code) => promiseList.push(IncodeRSA(code, e, N)));
    });

    return Promise.all(promiseList);
}

async function incodeJSON(data, e, N){
   return await incodeString(JSON.stringify({data}), e, N);
}

// 문자를 유니코드로 변경.
// 3글자씩 자른다.
// 0과 1은 암호화가 안되므로 암호화전 +2 복호화 마지막에 -2를 한다.
// 무조건 6자리를 1개문자로 본다. 빈곳은 fill zero

function zeroFill(number, n){
    n -= number.toString().length;
    if ( n > 0 )
    {
        return new Array( n + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
}

export default {
    incodeString, incodeJSON
}
