var crypto = require("crypto");
var eccrypto = require("eccrypto");
var base64 = require('file-base64');
const dialog = require('electron').dialog

function generatePdf(base64Str, defaultPathFileName, callback) {
    // console.log('base64Str', base64Str)
    let dirArr = defaultPathFileName.split('/');
    let fileName = dirArr[dirArr.length - 1]
    let postfix = fileName.split('.')[1]
    dialog.showSaveDialog({
        defaultPath: defaultPathFileName,
        properties: [
            'openFile'
        ],
        filters: [{
            name: '',
            extensions: [postfix]
        }]
    }, function (res) {
        if (res) {
            base64.decode(base64Str, res, function (err, output) {
                callback(true)  //成功
            });
        }
    })

}


// // A new random 32-byte private key.
// var privateKey = crypto.randomBytes(32);
// // Corresponding uncompressed (65-byte) public key.
// var publicKey = eccrypto.getPublic(privateKey);

// var str = "message to sign";
// // Always hash you message to sign!
// var msg = crypto.createHash("sha256").update(str).digest();

// eccrypto.sign(privateKey, msg).then(function (sig) {
//     console.log("Signature in DER format:", sig);
//     eccrypto.verify(publicKey, msg, sig).then(function () {
//         console.log("Signature is OK");
//     }).catch(function () {
//         console.log("Signature is BAD");
//     });
// });

//ECDSA加密
function encrytECDSA() {

}
//ECDSA解密
function decrytECDSA() {

}
module.exports = {
    generatePdf
}