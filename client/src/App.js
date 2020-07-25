import React from "react"
import { Provider } from 'react-redux'

import store from './redux/store'

import ReactNotification from "react-notifications-component"

import "animate.css"
import "react-notifications-component/dist/theme.css"

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Layout from "./layout"
import Loading from "./components/Loading"
import Modal from "./components/Modal"

function App() {
    return (
        <Provider store={store}>
            <div
                className="App min-vh-100 min-vw-100"
            >
                <Layout />
                <Loading />
                <Modal />
                <ReactNotification />
            </div>
        </Provider>
    )
}

export default App
