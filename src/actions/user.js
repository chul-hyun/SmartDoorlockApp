export const TYPES = {
    REGISTER   : 'REGISTER',
    UNREGISTER : 'UNREGISTER'
}

export function register(){
    return {
        type : TYPES.REGISTER
    };
}

export function unregister(){
    return {
        type : TYPES.UNREGISTER
    };
}
