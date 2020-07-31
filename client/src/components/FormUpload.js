import React, { useState } from "react"
import { Form, FormGroup, Row, Col, Input, Button } from "reactstrap"

import ViewModal from "./ViewModal"
import FolderSelected from "./FolderSelected"

export default ({
    isOpen,
    toggle,
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
        onChangeFolder({ value: null })
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
                    <Col md={12}>
                        <Input type="file" multiple className="mb-3" onChange={onFileChange} />
                    </Col>
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
                        <Button color="primary" block>Upload</Button>
                    </Col>
                </Row>
            </FormGroup>
        </Form>
    </ViewModal>
}