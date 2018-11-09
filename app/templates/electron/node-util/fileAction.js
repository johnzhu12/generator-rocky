const fs = require('fs');
const path = require('path');
const ende = require('../encrypt-util/ende.js');
const dialog = require('electron').dialog;
// const json2csv = require('json2csv')
const iconv = require('iconv-lite');
var base64 = require('file-base64');

const configPath = './config';

//storePairKey();
function getSpRegistParam(mobileNo, userTag) {
    let pubKeyPath = getPubKeyPath(mobileNo, userTag);
    let privKeyPath = getPrivKeyPath(mobileNo, userTag);
    let pairKeys = {};
    if (!ende.fsExistsSync(pubKeyPath) || !ende.fsExistsSync(privKeyPath)) {
        pairKeys = ende.createPairKeys();
        ende.storeFsByNo(pubKeyPath, pairKeys.pubKey);
        ende.storeFsByNo(privKeyPath, pairKeys.privKey);
    }
    pairKeys.pubkey = fs.readFileSync(pubKeyPath);
    pairKeys.privkey = fs.readFileSync(privKeyPath);

    let addressKey = getAddressKey(pairKeys.privkey, userTag);
    return JSON.stringify({
        mobileNo,
        userTag,
        pubKey: pairKeys.pubkey.toString(),
        addressKey
    });
}

function getAddressKey(privkey, userTag) {
    return ende.signByPriv(privkey, userTag);
}

function getPubKeyPath(mobileNo, userTag) {
    return global.appPath + `/config/${ende.genBrief(userTag + mobileNo)}.pub`;
}

function getPrivKeyPath(mobileNo, userTag) {
    return global.appPath + `/config/${ende.genBrief(userTag + mobileNo)}.priv`;
}

function genSPOConfig(tag, pw) {
    let pairKeys = ende.createPairKeys();
    const pubKey = pairKeys.pubKey.toString();
    console.log(pubKey);
    const enPrivKey = ende.aesEncrypt(pw, pairKeys.privKey).toString();
    console.log(enPrivKey);
    //公钥先签名再briefss
    let pubKeyFirstSigned = ende.signByPriv(pairKeys.privKey, pubKey).toString();
    let pubBrief = ende.genBrief(pubKeyFirstSigned);
    let publicSign = ende.signByPriv(pairKeys.privKey, pubBrief).toString();
    const SPOConfig = {
        tag,
        enPrivKey,
        pubKey,
        publicSign
    };
    try {
        let fileName = pubKey.replace(/[^A-Za-z\d]/g, "");
        fileName = fileName.slice(60, 100);
        ende.writeFsSy(`${configPath}/${fileName}.json`, JSON.stringify(SPOConfig));
        SPOConfig.privKey = pairKeys.privKey;
        SPOConfig.pubBrief = pubBrief;
        return SPOConfig;
    } catch (e) {
        console.log(e + ';genSPOConfig error');
        alert('文件写入失败，请检查磁盘！')
        return false;
    }
}

function deleteFileByPubKey(pubKey) {
    let fileName = pubKey.replace(/[^A-Za-z\d]/g, "");
    fileName = fileName.slice(60, 100);
    ende.deleteFsSy(`${configPath}/${fileName}.json`)
}

function genSCEConfig(tag, pw, thrPubkeyArr) {
    let SCEConfig = genSPOConfig(tag, pw);
    let privKey = ende.aesDecrypt(pw, SCEConfig.enPrivKey);
    if (SCEConfig) {
        let enc = SCEConfig.enPrivKey;
        for (let i = 0, len = thrPubkeyArr.length; i < len; i++) {
            enc = ende.enByPubkey(thrPubkeyArr[i], privKey, enc);
        }
        SCEConfig.enc = enc;
    }
    return SCEConfig;
}

/**
备份文件,
param defaultpath, 默认路径,包括文件名
**/
function backupFile(defaultpath, content, callback) {
    let name, postfix;
    let dirArr = defaultpath.split('/');
    let fileName = dirArr[dirArr.length - 1];
    name = fileName.split('.')[0];
    postfix = fileName.split('.')[1];

    //name,postfix
    dialog.showSaveDialog({
        defaultPath: defaultpath,
        properties: [
            'openFile',
        ],
        filters: [{
            name: '',
            extensions: [postfix]
        },]
    }, function (res) {
        if (res) {
            res = res.replace(/\\/g, "\/");
            let flag = ende.writeFsSy(res, content);
            callback(flag);
        }
    })
}


//let param = getSpRegistParam(15000404895, 'sp操作员');
// window.param = param;
// console.log(param);
/**
  added by john 2018-5-2,获取groupcongf
**/
function getGroupConf() {
    let groupConfPath = global.appPath + '/config/group/groupConf.json';
    data = fs.readFileSync(groupConfPath, 'utf8');
    return data
}

//记录请求日志，该日志不按时间做完整记录，只是为测试提供使用
function writeApiReqLog(content) {
    //首先判断文件是否存在，如果不存在则创建并存入[]
    let logFilePath = global.appPath + "/log/apiLog.json";
    let isExist = ende.fsExistsSync(logFilePath);
    if (!isExist) {
        ende.writeFsSy(logFilePath, JSON.stringify([]));
    }
    let { type, url, data } = content;
    let apiLog = fs.readFileSync(logFilePath);
    let apiLogList = [];
    if (apiLog) {
        apiLogList = JSON.parse(apiLog);
    }
    let newApi = { type, url, data };
    let existIndex = -1;
    isExist = apiLogList.find((item, index) => {
        existIndex = index;
        return item.url == newApi.url;
    });
    if (!isExist) {
        apiLogList.push(newApi);
    } else {
        apiLogList[existIndex] = newApi;
    }
    ende.writeFsSy(logFilePath, JSON.stringify(apiLogList));
}

//之前的导出csv方法
// function downLoadCsv(defaultname, fields, dataList, callback) {
//     let defaultpath = process.cwd() + '/' + defaultname + '.csv';
//     //name,postfix
//     dialog.showSaveDialog({
//         defaultPath: defaultpath,
//         properties: [
//             'openFile',
//         ],
//         filters: [{
//             name: '',
//             extensions: ['csv']
//         },]
//     }, function (res) {
//         if (res) {
//             res = res.replace(/\\/g, "\/");
//             const Json2csvParser = json2csv.Parser;
//             const transformOpts = {
//                 highWaterMark: 16384,
//                 encoding: 'utf-8'
//             };
//             const json2csvParser = new Json2csvParser({
//                 fields
//             }, transformOpts);

//             let csvStr = json2csvParser.parse(dataList);
//             csvStr = iconv.encode(csvStr, 'gb2312');
//             fs.writeFileSync(res, csvStr);
//             if (typeof callback === 'function') callback(true);
//         }
//     });
// }

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
module.exports = {
    genSPOConfig,
    genSCEConfig,
    deleteFileByPubKey,
    backupFile,
    getGroupConf,
    writeApiReqLog,
    // downLoadCsv,
    generatePdf
}