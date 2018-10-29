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
    pubKey: 'BJ+TmEOKxycd703ZpmV5OFwF/5bXGr6kpfEKkSlYgsXpTsfG6k57u5R1FGTXGx2qgJnwSiAfeBEOz5AMr4OcNjA=',
    privKey: 'KIloFd+iYcsxVLUW83HiqYAkd5uf3BtVqQtlGD0/1BE='
}

// console.log('keyObj', keyObj)

//加密
let enc = App.encrypt.enByPubkey(pub, keyObj.privKey, '你好啊') //对key进行非对称加密

console.log('公钥', keyObj.publicKey)
console.log('密文', enc)

//解密
let enc2 = '5N+4I4erzhBCxe2oKVgdkLiE3kLcvaXdQuH13siyz8L1h4C39Pin2l1xdbjYqzSo'
let text = App.encrypt.deByPrivKey(keyObj.privKey, pub, enc2) //对key进行非对称加密


console.log(text)