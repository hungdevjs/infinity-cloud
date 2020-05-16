import React from "react"

import "bootstrap/dist/css/bootstrap.min.css"
import "react-perfect-scrollbar/dist/css/styles.css"
import "./App.css"

import Layout from "./layout"

const appStyle = {
    backgroundImage: "url('/bgblue.jpg')",
    backgroundPosition: "center",
    backgroundSize: "cover",
}

function App() {
    return (
        <div
            className="App min-vh-100 min-vw-100 d-flex align-items-center justify-content-center"
            style={appStyle}
        >
            <Layout />
        </div>
    )
}

export default App
