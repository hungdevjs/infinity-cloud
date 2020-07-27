import React, { useState } from 'react'
import { connect } from "react-redux"

import SidebarItem from './SidebarItem'
import sidebar from '../configs/sidebar'

import history from '../configs/history'

const SidebarContent = props => {
    const [pathname, setPathname] = useState(window.location.pathname)

    history.listen((location) => {
        setPathname(location.pathname)
    })

    return <div style={{ width: '200px' }}>
        <p className="text-center my-3">{props.user}</p>
        {sidebar.map((item, index) => <SidebarItem key={index} item={item} isActive={item.path === pathname} />)}
    </div>
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(SidebarContent)