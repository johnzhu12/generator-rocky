import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import SimpleEnter from '@components/simpleenter/simpleenter'
import ComplexEnter from '@components/complexenter/complexenter'
import ListOper from '@components/listoperation/listoperation'



class BizRouter extends React.Component<{}, {}>{
    render() {
        return (
            <Switch>
                <Route path='/biz/simple' component={SimpleEnter} />
                <Route path='/biz/complex' component={ComplexEnter} />
                <Route path='/biz/listoper' component={ListOper} />
            </Switch>
        )
    }
}

export default BizRouter