import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import { userGetFileAndFolder, setModal } from "../redux/action"
import FileFolder from "../components/FileFolder"
import history from "../configs/history"

const FileInFolder = props => {
    const folderId = window.location.pathname.split("/")[2]

    const [folder, setFolder] = useState({})

    useEffect(() => {
        if (!props.folders) {
            props.userGetFileAndFolder({ isDeleted: false })
        }
    }, [])

    useEffect(() => {
        if (props.folders) {
            const thisFolder = props.folders.find(item => item._id === folderId)
            if (!thisFolder) {
                history.push("/")
                return
            }

            setFolder(thisFolder)
        }
    }, [props.folders])

    return <>
        <h4>Folder: {folder.name}</h4>
        <FileFolder
            type="Files"
            data={folder.files}
            deleteData={props.userDeleteFile}
            setModal={props.setModal}
        />
    </>
}

const mapStateToProps = state => ({
    folders: state.folders
})

const mapDispatchToProps = {
    userGetFileAndFolder,
    setModal
}

export default connect(mapStateToProps, mapDispatchToProps)(FileInFolder)