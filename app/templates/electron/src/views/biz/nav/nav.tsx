import * as React from 'react'
import { Menu } from 'antd'
const SubMenu = Menu.SubMenu;

class Nav extends React.Component<{}, {}>{
    constructor(props) {
        super(props);
        ["handleClick"].forEach(m => this[m] = this[m].bind(this))
    }
    handleClick(e) {
        console.log('我是key', e.key)
        location.hash = 'biz' + e.key
    }
    render() {
        return (
            <Menu
                onClick={this.handleClick}
                mode="inline"
            >
                <SubMenu key='enter' title="录入页面">
                    <Menu.Item key='/simple'>
                        简单录入页面
                    </Menu.Item>
                    <Menu.Item key='/complex'>
                        复杂录入页面
                    </Menu.Item>
                </SubMenu>
                <SubMenu key='list' title="列表操作">
                    <Menu.Item key='/listoper'>
                        列表操作页面
                    </Menu.Item>

                </SubMenu>
            </Menu>
        )
    }

}
export default Nav