const jsSHA = require("jssha");
let EC = require('elliptic').ec;
let bitcore = require('bitcore-lib');
const ecdh = require('./ecdh');
const BN = bitcore.crypto.BN
const crypto = require('crypto');

let PrivateKey = bitcore.PrivateKey;
let ec = new EC('p256');  // p256

getBase64PubfromKey = function (key) {
    let P = key.getPublic()
    let base64Str = new Buffer(Buffer.from(P.encode('hex'), 'hex')).toString('base64');
    return base64Str;
}
getBase64PrivfromKey = function (key) {
    let base64Str = ecdh.hexToBase64(PrivateKey(key.getPrivate()).toString())
    return base64Str;
}
getkeyFrombase64 = function (keybase64Data, fromPub) { //后端返回的key2
    let key = fromPub ? ec.keyFromPublic(ecdh.base64ToHex(keybase64Data), 'hex') : ec.keyFromPrivate(ecdh.base64ToHex(keybase64Data), 'hex');;
    return key
}
getCypher = function (key1, key2) {
    let shared = key1.derive(key2.getPublic())
    return shared.toBuffer({ size: 32 });
}
newGetCypher = function (key1, key2, isEncrypt) { //isEncrypt是否是加密，加解密fixInfoStr要求key的顺序变动
    let shared = key1.derive(key2.getPublic())
    let cypher = shared.toBuffer({ size: 32 });
    let fixInfoStr = isEncrypt ? 'ECDH' + getBase64PubfromKey(key1) + getBase64PubfromKey(key2) : 'ECDH' + getBase64PubfromKey(key2) + getBase64PubfromKey(key1)//key1和key2的公钥base64拼接;
    const buf = Buffer.from(fixInfoStr, 'utf8');

    let sha256Sum = crypto.createHash('sha256');
    let fixInfoSha = sha256Sum.update(buf).digest();

    console.log('salt', fixInfoSha.toString('base64'))
    let hmac = crypto.createHmac('sha256', fixInfoSha)
    let newcypher = hmac.update(cypher).digest();
    // let newcypher = crypto.pbkdf2Sync(cypher, shaCypher.slice(0, 16), 100000, 32, 'sha256');
    console.log('newcypher', newcypher.toString('base64'))
    return newcypher
}

/**
 * 把字符串转成BN buffer
 * 
 * @param {any} str  字符串
 * @param {any} encode  编码:base64,hex
 * @returns 
 */
strToBNBuffer = function (str, encode) {
    let encodeBuffer = new Buffer(str, encode)
    let bnBuffer = BN.fromBuffer(encodeBuffer).toBuffer({ size: 32 });
    return bnBuffer;
}


createPairKeys = function () {
    let key = ec.genKeyPair();
    let result = {
        pubKey: getBase64PubfromKey(key),
        privKey: getBase64PrivfromKey(key)
    }
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
    let cypher = newGetCypher(key1, key2, true)
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
    let cypher = newGetCypher(key1, key2)
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
    // getRadomKeyPair,
    // getPriPubKeys,
    getCypher,
    createPairKeys,
    strToBNBuffer,
    getkeyFrombase64
}

