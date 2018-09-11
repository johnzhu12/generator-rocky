import * as React from 'react'

const base64 = require('base64topdf');


class Biz extends React.Component<{}, {}>{
    base64String: string
    constructor(props) {
        super(props)
    }
    uploadhead = function (e) {
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

    createPdf() {
        let base64Str = this.base64String.split(';base64,').pop();
        let decodedBase64 = base64.base64Decode(base64Str, 'PdfFileNameToWrite');
        console.log(decodedBase64)
    }

    render() {
        return (
            <div>
                <input type="file" className="upload" accept="application/pdf" onChange={this.uploadhead.bind(this)} />

                <button onClick={this.createPdf.bind(this)}>创建pdf</button>
            </div>
        )
    }
}
export default Biz