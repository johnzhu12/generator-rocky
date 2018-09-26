
const jsSHA = require("jssha");

var EC = require('elliptic').ec;
var ec = new EC('p256');  // p256




var key = ec.genKeyPair();

var pubPoint = key.getPublic();

var pub = pubPoint.encode('hex');

var byteArr = Buffer.from(pub, 'hex')
let pubBase64 = new Buffer(byteArr).toString('base64');

// console.log('pub', pub)
console.log('公钥', pubBase64)


//=========
var EdDSA = require('elliptic').eddsa;


// Create and initialize EdDSA context
// (better do it once and reuse it)


// Create key pair from secret
// var key = ec.keyFromSecret(A.getPrivate()); // hex string, array or Buffer

// Sign the message's hash (input must be an array, or a hex-string)
const name = '朱佳勇'
var shaObj = new jsSHA("SHA-384", "TEXT");
shaObj.update(name);


var msgHash = shaObj.getHash("HEX");
var signature = key.sign(msgHash);

// Export DER encoded signature in Array
var derSign = signature.toDER();

let derSignBase64 = new Buffer(derSign).toString('base64');

// Verify signature
console.log('derSignBase64:', derSignBase64);

console.log(key.verify(msgHash, derSign));

// CHECK WITH NO PRIVATE KEY

// Import public key
// var pub = '0a1af638...';
// var key = ec.keyFromPublic(pub, 'hex');

// Verify signature
// var signature = '70bed1...';
// console.log(key.verify(msgHash, signature));


