
const jsSHA = require("jssha");
var EC = require('elliptic').ec;
var ec = new EC('p256');  // p256
var bitcore = require('bitcore-lib');
let PrivateKey = bitcore.PrivateKey;
const ecdh = require('./ecdh')






getPubPriv = function () {
    var key1 = ec.genKeyPair();
    var pub = 'BBVdJPbzw1IbwOI53pgzeUAb8Zw7ff4S8oA3Y79JKv/9I2tTAoPzlpEE04NHd838M/ookODObgG7FBssRxesH1I='

    var key2 = ec.keyFromPublic(ecdh.base64ToHex(pub), 'hex');
    var shared1 = key1.derive(key2.getPublic())
    console.log(ecdh.hexToBase64(shared1.toString(16)));
    console.log('result', getbase64str(key1.getPublic()));


}
getbase64str = function (P) {
    let base64Str = new Buffer(Buffer.from(P.encode('hex'), 'hex')).toString('base64');
    return base64Str;
}
getPubPriv()

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


