import * as React from 'react'
import common from '@common/index'
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
        App.fileAction.generatePdf(base64Str, '/Users/johnzhu/Desktop/demo.jpg', (flag) => {
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
    uploadfile3 = function (e) {
        var file = e.currentTarget.files[0];
        //读取文件
        if (window['FileReader']) {
            var fr = new FileReader();
            fr.onloadend = (e) => {

                this.textStr = e.target['result'];

            };

            // fr.readAsBinaryString(file)
            // fr.readAsArrayBuffer(file)
            // fr.readAsDataURL(file);
            fr.readAsText(file)
        } else {
            alert("请使用高版本浏览器！");
        }
    }
    //加密
    enByPubkey() {
        let pub = 'BFv5WUi8bwb6EysL9ntmQPOV67mxT9Z/wMobOdDC3/VE56frGMgxYhlYUWngxIV94ME4WVouvmaAZqZiXZMrHqE=' //DBS的公钥
        let base64Str = this.base64String2;
        // let keyObj = App.encrypt.createPairKeys();//生成的随机key
        let keyObj = {   //写死的公私钥
            pubKey: 'BJ+TmEOKxycd703ZpmV5OFwF/5bXGr6kpfEKkSlYgsXpTsfG6k57u5R1FGTXGx2qgJnwSiAfeBEOz5AMr4OcNjA=',
            privKey: 'KIloFd+iYcsxVLUW83HiqYAkd5uf3BtVqQtlGD0/1BE='
        }
        localStorage.setItem('keyPair', JSON.stringify(keyObj)) //存储key

        let myAesKey = common.until.getRadomKey() //生成的64位加密key

        let cipher = App.encrypt.strToBNBuffer(myAesKey, 'hex')  //转成bigNum buffer,和cipher类型一致
        let base64Bn = cipher.toString('base64')  //转成base64格式

        let encryptedStr = App.ende.aesEncrypt(base64Str, cipher)

        let keyEnc = App.encrypt.enByPubkey(pub, keyObj.privKey, base64Bn) //对key进行非对称加密
        // let mykeyEnc = App.encrypt.enByPubkey(keyObj.pubKey, keyObj.privKey, base64Bn) //抄送自己一份
        console.log('base64Bn', base64Bn)

        let Obj = {
            pubKey: keyObj.pubKey,
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
    //解密
    deByPrivKey() {
        let keyPair = JSON.parse(localStorage.getItem('keyPair'))
        // console.log(this.textStr)
        let obj = JSON.parse(this.textStr)
        let base64Bn = App.encrypt.deByPrivKey(keyPair.privKey, keyPair.pubKey, obj.mykeyEnc) //对key进行非对称解密

        let cipher = App.encrypt.strToBNBuffer(base64Bn, 'base64') //转成buffer
        let base64Str = App.ende.aesDecrypt(obj.content, cipher) //解密文件内容

        App.fileAction.generatePdf(base64Str, '/Users/johnzhu/Desktop/demo.jpeg', (flag) => {
            if (flag) {
                console.log('生成pdf成功！')
            } else {
                console.log('生成pdf失败！')
            }
        })
    }
    render() {
        return (
            <div>
                {/* <div>
                    <input type="file" className="upload" accept="application/pdf" onChange={this.uploadfile1.bind(this)} />

                    <button onClick={this.createPdf.bind(this)}>创建pdf</button>
                </div> */}
                <div style={{ marginTop: '20px' }}>
                    <input type="file" className="upload" onChange={this.uploadfile2.bind(this)} />

                    <button onClick={this.enByPubkey.bind(this)}>AES加密</button>

                </div>
                <div style={{ marginTop: '20px' }}>

                    <input type="file" className="upload" onChange={this.uploadfile3.bind(this)} />

                    <button onClick={this.deByPrivKey.bind(this)}>AES解密</button>
                </div>
            </div>
        )
    }
}
export default Biz

