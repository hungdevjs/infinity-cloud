import React, { useState } from "react";
import Sidebar from "react-sidebar";
import SidebarContent from "./SidebarContent"

export default () => {
    const [sidebarOpen, onSetSidebarOpen] = useState(false)

    return (
        <Sidebar
            sidebar={SidebarContent}
            open={sidebarOpen}
            onSetOpen={onSetSidebarOpen}
            styles={{ sidebar: { background: "white" } }}
        >
            <button onClick={() => onSetSidebarOpen(true)}>
                Open sidebar
                </button>
        </Sidebar>
    );

}