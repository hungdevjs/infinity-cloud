import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"

import FileFolder from "../components/FileFolder"

import { userGetFileAndFolder } from "../redux/action"

const Home = props => {
    useEffect(() => {
        props.userGetFileAndFolder()
    }, [])

    return <div>
        <FileFolder type="Files" data={props.files} />
        <FileFolder type="Folders" data={props.folders} />
    </div>
}

const mapStateToProps = state => ({
    files: state.files,
    folders: state.folders
})

const mapDispatchToProps = {
    userGetFileAndFolder
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)