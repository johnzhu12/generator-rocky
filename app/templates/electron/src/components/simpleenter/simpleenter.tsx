import * as React from 'react';
declare var App: any;



class Biz extends React.Component<{}, {}>{
    constructor(props) {
        super(props)
    }
    enByPubkey() {
        var pub = 'BBVdJPbzw1IbwOI53pgzeUAb8Zw7ff4S8oA3Y79JKv/9I2tTAoPzlpEE04NHd838M/ookODObgG7FBssRxesH1I=';
        let keyObj = App.encrypt.createPairKeys();//生成的随机key
        localStorage.setItem('keyPair', JSON.stringify(keyObj)) //存储key
        let cypher = App.ecdh.generateCypher(keyObj.privKey, pub)  //我的私钥和对方公钥
        let shaCypher = App.ecdh.sha3(cypher)
        console.log(shaCypher)
    }
    render() {
        return (
            <div>
                <div style={{ marginTop: '20px' }}>
                    {/* <input type="file" className="upload" onChange={this.uploadfile2.bind(this)} /> */}

                    <button onClick={this.enByPubkey.bind(this)}>加密</button>

                </div>
            </div>
        )
    }
}
export default Biz