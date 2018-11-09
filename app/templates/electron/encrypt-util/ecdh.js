/************************
*使用以太钱包生成公私钥
*进行加签验签
***************** */
var bitcore = require('bitcore-lib');
let AESCBC = require('./lib/aescbc');
let PrivateKey = bitcore.PrivateKey;
let PublicKey = bitcore.PublicKey;
let createKeccakHash = require('keccak')
let secp256k1 = require('secp256k1');
let crypto = require('crypto');
let BigInteger = require('bigi');


var hexToBase64 = exports.hexToBase64 = function (str) {
	return str ? Buffer(str, 'hex').toString('base64') : undefined;
}

var base64ToHex = exports.base64ToHex = function (str) {
	return str ? Buffer(str, 'base64').toString('hex') : undefined;
}

var privateToPublic = exports.privateToPublic = function (privateKey) {
	privateKey = exports.generatePrivate(privateKey).toBuffer();
	var p = secp256k1.publicKeyCreate(privateKey, false).toString('hex');
	return p;
}

/**
 * Converts a public key to the Ethereum format.
 * @param {Buffer} publicKey
 * @return {Buffer}
 */
var importPublic = exports.importPublic = function (publicKey) {
	if (!publicKey) {
		throw new Error("must have a public key to import");
	}
	publicKey = PublicKey.fromString(publicKey);
	return publicKey
}

var generatePrivate = exports.generatePrivate = function (private) {
	return private ? PrivateKey(private) : PrivateKey();
}

var generatePublic = exports.generatePublic = function (privateKey) {
	return privateKey.publicKey ? privateKey.publicKey : exports.generatePrivate(privateKey).publicKey;
}


var generateKeyPair = exports.generateKeyPair = function () {
	var newPrivate = null;
	var len = 0;
	while (len != 32) {
		let seed = 'mawenjing0' + 'active' + 'tywky5-vyvzid-mIdboh' //adde by john
		let sha256Sum = crypto.createHash('sha256');
		let seedHex = sha256Sum.update(seed).digest('hex');
		let bnBuf = BigInteger.fromHex(seedHex).toBuffer()
		newPrivate = PrivateKey(bnBuf);
		len = newPrivate.bn.toBuffer().length;
	}
	var keyPair = {
		privateKey: newPrivate.toString(),
		publicKey: privateToPublic(newPrivate)
	};
	// console.log('keyPair', keyPair)
	return keyPair;
}

var hashMessage = exports.hashMessage = function (msg) {
	return _sha3(msg);
}

var _sha3 = function (a, bits) {
	if (!Buffer.isBuffer(a)) {
		a = Buffer(a);
	}
	if (!bits) bits = 256
	return createKeccakHash('keccak' + bits).update(a).digest()
}
exports.sha3 = function (a, bits) {
	if (!Buffer.isBuffer(a)) {
		a = Buffer(a);
	}
	if (!bits) bits = 256
	return createKeccakHash('keccak' + bits).update(a).digest()
}
exports.sign = function (msg, privateKey) {
	if (!Buffer.isBuffer(privateKey)) {
		privateKey = exports.generatePrivate(privateKey).toBuffer();
	}
	var sig = secp256k1.sign(exports.hashMessage(msg), privateKey);
	return sig;
}

exports.verify = function (msgHash, signature, publicKey) {
	if (!Buffer.isBuffer(publicKey)) {
		publicKey = importPublic(publicKey).toBuffer();
	}
	signature = signature.toBuffer ? signature.toBuffer() : Buffer(signature, 'hex');
	return secp256k1.verify(msgHash, signature, publicKey);
}

exports.generateCypher = function (AprivateKey, BpublicKey) {
	var bPublic = importPublic(BpublicKey);
	var aPrivate = exports.generatePrivate(AprivateKey);
	var r = aPrivate.bn;
	var KB = bPublic.point;
	var P = KB.mul(r);
	var S = P.getX();
	return S.toBuffer({ size: 32 });
}

exports.encrypt = function (data, cypher) {
	// var ivbuf = _sha3(data).slice(0, 16);
	//modified 10-31
	const ivbuf = crypto.randomBytes(16);
	if (!Buffer.isBuffer(data)) {
		data = Buffer(data);
	}
	var encryptedAES = AESCBC.encryptCipherkey(data, cypher, ivbuf);
	return encryptedAES
}

exports.decrypt = function (encryptedData, cypher) {
	var decryptedAES = AESCBC.decryptCipherkey(encryptedData, cypher);
	if (Buffer.isBuffer(decryptedAES)) {
		decryptedAES = decryptedAES.toString();
	}
	return decryptedAES;
}