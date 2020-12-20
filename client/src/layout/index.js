import React, { useEffect } from "react"
import { Router, Route, Switch } from "react-router-dom"
import { connect } from 'react-redux'

import history from "../configs/history"
import routes from "../configs/routes"

import Login from '../pages/Login'
import PrivateComponent from '../components/PrivateComponent'
import { userGetInfo } from "../redux/action"
const Page404 = () => (
    <div>
        <p className="mb-0" style={{ fontSize: "4rem", fontWeight: 550 }}>
            404
        </p>
        <p>Page not found.</p>
    </div>
)

const Layout = ({ user, userGetInfo }) => {
    useEffect(() => {
        if (!user) userGetInfo()
    }, [])
    return <div>
        <Router history={history}>
            <Switch>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact
                        component={() => <PrivateComponent user={user} route={route} />}
                    />
                ))}
                <Route path="/login" exact component={Login} />
                <Route path="/*" exact component={() => <Page404 />} />
            </Switch>
        </Router>
    </div>
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = { userGetInfo }

export default connect(mapStateToProps, mapDispatchToProps)(Layout)