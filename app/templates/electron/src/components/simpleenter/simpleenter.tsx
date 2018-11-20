import * as React from 'react';
import $ from 'jquery'
let imgSrc = require('@static/yuanyuan.jpg')
declare var App: any;
declare var html2canvas: any



class Biz extends React.Component<{}, {}>{
    constructor(props) {
        super(props)
    }
    screenShot() {
        let ele = document.querySelector('.mybtn') as HTMLElement;
        let targetDom =
            ele.onclick = () => {
                this.doScreenShot($('body'), function (oriBase64Str, width, height) {
                    let base64Str = oriBase64Str.split(';base64,').pop();
                    App.fileAction.generatePdf(base64Str, '/Users/johnzhu/Desktop/demo.jpg', (flag) => {
                        if (flag) {
                            console.log('生成pdf成功！')
                        } else {
                            console.log('生成pdf失败！')
                        }
                    })
                });
            }

    }
    /**
 * 截图功能
 * targetDom 要克隆的目标dom元素
 * cb 回调函数
 */
    doScreenShot(targetDom, cb) {
        html2canvas(document.body, {
            scale: 2,
            allowTaint: false,
            useCORS: true,
            logging: true
        }).then(function (canvas) {
            // document.body.appendChild(canvas);
            if (cb) {
                console.log(canvas.toDataURL())
                cb(canvas.toDataURL())
            }

        });
    }
    render() {
        return (
            <div>
                <div style={{ marginTop: '20px' }}>
                    {/* <input type="file" className="upload" onChange={this.uploadfile2.bind(this)} /> */}

                    <button className="mybtn" onClick={this.screenShot.bind(this)}>截屏</button>

                </div>
                <img src={imgSrc} alt="he" style={{ background: `url(${imgSrc})`, width: '200px', height: '150px', border: '1px solid red' }} />
            </div>
        )
    }
}
export default Biz