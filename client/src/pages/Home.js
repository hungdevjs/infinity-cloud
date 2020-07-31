import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { Row, Col } from "reactstrap"

import FileFolder from "../components/FileFolder"
import UploadFileBtn from "../components/UploadFileBtn";

import { userGetFileAndFolder } from "../redux/action"

const Home = props => {
    useEffect(() => {
        getData()
    }, [])

    const getData = () => props.userGetFileAndFolder({ isDeleted: props.isDeleted })

    return <div>
        <Row>
            <Col md={2} sm={6} xs={6}>
                <UploadFileBtn getData={getData} />
            </Col>
        </Row>
        <FileFolder type="Folders" data={props.folders} isDeleted={props.isDeleted} />
        <FileFolder type="Files" data={props.files} isDeleted={props.isDeleted} />
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