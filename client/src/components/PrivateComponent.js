import React, { useEffect } from 'react'
import history from '../configs/history'
import Sidebar from './Sidebar'
export default ({ user, route }) => {
    useEffect(() => {
        if (!user && route.isLogged) history.push('/login')
    }, [])

    const Component = route.component

    return <>
        <Sidebar />
        <Component />
    </>
}