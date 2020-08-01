import React, { useState } from "react"
import { Form, FormGroup, Row, Col, Input, Button, Label } from "reactstrap"
import styled from "styled-components"

import ViewModal from "./ViewModal"
import FolderSelected from "./FolderSelected"

const UploadLabel = styled.label`
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .25rem;
    background-color: #dc3545;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #c82333
    }
`

export default ({
    isOpen,
    toggle,
    files,
    onFileChange,
    onChangeFolder,
    onUpload,
    folderName,
    setFolderName
}) => {
    const [newFolder, setNewFolder] = useState(false)

    const onChangeOption = () => {
        setNewFolder(!newFolder)
        setFolderName("")
        onChangeFolder({ value: "" })
    }

    return <ViewModal
        isOpen={isOpen}
        toggle={toggle}
        title="Upload files"
        noFooter
    >
        <Form onSubmit={onUpload} encType="multipart/form-data">
            <FormGroup>
                <Row>
                    <Col md={12} className="mb-2">
                        <h6>You can choose maximum 10 files each times, and 10MB is maximum for each file</h6>
                    </Col>
                    {files && files.length > 0 && <Col md={12} className="mb-2">
                        You choose {files.length} files.
                        <ol>
                            {Object.values(files).map((item, index) => <li>{item.name}</li>)}
                        </ol>
                    </Col>}
                    <Col md={8} className="mb-2">
                        {newFolder ? <Input
                            className="mb-2"
                            value={folderName}
                            onChange={e => setFolderName(e.target.value)}
                            placeholder="Folder name"
                        /> : <FolderSelected onChange={onChangeFolder} />}
                    </Col>
                    <Col md={4} className="mb-2">
                        <Button block color="success" onClick={onChangeOption}>{newFolder ? "Choose" : "Create"} folder</Button>
                    </Col>
                    <Col md={4}>
                        <Input id="fileUpload" type="file" multiple className="d-none" onChange={onFileChange} />
                        <UploadLabel htmlFor="fileUpload">Choose files</UploadLabel>
                    </Col>
                    <Col md={4}>
                        <Button color="primary" style={{ height: "36px" }} block>Upload</Button>
                    </Col>
                </Row>
            </FormGroup>
        </Form>
    </ViewModal>
}