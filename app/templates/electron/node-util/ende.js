const NodeRSA = require('node-rsa');
const CryptoJS = require("crypto-js");
const crypto = require('crypto');
const fs = require('fs');
const join = require('path').join;
const base64 = require('binary-base64');
const electron = require("electron");
const dialog = electron.dialog;
const ecdh = require('./ecdh');
/**
return json: hex string
**/
function createPairKeys() {
    let keyPair = ecdh.generateKeyPair();
    let ret = {
        privKey: ecdh.hexToBase64(keyPair.privateKey),
        pubKey: ecdh.hexToBase64(keyPair.publicKey)
    };
    return ret;
}

function storeFsByNo(path, keyData) {
    //let path = `./config/${genBrief(phone)}.${type}`;
    let flag = true;
    try {
        fs.writeFileSync(path, keyData);
    } catch (e) {
        flag = false;
    }
    return flag;
}

function fsExistsSync(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}

/**
param privKeyData, type: hex key string
param text, type string
return base64
**/
function deprecated_signByPriv(privKeyData, text) {
    privKeyData = ecdh.base64ToHex(privKeyData);
    let sig = ecdh.sign(text, privKeyData);
    var fullRet = {};
    fullRet.r = sig.signature.slice(0, 32).toString('base64');
    fullRet.s = sig.signature.slice(32, 64).toString('base64');
    fullRet.v = sig.recovery + 27;
    var resultJSON = JSON.stringify(fullRet);

    // r + s + v
    // let result = Buffer(sig.signature).toString('hex') + (sig.recovery + 27);
    // result = ecdh.hexToBase64(result);
    return resultJSON;
}

/**
param pubKeyData, type: hex key string
param text, type string
param signatureBase64 
return boolean
**/
function deprecated_verifySign(pubKeyData, text, signatureBase64) {
    pubKeyData = ecdh.base64ToHex(pubKeyData);
    // r + s + v
    // let signatureHex = ecdh.base64ToHex(signatureBase64).slice(0,128);
    var resultObj = JSON.parse(signatureBase64);
    var sig = Buffer(resultObj.r, 'base64').toString('hex') + Buffer(resultObj.s, 'base64').toString('hex');
    // let signatureBuf = Buffer(signatureHex, 'hex');
    text = ecdh.hashMessage(text);
    return ecdh.verify(text, sig, pubKeyData);
}

/* 
param  pubKeyData,  type:hex key string
param  text, string
return base64
*/
function deprecated_enByPubkey(pubKeyData, privKeyData, text) {
    pubKeyData = ecdh.base64ToHex(pubKeyData);
    privKeyData = ecdh.base64ToHex(privKeyData);
    let cypher = ecdh.generateCypher(privKeyData, pubKeyData);
    if (typeof text === 'object') {
        text = JSON.stringify(text);
    }
    let result = ecdh.hexToBase64(ecdh.encrypt(text, cypher).toString('hex'));
    return result;
}

/* 
param  privKeyData,  type:hex key string,
param  encrypted, type base64
return string
*/
function deprecated_deByPrivKey(privKeyData, publicKeyData, encrypted) {
    publicKeyData = ecdh.base64ToHex(publicKeyData);
    privKeyData = ecdh.base64ToHex(privKeyData);
    encrypted = Buffer(encrypted, 'base64');
    let cypher = ecdh.generateCypher(privKeyData, publicKeyData);
    let decrypted = ecdh.decrypt(encrypted, cypher);
    return decrypted;
}

/*
批量解密方法
通过主进程和渲染进程之间的异步通信，
将解密动作放electron主进程里，解密完异步通知渲染进程更新页面
解决页面卡死问题
*/
function decryptList(params) {
    let { privKey, keys, encryptList } = JSON.parse(params);
    let dataList = encryptList.map(item => {
        return deByPrivKey(privKey, keys[item.pubKeyIndex], item.encryptData);
    });
    let targetDataStr = JSON.stringify({ list: dataList, callbackName: params.callbackName });
    return targetDataStr;
}

//别名,和文档统一
function dencryptData(privKeyData, publicKeyData, encrypted) {
    return deByPrivKey(privKeyData, publicKeyData, encrypted);
}


function aesEncrypt(keyData, text) {
    // keyData = ecdh.base64ToHex(keyData);
    return CryptoJS.AES.encrypt(text, keyData);
}

function aesDecrypt(keyData, enResult) {
    // keyData = ecdh.base64ToHex(keyData);
    let bytes = CryptoJS.AES.decrypt(enResult.toString(), keyData);
    return bytes.toString(CryptoJS.enc.Utf8);
}

function genBrief(text, random) {
    let newText = text;
    if (random) {
        newText = random ? JSON.stringify({
            text: text,
            random: random
        }) : text;
    } else {
        try {
            let textJson = null;
            if (typeof text === 'string') {
                textJson = JSON.parse(text);
            }
            let newSortArr = getSortArr(textJson);
        } catch (e) {
            newText = text;
        }
    }
    let sha256Sum = crypto.createHash('sha256');
    sha256Sum.update(newText);
    return sha256Sum.digest('hex');
}

function getSortArr(jsonObj) {
    let iteratEntry, iteratArr, iteratObj, transToStr;

    transToStr = (item) => {
        let str = item;
        if (Object.prototype.toString.call(item) === '[object Array]') {
            str = JSON.stringify(str);
        } else if (typeof item === 'number') {
            str = item + '';
        }
        return str;
    }

    iteratArr = (arr) => {
        let newArr = [];
        arr.map(item => {
            let str = iteratEntry(item);
            str = transToStr(str);
            newArr.push(str);
        });
        //newArr.map
        console.log(newArr);
        return newArr.sort();
    }

    iteratObj = (obj) => {
        let newArr = [];
        for (let k in obj) {
            newArr.push(iteratEntry(obj[k]));
        }
        return newArr.sort();
    }

    iteratEntry = (jsonObj) => {
        if (Object.prototype.toString.call(jsonObj) === '[object Array]') {
            return iteratArr(jsonObj);
        } else if (Object.prototype.toString.call(jsonObj) === '[object Object]') {
            return iteratObj(jsonObj);
        } else {
            return jsonObj;
        }
    }
    if (typeof jsonObj === 'string') {
        return jsonObj;
    } else {
        let lastArr = iteratEntry(jsonObj);
        let newArr = [];
        lastArr.map(item => {
            item = transToStr(item);
            newArr.push(item)
        })
        return newArr.sort();
    }
}

function fotTest() {
    let keyJson = createPairKeys();
    //生成公钥秘钥对,json格式
    console.log(JSON.stringify(keyJson));
    console.log(ecdh.hexToBase64(keyJson.pubKey.toString()))
    let signText = '私钥签名';
    //私钥签名
    let signResultBase64 = signByPriv(keyJson.privKey, signText);
    console.log('signResultBase64=' + signResultBase64);

    let p = "A+lUQa9hteG/SWG2Zr3oChelQy674f9fhETPTyq/hv8N";
    let s = "test";
    let sig = "{\"r\":\"D21zTJew08Dt1iirVMCGduKj+0Y1E7KDtbhtMDVyToE=\",\"s\":\"APgFxhxVoeO6ChR5RwLMusWFDF5b7Qn6hdYdfVUZeTw=\",\"v\":27}";
    //公钥验签
    let verifySignResult = verifySign(keyJson.pubKey, signText, signResultBase64);
    let verifySignResult2 = verifySign(p, s, sig);
    console.log('verifySignResult=' + verifySignResult2);

    let keyEnDeText = '把我加密';
    let pubKeyEnResult = enByPubkey(keyJson.pubKey, keyJson.privKey, keyEnDeText);
    console.log('pubKeyEnResult=' + pubKeyEnResult);
    let privkeydeResult = deByPrivKey(keyJson.privKey, keyJson.pubKey, pubKeyEnResult);
    console.log('privkeydeResult=' + privkeydeResult);

    let aesText = '对称加密';
    let enResult = aesEncrypt(keyJson.pubKey, aesText);

    console.log('enResult=' + enResult);
    let deResult = aesDecrypt(keyJson.pubKey, enResult);
    console.log('deResult=' + deResult);
    console.log('genBrief=' + genBrief('hello'));

    console.log(ecdh.hashMessage("A+lUQa9hteG/SWG2Zr3oChelQy674f9fhETPTyq/hv8N").toString('hex'))
}

function writeFsSy(path, content) {
    let flag = false;
    try {
        let curPath = path.split('/');
        curPath.pop();
        curPath = curPath.join('/');
        genNewDir(curPath);
        fs.writeFileSync(path, content);
        flag = true;
    } catch (e) {
        console.log('path=' + path + '; content=' + content + '; 文件写入报错，请检查.');
    }
    return flag;
}

function genNewDir(curPath) {
    if (!fsExistsSync(curPath)) {
        fs.mkdirSync(curPath);
    }
}

function readFsSy(path) {
    let data = [];
    try {
        data = fs.readFileSync(path, 'utf-8')
        data = data.replace(/\r\n/g, "")
        data = eval('(' + data + ')')
    } catch (e) {
        console.log('path=' + path + '; 文件读取报错，请检查.');
    }
    return data;
}

function deleteFsSy(path) {
    try {
        fs.unlinkSync(path)
    } catch (e) {
        console.log('path=' + path + '; 文件获取报错，请检查.');
    }
}

function findInJSONFile() {
    let result = [];

    function finder(path) {
        try {
            let files = fs.readdirSync(path)
            let reg = /.*\.json$/
            files.forEach((val, index) => {
                let fPath = join(path, val);
                let stats = fs.statSync(fPath);
                if (stats.isDirectory()) finder(fPath)
                if (stats.isFile() && reg.test(fPath) && fPath.indexOf('project') == -1) {
                    let item = readFsSy(fPath)
                    result.push(item)
                }
            })
        } catch (e) {
            console.log('找不到config 目录')
        }
    }
    finder('./config/')
    return result
}


/** 
 * aes加密 
 * @param data 
 * @param secretKey 
 */
function aesEncryptForJava(secretKey, data) {
    var cipher = crypto.createCipher('aes-128-ecb', secretKey);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

/** 
 * aes解密 
 * @param data 
 * @param secretKey 
 * @returns {*} 
 */
function aesDecryptForJava(secretKey, data) {
    var cipher = crypto.createDecipher('aes-128-ecb', secretKey);
    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
}


module.exports = {
    createPairKeys,
    deprecated_signByPriv,
    deprecated_verifySign,
    deprecated_enByPubkey,
    deprecated_deByPrivKey,
    decryptList,
    dencryptData,
    aesEncrypt,
    aesDecrypt,
    storeFsByNo,
    genBrief,
    fsExistsSync,
    findInJSONFile,
    readFsSy,
    deleteFsSy,
    writeFsSy,
    fs,
    aesEncryptForJava,
    aesDecryptForJava
}