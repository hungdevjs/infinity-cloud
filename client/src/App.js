import React from "react"

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Layout from "./layout"
import UserContextProvider from "./contexts/user.context"

const appStyle = {
    backgroundImage: "url('/bgblue.jpg')",
    backgroundPosition: "center",
    backgroundSize: "cover",
}

function App() {
    return (
        <UserContextProvider>
            <div
                className="App min-vh-100 min-vw-100 d-flex align-items-center justify-content-center py-3"
                style={appStyle}
            >
                <Layout />
            </div>
        </UserContextProvider>
    )
}

export default App
