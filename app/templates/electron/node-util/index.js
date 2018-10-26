const crypto = require('crypto');
let encrypt = require('./encrypt.js')
let ecdh = require('./ecdh.js')
let ende = require('./ende.js')
let App = {
    ende: ende,
    encrypt: encrypt,
    ecdh: ecdh
}


var pub = 'BBVdJPbzw1IbwOI53pgzeUAb8Zw7ff4S8oA3Y79JKv/9I2tTAoPzlpEE04NHd838M/ookODObgG7FBssRxesH1I=';
// let keyObj = App.encrypt.createPairKeys();//生成的随机key
//测试固定公私钥对
let keyObj = {
    publicKey: 'BJ+TmEOKxycd703ZpmV5OFwF/5bXGr6kpfEKkSlYgsXpTsfG6k57u5R1FGTXGx2qgJnwSiAfeBEOz5AMr4OcNjA=',
    privateKey: 'KIloFd+iYcsxVLUW83HiqYAkd5uf3BtVqQtlGD0/1BE='
}

// console.log('keyObj', keyObj)

//加密
let enc = App.encrypt.enByPubkey(pub, keyObj.privateKey, '李洋') //对key进行非对称加密

console.log('公钥', keyObj.publicKey)
console.log('密文', enc)

//解密
// let enc2 = 'GhGW9OeUox+TOoLEL/oVoyv6ybyrG6fSB2hdUDj2bFx9qQxG6DJnEjv5a3WLd+0d'
let text = App.encrypt.deByPrivKey(keyObj.privateKey, pub, enc) //对key进行非对称加密


console.log(text)