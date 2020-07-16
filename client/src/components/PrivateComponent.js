import React, { useState, useEffect } from 'react'
import history from '../configs/history'
import Sidebar from './Sidebar'
export default ({ user, route }) => {
    useEffect(() => {
        if (!user && route.isLogged) history.push('/login')
    }, [])

    const [sidebarIsHiden, setSidebarIsHiden] = useState(window.innerWidth < 960)
    window.addEventListener('resize', () => {
        if (window.innerWidth < 960) setSidebarIsHiden(true)
        else setSidebarIsHiden(false)
    })

    const Component = route.component

    return <div style={{ paddingLeft: sidebarIsHiden ? 0 : '200px' }}>
        <Sidebar />
        <Component />
    </div>
}