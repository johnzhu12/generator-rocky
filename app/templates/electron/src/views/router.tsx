import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import bizPage from './biz/biz'
import loginPage from './login/login'



class Router extends React.Component<{}, {}>{
    render() {
        return (
            <Switch>
                <Route path='/biz' component={bizPage} />
                <Route path='/login' component={loginPage} />
                <Redirect to="/biz" />
            </Switch>
        )
    }
}

export default Router