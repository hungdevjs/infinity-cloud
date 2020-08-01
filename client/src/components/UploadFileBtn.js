import React, { useState } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import FormUpload from "./FormUpload"
import useModal from "../hooks/useModal"

import { setModal, upload } from "../redux/action"

const UploadFileButton = styled.button`
    background-color: #ddd;
    width: 100%;
    margin: 0 16px;
    padding: 8px 16px;
    border-radius: 20px;
    border: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
    cursor: pointer;
    transition: 0.2s ease;
    &:hover {
        background-color: #bbb
    }
    &:focus {
        outline: none
    }
    &:active {
        transform: scale(0.95)
    }
`

const UploadFileBtn = props => {
    const [isOpen, toggle] = useModal()

    const [files, setFiles] = useState([])

    const [folderId, setFolderId] = useState(null)

    const [folderName, setFolderName] = useState("")

    const maxFileSize = 2000000000

    const onFileChange = e => {
        if (e.target.files.length > 5) {
            props.setModal({
                isOpen: true,
                type: "danger",
                message: "You can choose maximum 5 files each time"
            })
            e.target.value = ""
            return
        }

        for (const file of e.target.files) {
            if (file.size > maxFileSize) {
                props.setModal({
                    isOpen: true,
                    type: "danger",
                    message: "Max size for each file is 2GB"
                })
                e.target.value = ""
                return
            }
        }

        setFiles(e.target.files)
    }

    const onUpload = async e => {
        e.preventDefault()

        const formData = new FormData()
        for (const key of Object.keys(files)) {
            formData.append('files', files[key])
        }

        const cb = () => {
            toggle()
            setFolderName("")
            setFolderId(null)
            props.getData()
        }

        props.upload({ formData, folderId, folderName, cb })
    }

    const onChangeFolder = e => setFolderId(e.value)

    return <div className="mb-3">
        <FormUpload
            isOpen={isOpen}
            toggle={toggle}
            folderName={folderName}
            files={files}
            setFolderName={setFolderName}
            onFileChange={onFileChange}
            onChangeFolder={onChangeFolder}
            onUpload={onUpload}
        />
        <UploadFileButton onClick={toggle}>Upload files</UploadFileButton>
    </div>
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {
    setModal,
    upload
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFileBtn)