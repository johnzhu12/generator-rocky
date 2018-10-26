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
let keyObj = App.encrypt.createPairKeys();//生成的随机key



//加密
let enc = App.encrypt.enByPubkey(pub, keyObj.privateKey, '佳勇') //对key进行非对称加密

// console.log('公钥', keyObj.publicKey)
// console.log('密文', enc)

//解密
let text = App.encrypt.deByPrivKey(keyObj.privateKey, pub, enc) //对key进行非对称加密


// console.log(text)