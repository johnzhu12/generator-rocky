import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import SimpleEnter from '@components/simpleenter/simpleenter'
import ComplexEnter from '@components/complexenter/complexenter'
import ListOper from '@components/listoperation/listoperation'
import SearchList from '@components/searchDataList/searchDataList'



class BizRouter extends React.Component<{}, {}>{
    render() {
        return (
            <Switch>
                <Route path='/biz/simple' component={SimpleEnter} />
                <Route path='/biz/complex' component={ComplexEnter} />
                <Route path='/biz/listoper' component={ListOper} />
                <Route path='/biz/searchList' component={SearchList} />
            </Switch>
        )
    }
}

export default BizRouter