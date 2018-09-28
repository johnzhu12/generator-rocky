const jsSHA = require("jssha");
var EC = require('elliptic').ec;
var ec = new EC('p256');  // p256
var EdDSA = require('elliptic').eddsa;
var bitcore = require('bitcore-lib');
let PrivateKey = bitcore.PrivateKey;
const ecdh = require('./ecdh');
let AESCBC = require('./lib/aescbc')
const fileAction = require('./fileAction');



getbase64str = function (P) {
    let base64Str = new Buffer(Buffer.from(P.encode('hex'), 'hex')).toString('base64');
    return base64Str;
}
getkey2 = function () { //后端返回的key2
    pub = 'BBVdJPbzw1IbwOI53pgzeUAb8Zw7ff4S8oA3Y79JKv/9I2tTAoPzlpEE04NHd838M/ookODObgG7FBssRxesH1I=' //后端给我的公钥
    var key2 = ec.keyFromPublic(ecdh.base64ToHex(pub), 'hex');
    return key2
}
getCypher = function (key1, key2) {
    var shared = key1.derive(key2.getPublic())
    console.log('cypher:', ecdh.hexToBase64(shared.toString(16)));
    return shared.toBuffer({ size: 32 });
}
// getCypher();
getRadomKeyPair = function (pub) {
    var key = ec.genKeyPair();
    return key;
}
getPriPubKeys = function (key) {
    let result = {
        publicKey: getbase64str(key.getPublic()),
        privateKey: ecdh.hexToBase64(PrivateKey(key.getPrivate()).toString())
    }
    console.log('公钥:', result.publicKey);
    console.log('私钥:', result.privateKey);
    return result;
}
// getPriPubKeys()
encryptByECC = function (data, callback) {
    var key2 = getkey2()
    var key1 = getRadomKeyPair();
    let toStorePair = getPriPubKeys(key1);
    callback(toStorePair); //保存公私钥
    var shared = getCypher(key1, key2)
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
    var key2 = getkey2()
    console.log('keyPair', keyPair);
    //根据公钥获得完整key
    try {
        let hexStr = ecdh.base64ToHex(keyPair.privateKey)
        var key1 = ec.keyFromPrivate(hexStr, 'hex'); // hex string, array or Buffer
    } catch (e) {
        console.log('error:', e)
    }
    var shared = getCypher(key1, key2)

    var encrypted = Buffer(encryptedData, 'base64')
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



// const name = '朱佳勇'
// var shaObj = new jsSHA("SHA-384", "TEXT");
// shaObj.update(name);
// var msgHash = shaObj.getHash("HEX");
// var signature = key.sign(msgHash);
// // Export DER encoded signature in Array
// var derSign = signature.toDER();
// let derSignBase64 = new Buffer(derSign).toString('base64');
// console.log('derSignBase64:', derSignBase64);
// console.log(key.verify(msgHash, derSign));
module.exports = {
    encryptByECC,
    decryptByECC
}

