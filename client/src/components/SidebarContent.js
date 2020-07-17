import React, { useState } from 'react'

import SidebarItem from './SidebarItem'
import sidebar from '../configs/sidebar'

import history from '../configs/history'

export default () => {
    const [pathname, setPathname] = useState(window.location.pathname)

    history.listen((location) => {
        setPathname(location.pathname)
    })

    return <div style={{ width: '200px' }}>
        {sidebar.map((item, index) => <SidebarItem key={index} item={item} isActive={item.path === pathname} />)}
    </div>
}