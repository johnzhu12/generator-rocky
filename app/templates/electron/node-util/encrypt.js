const jsSHA = require("jssha");
let EC = require('elliptic').ec;
let bitcore = require('bitcore-lib');
const ecdh = require('./ecdh');
const BN = bitcore.crypto.BN

let PrivateKey = bitcore.PrivateKey;
let ec = new EC('p256');  // p256

getbase64str = function (P) {
    let base64Str = new Buffer(Buffer.from(P.encode('hex'), 'hex')).toString('base64');
    return base64Str;
}
getkey2 = function () { //后端返回的key2
    pub = 'BBVdJPbzw1IbwOI53pgzeUAb8Zw7ff4S8oA3Y79JKv/9I2tTAoPzlpEE04NHd838M/ookODObgG7FBssRxesH1I=' //后端给我的公钥
    let key2 = ec.keyFromPublic(ecdh.base64ToHex(pub), 'hex');
    return key2
}
getCypher = function (key1, key2) {
    let shared = key1.derive(key2.getPublic())
    return shared.toBuffer({ size: 32 });
}
//把字符串转成BN object
strToBN = function (str) {
    let hex = new Buffer(str, 'hex')
    let buffer = BN.fromBuffer(hex).toBuffer({ size: 32 });
    return buffer;
}
// getCypher();
getRadomKeyPair = function (pub) {
    let key = ec.genKeyPair();
    return key;
}
getPriPubKeys = function (key) {
    let result = {
        publicKey: getbase64str(key.getPublic()),
        privateKey: ecdh.hexToBase64(PrivateKey(key.getPrivate()).toString())
    }
    // console.log('公钥:', result.publicKey);
    // console.log('私钥:', result.privateKey);
    return result;
}
// getPriPubKeys()
/**
 * 
 * 
 * @param {any} pubKeyData 
 * @param {any} privKeyData 
 * @param {any} text 
 * @returns 
 */
enByPubkey = function (pubKeyData, privKeyData, text) {
    let key2 = ec.keyFromPublic(ecdh.base64ToHex(pubKeyData), 'hex');
    let key1 = ec.keyFromPrivate(ecdh.base64ToHex(privKeyData), 'hex');
    let cypher = getCypher(key1, key2)
    if (typeof text === 'object') {
        text = JSON.stringify(text);
    }
    let result = ecdh.hexToBase64(ecdh.encrypt(text, cypher).toString('hex'))
    return result
}

//解密
deByPrivKey = function (privKeyData, publicKeyData, encrypted) {
    let key2 = ec.keyFromPublic(ecdh.base64ToHex(publicKeyData), 'hex');
    let key1 = ec.keyFromPrivate(ecdh.base64ToHex(privKeyData), 'hex'); // hex string, array or Buffer
    let cypher = getCypher(key1, key2)
    encrypted = Buffer(encrypted, 'base64')
    let result = ecdh.decrypt(encrypted, cypher)
    return result;
}

//getmsgHash
getmsgHash = function (text) {
    let shaObj = new jsSHA("SHA-384", "TEXT");
    shaObj.update(text);
    let msgHash = shaObj.getHash("HEX");
    return msgHash;
}
/**
 * 签名
 * 
 * @param {any} key 
 * @param {any} text 
 * @returns 
 */
signByPriv = function (privKeyData, text) {
    let msgHash = getmsgHash(text);
    let signature = privKeyData.sign(msgHash);
    let derSign = signature.toDER();
    // let derSignBase64 = new Buffer(derSign).toString('base64');
    return derSign;
}
/**
 * 验签
 * 
 * @param {any} msgHash 
 * @param {any} derSign 
 * @returns 
 */
verifySign = function (pubKeyData, msgHash, derSign) {
    // console.log(pubKeyData.verify(msgHash, derSign));
    return pubKeyData.verify(msgHash, derSign)
}

//test sign code

// const name = '朱佳勇'
// let msgHash = getmsgHash(name)
// let derSign = sign(key, name)
// let derSignBase64 = new Buffer(derSign).toString('base64');
// console.log('derSignBase64:', derSignBase64);
// console.log(key.verify(msgHash, derSign));

// boot = function () {
//     let key = getRadomKeyPair();
//     let keyPair = getPriPubKeys(key);
//     let privKeyData = ec.keyFromPrivate(ecdh.base64ToHex(keyPair.privateKey), 'hex');
//     let pubKeyData = ec.keyFromPublic(ecdh.base64ToHex(keyPair.publicKey), 'hex');
//     testKeys(privKeyData, pubKeyData);
// }
// // console.log(pubKeyData.verify(msgHash, derSign));

// testKeys = function (privKeyData, pubKeyData) {  //测试方法，key1签名，key2验签
//     let name = 'johnzhu'
//     let msgHash = getmsgHash(name)
//     let derSign = sign(privKeyData, name)
//     // console.log(pubKeyData.verify(msgHash, derSign));
//     if (!pubKeyData.verify(msgHash, derSign)) {
//         console.log('有错');
//     } else {
//         // console.log('测试成功！');
//     }
// }

// for (var i = 0; i < 100000; i++) {
//     boot();
// }
// console.log('测试成功！');
module.exports = {
    enByPubkey,
    deByPrivKey,
    signByPriv,
    verifySign,
    getRadomKeyPair,
    getPriPubKeys,
    strToBN
}

