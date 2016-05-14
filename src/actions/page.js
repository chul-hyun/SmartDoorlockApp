export const TYPES = {
    SET_PAGE : 'SET_PAGE'
}

export function setPage(id){
    return {
        type : TYPES.SET_PAGE,
        id   : id
    };
}
