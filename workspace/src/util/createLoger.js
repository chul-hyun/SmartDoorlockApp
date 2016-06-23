function createLoger(color){
    return function loger(title, text){
        console.log(`%c${title}` , `color: ${color};`, text);
    }
}

export default createLoger;
