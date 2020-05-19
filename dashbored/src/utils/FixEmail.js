const fixEmail = (str) => { 
    return str.split('@').join("").split('.').join('');
}

export default fixEmail