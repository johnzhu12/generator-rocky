const jsSHA = require("jssha");
let EC = require('elliptic').ec;
let bitcore = require('bitcore-lib');
const ecdh = require('./ecdh');
let AESCBC = require('./lib/aescbc')
const fileAction = require('./fileAction');

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
    console.log('cypher:', ecdh.hexToBase64(shared.toString(16)));
    return shared.toBuffer({ size: 32 });
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
encryptByECC = function (data, callback) {
    let key2 = getkey2()
    let key1 = getRadomKeyPair();
    let toStorePair = getPriPubKeys(key1);
    callback(toStorePair); //保存公私钥
    let shared = getCypher(key1, key2)
    let result = ecdh.hexToBase64(ecdh.encrypt(data, shared).toString('hex'))
    // console.log('密文:', result)
    fileAction.backupFile('/Users/zhujohn/Desktop/a.text', result, function (flag) {
        if (flag) {
            console.log('保存成功');
        } else {
            console.log('保存失败');
        }
    })
}

//解密
decryptByECC = function (encryptedData, keyPair) {
    let key2 = getkey2()
    console.log('keyPair', keyPair);
    //根据公钥获得完整key
    try {
        let key1 = ec.keyFromPrivate(ecdh.base64ToHex(keyPair.privateKey), 'hex'); // hex string, array or Buffer
    } catch (e) {
        console.log('error:', e)
    }
    let shared = getCypher(key1, key2)

    let encrypted = Buffer(encryptedData, 'base64')
    // let result = ecdh.hexToBase64(ecdh.decrypt(encrypted, shared).toString('hex'))
    let result = ecdh.decrypt(encrypted, shared)
    // console.log('密文:', result)
    fileAction.generatePdf(result, '/Users/zhujohn/Desktop/a.pdf', function (flag) {
        if (flag) {
            console.log('保存成功');
        } else {
            console.log('保存失败');
        }
    })
}

//getmsgHash
getmsgHash = function (text) {
    let shaObj = new jsSHA("SHA-384", "TEXT");
    shaObj.update(text);
    let msgHash = shaObj.getHash("HEX");
    return msgHash;
}
//签名
sign = function (key, text) {
    let msgHash = getmsgHash(text);
    let signature = key.sign(msgHash);
    let derSign = signature.toDER();
    // let derSignBase64 = new Buffer(derSign).toString('base64');
    return derSign;
}
//验签
verifySign = function (msgHash, derSign) {
    console.log(key.verify(msgHash, derSign));
    return key.verify(msgHash, derSign)
}

//test sign code

// const name = '朱佳勇'
// let msgHash = getmsgHash(name)
// let derSign = sign(key, name)
// let derSignBase64 = new Buffer(derSign).toString('base64');
// console.log('derSignBase64:', derSignBase64);
// console.log(key.verify(msgHash, derSign));

boot = function () {
    let key = getRadomKeyPair();
    let keyPair = getPriPubKeys(key);
    let key1 = ec.keyFromPrivate(ecdh.base64ToHex(keyPair.privateKey), 'hex');
    let key2 = ec.keyFromPublic(ecdh.base64ToHex(keyPair.publicKey), 'hex');
    testKeys(key1, key2);
}
// console.log(key2.verify(msgHash, derSign));

testKeys = function (key1, key2) {  //测试方法，key1签名，key2验签
    let name = 'johnzhu'
    let msgHash = getmsgHash(name)
    let derSign = sign(key1, name)
    // console.log(key2.verify(msgHash, derSign));
    if (!key2.verify(msgHash, derSign)) {
        console.log('有错');
    } else {
        // console.log('测试成功！');
    }
}

// for (var i = 0; i < 100000; i++) {
//     boot();
// }
console.log('测试成功！');
module.exports = {
    encryptByECC,
    decryptByECC
}

