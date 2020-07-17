import React, { useState } from 'react'
import history from '../configs/history'

export default ({ item, isActive }) => {
    const [bgColor, setBgColor] = useState(isActive ? '#ccc' : '#fff')

    return <div
        className="w-100 d-flex py-2"
        style={{ cursor: 'pointer', backgroundColor: bgColor }}
        onMouseEnter={e => {
            if (!isActive) {
                setBgColor('#ddd')
            }
        }}
        onMouseLeave={e => {
            if (!isActive) {
                setBgColor('#fff')
            }
        }}
        onClick={() => history.push(item.path)}
    >
        <div className="d-flex align-items-center justify-content-center" style={{ width: "50px", backgroundColor: bgColor }}>
            <i className={item.icon} style={{ fontSize: "1.25rem" }} />
        </div>
        <div className="flex-grow-1" style={{ fontWeight: 650, backgroundColor: bgColor }}>
            {item.name}
        </div>
    </div>
}