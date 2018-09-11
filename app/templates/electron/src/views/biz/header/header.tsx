import * as React from 'react'
import HeaderTag from './header.css'


class Header extends React.Component<{}, {}>{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <HeaderTag>
                <div className="headerFrame">
                    我是头部
                </div>
            </HeaderTag>

        )
    }

}
export default Header