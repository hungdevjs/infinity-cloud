import React, { useState } from "react";
import Sidebar from "react-sidebar";
import SidebarContent from "./SidebarContent"

export default () => {
    const [sidebarOpen, onSetSidebarOpen] = useState(false)

    return (
        <Sidebar
            sidebar={<SidebarContent />}
            open={sidebarOpen}
            onSetOpen={onSetSidebarOpen}
            styles={{ sidebar: { background: "white" } }}
        >
            <div className="ml-2 mt-1">
                <i className="fas fa-bars" style={{ cursor: 'pointer', fontSize: '1.25rem' }} onClick={() => onSetSidebarOpen(true)} />
            </div>
        </Sidebar>
    );

}