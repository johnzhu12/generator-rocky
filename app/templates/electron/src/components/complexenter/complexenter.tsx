import * as React from 'react'
import ComplexTag from './complexenter.css'



class Biz extends React.Component<{}, {}>{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ComplexTag>
                <div className="complex">
                    <a target="_blank" href="http://www.baidu.com">我是百度</a>
                    <iframe src="http://www.baidu.com" className="myiframe"></iframe>
                </div>
            </ComplexTag>
        )
    }
}

export default Biz