import React from "react"
import { Router, Route, Switch } from "react-router-dom"

import history from "../configs/history"
import routes from "../configs/routes"

const mainStyle = {
    borderRadius: "4px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
}

export default (props) => (
    <Router history={history}>
        <Switch>
            <div className="bg-white px-4 py-3" style={mainStyle}>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact
                        component={route.component}
                    />
                ))}
            </div>
        </Switch>
    </Router>
)
