import React, { useState } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Form, FormGroup, Input, Button } from "reactstrap"

import axios from "axios"

import ViewModal from "./ViewModal"
import useModal from "../hooks/useModal"
import { apiUpload } from "../utils/api"

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

    const onFileChange = e => setFiles(e.target.files)

    const onUpload = e => {
        e.preventDefault()

        const formData = new FormData()
        for (const key of Object.keys(files)) {
            formData.append('files', files[key])
        }
        console.log(formData)

        axios.post("http://localhost:8000/api/test", formData, {
        }).then(res => {
            console.log(res.data)
        })
    }

    const renderModal = () => <ViewModal
        isOpen={isOpen}
        toggle={toggle}
        title="Upload files"
        onConfirm={() => console.log("upload files")}
    >
        <Form onSubmit={onUpload}>
            <FormGroup>
                <Input type="file" multiple className="mb-3" onChange={onFileChange} />
                <Button color="primary">Upload</Button>
            </FormGroup>
        </Form>
    </ViewModal>

    return <div className="mb-3">
        {renderModal()}
        {/* <p className="mb-2">{props.user}</p> */}
        <UploadFileButton onClick={toggle}>Upload files</UploadFileButton>
    </div>
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFileBtn)