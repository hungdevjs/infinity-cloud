import React, { useState } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import FormUpload from "./FormUpload"
import useModal from "../hooks/useModal"

import { setModal, upload } from "../redux/action"
import noti from "../utils/noti"

const UploadFileButton = styled.button`
    background-color: #ddd;
    width: 100%;
    padding: 8px 16px;
    border-radius: 4px;
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
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const [folderId, setFolderId] = useState("")

    const [folderName, setFolderName] = useState("")

    const maxFileSize = 2000000000

    const onFileChange = e => {
        if (e.target.files.length > 10) {
            props.setModal({
                isOpen: true,
                type: "danger",
                message: "You can choose maximum 5 files each time",
                onConfirm: null
            })
            e.target.value = ""
            return
        }

        for (const file of e.target.files) {
            if (file.size > maxFileSize) {
                props.setModal({
                    isOpen: true,
                    type: "danger",
                    message: "Max size for each file is 2GB",
                    onConfirm: null
                })
                e.target.value = ""
                return
            }
        }

        setFiles(e.target.files)
    }

    const onUpload = async e => {
        e.preventDefault()

        if (!minutes && !seconds) {
            noti({
                type: "danger",
                title: "Failed",
                message: "Minutes and seconds is required"
            })
            return
        }

        if (seconds < 0 || seconds > 60) {
            noti({
                type: "danger",
                title: "Failed",
                message: "Invalid seconds"
            })
            return
        }

        const formData = new FormData()
        for (const key of Object.keys(files)) {
            formData.append('files', files[key])
        }

        const cb = () => {
            toggle()
            setFolderName("")
            setFolderId("")
            setFiles([])
            props.getData()
        }

        props.upload({ formData, folderId, minutes, seconds, folderName, cb })
    }

    const onChangeFolder = e => setFolderId(e.value)

    return <div className="mb-3">
        <FormUpload
            isOpen={isOpen}
            toggle={toggle}
            folderName={folderName}
            minutes={minutes}
            setMinutes={setMinutes}
            seconds={seconds}
            setSeconds={setSeconds}
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