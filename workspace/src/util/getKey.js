let getKey = (()=>{
    let key = 0;
    return ()=> key++;
})()

export default getKey;
