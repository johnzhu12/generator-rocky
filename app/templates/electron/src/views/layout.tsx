import * as React from 'react'
import { observer } from 'mobx-react'
import { HashRouter, Switch } from 'react-router-dom'
import PageRouter from './router'
import LayoutTag from './layout.css';
import { Spin } from 'antd'
import store from '@models/mask'

@observer
class DepositLayout extends React.Component<{}, {}>{

    render() {
        let loadingStatus = store.maskStore.loading;
        return (
            <LayoutTag>
                <HashRouter>
                    <div className='appFrame'>
                        {loadingStatus ? <div>
                            <Spin tip="加载中..." />
                        </div> : null}
                        <PageRouter />
                    </div>
                </HashRouter>
            </LayoutTag>
        )
    }
}

export default DepositLayout