import * as React from 'react'
import BizTag from './biz.css'
import { Layout, Row, Col } from 'antd'
import BizHeader from './header/header'
import BizRouter from './bizRouter'
import Nav from './nav/nav'


class Biz extends React.Component<{}, {}>{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <BizTag>
                <Layout>
                    <BizHeader />
                    <Row className="content" style={{ height: "calc(100% - 64px)" }}>
                        <Col span={3} className="nav">
                            <Nav />
                        </Col>
                        <Col span={21} className="biz">
                            <BizRouter />
                        </Col>
                    </Row>
                </Layout>
            </BizTag>
        )
    }
}
export default Biz