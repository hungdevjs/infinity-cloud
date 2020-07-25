import React, { useEffect } from 'react'
import { connect } from "react-redux"
import Sidebar from './Sidebar'

import { userGetInfo } from "../redux/action"

import UserIcon from "./UserIcon"

const PrivateComponent = (props) => {
    const { user, route } = props

    useEffect(() => {
        if (!user && route.isLogged) {
            props.userGetInfo()
        }
    }, [])

    const Component = route.component

    return <div className="py-5 px-3">
        <UserIcon />
        <Sidebar />
        <Component />
    </div>
}

const mapDispatchToProps = {
    userGetInfo
}

export default connect(null, mapDispatchToProps)(PrivateComponent)