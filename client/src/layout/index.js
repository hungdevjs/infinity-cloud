import React from "react"
import { Router, Route, Switch } from "react-router-dom"

import history from "../configs/history"
import routes from "../configs/routes"

const mainStyle = {
    borderRadius: "4px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
}

const Page404 = () => (
    <div style={{ width: "300px" }}>
        <p className="mb-0" style={{ fontSize: "4rem", fontWeight: 550 }}>
            404
        </p>
        <p>Page not found.</p>
    </div>
)

export default (props) => (
    <div className="bg-white px-4 py-3" style={mainStyle}>
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
