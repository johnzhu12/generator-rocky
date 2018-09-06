var crypto = require("crypto");
var eccrypto = require("eccrypto");
var base64 = require('file-base64');

function generatePdf(base64Str) {
    base64.decode(base64Str, 'a.pdf', function (err, output) {
        console.log('success');
    });
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

//ECDSA解密

module.exports = {
    generatePdf
}