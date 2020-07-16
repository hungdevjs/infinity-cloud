import React from "react"
import { Router, Route, Switch } from "react-router-dom"

import history from "../configs/history"
import routes from "../configs/routes"

const Page404 = () => (
    <div>
        <p className="mb-0" style={{ fontSize: "4rem", fontWeight: 550 }}>
            404
        </p>
        <p>Page not found.</p>
    </div>
)

export default (props) => (
    <div>
        <Router history={history}>
            <Switch>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact
                        component={route.component}
                    />
                ))}
                <Route path="/*" exact component={() => <Page404 />} />
            </Switch>
        </Router>
    </div>
)
