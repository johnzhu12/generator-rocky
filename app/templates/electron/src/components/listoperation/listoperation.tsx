import * as React from 'react'
import common from '@common/index'
const BN = require('bn.js')
declare var App: any;



class Biz extends React.Component<{}, {}>{
    base64String: string;
    base64String2: string;
    textStr
    constructor(props) {
        super(props)
    }
    uploadfile1 = function (e) {
        var file = e.currentTarget.files[0];
        //读取文件
        if (window['FileReader']) {
            var fr = new FileReader();
            fr.onloadend = (e) => {

                this.base64String = e.target['result'];

                console.log('我是result', this.base64String)

            };

            // fr.readAsBinaryString(file)
            fr.readAsDataURL(file);
        } else {
            alert("请使用高版本浏览器！");
        }
    }
    //创建pdf
    createPdf() {
        let base64Str = this.base64String.split(';base64,').pop();
        App.fileAction.generatePdf(base64Str, '/Users/johnzhu/Desktop/demo.pdf', (flag) => {
            if (flag) {
                console.log('生成pdf成功！')
            } else {
                console.log('生成pdf失败！')
            }
        })
    }
    uploadfile2 = function (e) {
        var file = e.currentTarget.files[0];
        //读取文件
        if (window['FileReader']) {
            var fr = new FileReader();
            fr.onloadend = (e) => {

                this.base64String2 = e.target['result'].split('base64,')[1];

                // console.log('我是result', this.base64String)

            };

            // fr.readAsBinaryString(file)
            // fr.readAsArrayBuffer(file)
            fr.readAsDataURL(file);
            // fr.readAsText(file)
        } else {
            alert("请使用高版本浏览器！");
        }
    }
    // uploadfile3 = function (e) {
    //     var file = e.currentTarget.files[0];
    //     //读取文件
    //     if (window['FileReader']) {
    //         var fr = new FileReader();
    //         fr.onloadend = (e) => {

    //             this.textStr = e.target['result'];

    //         };

    //         // fr.readAsBinaryString(file)
    //         // fr.readAsArrayBuffer(file)
    //         // fr.readAsDataURL(file);
    //         fr.readAsText(file)
    //     } else {
    //         alert("请使用高版本浏览器！");
    //     }
    // }
    //加密
    enByPubkey() {
        let pub = 'BBVdJPbzw1IbwOI53pgzeUAb8Zw7ff4S8oA3Y79JKv/9I2tTAoPzlpEE04NHd838M/ookODObgG7FBssRxesH1I=' //后端给我的公钥
        let base64Str = this.base64String2;
        let key = App.encrypt.getRadomKeyPair(); //生成的随机key
        let keyObj = App.encrypt.getPriPubKeys(key);
        localStorage.setItem('keyPair', JSON.stringify(keyObj)) //存储key

        let myAesKey = common.until.getRadomKey() //生成的32位加密key
        // let encryptedStr = App.ende.aesEncryptForJava(myAesKey, base64Str); //文件内容对称加密;
        let S = (new BN(myAesKey, 16)).toBuffer({ size: 32 })
        let encryptedStr = App.ecdh.encrypt(base64Str, S);
        // let encryptedBase64Str = App.ecdh.hexToBase64(encryptedStr) //转成base64
        let keyEnc = App.encrypt.enByPubkey(pub, keyObj.privateKey, myAesKey) //对key进行非对称加密

        let Obj = {
            pubKey: keyObj.publicKey,
            content: encryptedStr,
            keyEnc: keyEnc
        }
        App.fileAction.backupFile('/Users/zhujohn/Desktop/1.text', JSON.stringify(Obj), function (flag) {
            if (flag) {
                console.log('保存成功');
            } else {
                console.log('失败');
            }
        })

    }
    deByPrivKey(encrypted) {
        let keyPair = JSON.parse(localStorage.getItem('keyPair'));

        App.encrypt.deByPrivKey(keyPair.privateKey, keyPair.privateKey, encrypted)
    }
    render() {
        return (
            <div>
                {/* <div>
                    <input type="file" className="upload" accept="application/pdf" onChange={this.uploadfile1.bind(this)} />

                    <button onClick={this.createPdf.bind(this)}>创建pdf</button>
                </div> */}
                <div style={{ marginTop: '20px' }}>
                    <input type="file" className="upload" accept="application/pdf" onChange={this.uploadfile2.bind(this)} />

                    <button onClick={this.enByPubkey.bind(this)}>AES加密</button>

                </div>
                {/* <div style={{ marginTop: '20px' }}>

                    <input type="file" className="upload" accept="application/text" onChange={this.uploadfile3.bind(this)} />

                    <button onClick={this.deByPrivKey.bind(this)}>AES解密</button>
                </div> */}
            </div>
        )
    }
}
export default Biz