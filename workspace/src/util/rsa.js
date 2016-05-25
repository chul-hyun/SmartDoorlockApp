function mod(x, m){
    return x%m;
}

function powMod(x, p, m){
    let binary = (p).toString(2).split('').reverse().map((v, i) => (v == '1') ? i : -1);
    let binaryModList = getPowModBinaryList(binary.length, x, m);
    binary = binary.filter(v => v >= 0).map(v => binaryModList[v]);
    return binary.reduce((result, val) => mod(result * val, m), 1);
}

function getPowModBinaryList(max, num, m){
    let binary = new Array(max - 1).fill(true);
    let result = [num];
    binary.reduce(pre => {
      let val = mod(Math.pow(pre, 2), m);
      result.push(val);
      return val;
    }, num)
    return result;
}

function IncodeRSA(num, e, N){
    return powMod(0+num, e, N);
}

export function incodeString(message, e, N){
    let screet = [];

    (message+'').split('').forEach((str) => {
        let codes = zeroFill(str.charCodeAt(0) + 3, 6);
        codes.split('');
        codes = [codes[0]+codes[1]+codes[2], codes[3]+codes[4]+codes[5]];
        codes.forEach((code) => screet.push(IncodeRSA(code, e, N)) );
    })

    return screet;
}

export function incodeJSON(obj, e, N){
   return incodeString(JSON.stringify(obj), e, N);
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
