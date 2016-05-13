export var TYPES = {
    SET_PAGE : 1
}

export function setPage(id){
    return {
        type : TYPES.SET_PAGE,
        id   : id
    };
}
