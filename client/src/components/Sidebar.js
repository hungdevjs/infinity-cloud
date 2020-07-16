import React from "react";
import Sidebar from "react-sidebar";

import SidebarContent from './SidebarContent'

const mql = window.matchMedia(`(min-width: 960px)`);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false
        };

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }

    render() {
        const { sidebarOpen, sidebarDocked } = this.state

        return (
            <Sidebar
                sidebar={SidebarContent}
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
            >
                {!sidebarOpen && !sidebarDocked && <button onClick={() => this.setState({ sidebarDocked: mql.matches, sidebarOpen: true })}>open</button>}
            </Sidebar>
        );
    }
}

export default App;