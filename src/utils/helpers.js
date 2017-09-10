export function capitalize(str = ''){
    return typeof str !== 'string'
        ? ''
        : str[0].toUpperCase() + str.slice(1)
}

export function formatTimeStamp(int){
    var t = new Date(int);
    return t.toUTCString();
}