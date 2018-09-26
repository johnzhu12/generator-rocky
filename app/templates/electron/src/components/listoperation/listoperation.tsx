import * as React from 'react'
declare var App: any;



class Biz extends React.Component<{}, {}>{
    base64String: string;
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

                this.base64String = e.target['result'];

                console.log('我是result', this.base64String)

            };

            // fr.readAsBinaryString(file)
            fr.readAsArrayBuffer(file)
            // fr.readAsDataURL(file);
        } else {
            alert("请使用高版本浏览器！");
        }
    }
    //加密
    encryptAES() {
        App.encrypt()
    }
    decryptAES() {

    }
    render() {
        return (
            <div>
                <div>
                    <input type="file" className="upload" accept="application/pdf" onChange={this.uploadfile1.bind(this)} />

                    <button onClick={this.createPdf.bind(this)}>创建pdf</button>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <input type="file" className="upload" accept="application/pdf" onChange={this.uploadfile2.bind(this)} />

                    <button onClick={this.encryptAES.bind(this)}>AES加密</button>
                    <button onClick={this.decryptAES.bind(this)}>AES解密</button>
                </div>
            </div>
        )
    }
}
export default Biz