import * as React from 'react';
import $ from 'jquery'
let imgSrc = require('@static/yuanyuan.jpg')
let imgSrc2 = require('@static/stamp.jpg')
let jsPDF = require('jspdf')
declare var App: any;
// declare var html2canvas: any
const html2canvas = require('html2canvas')

/**
*
*画出弧形文字
* @param {*} 文字
* @param {*} x 中心坐标x轴
* @param {*} y 中心坐标y轴
* @param {*} radius  半径
* @param {*} startRotation  转圈的起始 0最上边 
*/

CanvasRenderingContext2D.prototype.fillTextCircle = function (text, x, y, radius, startRotation) {
    var numRadsPerLetter = 2 * Math.PI / text.length;
    this.save();
    this.translate(x, y);
    this.rotate(startRotation);

    for (var i = 0; i < text.length; i++) {
        this.save();
        this.rotate(i * numRadsPerLetter);

        this.fillText(text[i], 0, -radius);
        this.restore();
    }
    this.restore();
}

class Biz extends React.Component<{}, {}>{
    constructor(props) {
        super(props)
    }

    /**
 * 截图功能
 * targetDom 要克隆的目标dom元素
 * cb 回调函数
 */
    doScreenShot(targetDom, cb) {
        html2canvas(targetDom, {
            scale: 2,
            allowTaint: false,
            useCORS: true,
            logging: true
        }).then(function (canvas) {
            // document.body.appendChild(canvas);
            if (cb) {
                // console.log(canvas.toDataURL())
                // cb(canvas.toDataURL("image/jpeg", 1.0)) //图片质量，0-1
            }

        });
    }
    componentDidMount() {
        var mycanvas = document.getElementById('mycanvas') as HTMLCanvasElement;
        var context = mycanvas.getContext('2d');

        context.fillStyle = '#99f';    //   填充颜色
        context.fillRect(0, 0, 1000, 1000);

        var img = new Image;
        img.src = imgSrc2;
        img.onload = function () {
            context.drawImage(img, 40, 40, 200, 200);
            drawText()

        }

        function drawText() {
            //96位的hash
            var myhash = '// akadjkdawdwahdawhawhdwdrrjkadjkdawdwahdawhdwdrrjkadjkdawdwahdawhdwdrrjkadjkdawdwahdawhdwdrrdwdrr ';
            context.font = "12pt Arial";
            context.textAlign = "center";
            var centerX = 140;
            var centerY = 140;
            // var angle = Math.PI * 0.5; // radians
            var radius = 100
            context.fillTextCircle(myhash, centerX, centerY, radius, 0)
        }

        let ele = document.querySelector('.mybtn') as HTMLElement;
        let targetDom = $('#targetDom')[0]
        ele.onclick = () => {
            this.doScreenShot(targetDom, function (oriBase64Str) {
                // let imgData = oriBase64Str.split(';base64,').pop();
                var pdf = new jsPDF();

                pdf.addImage(oriBase64Str, 'JPEG', 0, 0);
                pdf.save("download.pdf");
            });
        }

    }
    render() {
        return (
            <div id="targetDom">
                <div style={{ marginTop: '20px' }}>
                    {/* <input type="file" className="upload" onChange={this.uploadfile2.bind(this)} /> */}

                    <button className="mybtn">截屏</button>

                </div>
                <div style={{ color: 'red' }}>hello world</div>
                <img src={imgSrc} alt="he" style={{ background: `url(${imgSrc})`, width: '200px', height: '150px', border: '1px solid red' }} />

                <canvas id="mycanvas" width="1111" height="1111"></canvas>

            </div>
        )
    }
}
export default Biz