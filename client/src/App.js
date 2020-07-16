import React from "react"

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Layout from "./layout"
import UserContextProvider from "./contexts/user.context"

function App() {
    return (
        <UserContextProvider>
            <div
                className="App min-vh-100 min-vw-100 d-flex align-items-center justify-content-center py-3"
            >
                <Layout />
            </div>
        </UserContextProvider>
    )
}

export default App
