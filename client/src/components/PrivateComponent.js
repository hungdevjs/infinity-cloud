import React, { useEffect } from 'react'
import { connect } from "react-redux"
import Sidebar from './Sidebar'

import { userGetInfo } from "../redux/action"

const PrivateComponent = (props) => {
    const { user, route } = props

    useEffect(() => {
        if (!user && route.isLogged) {
            props.userGetInfo()
        }
    }, [])

    const Component = route.component

    return <>
        <Sidebar />
        <Component />
    </>
}

const mapDispatchToProps = {
    userGetInfo
}

export default connect(null, mapDispatchToProps)(PrivateComponent)