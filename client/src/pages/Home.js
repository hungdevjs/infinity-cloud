import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { Row, Col, Container, Table, Alert } from "reactstrap"
import moment from "moment"
import Select from "react-select"

import FileFolder from "../components/FileFolder"
import UploadFileBtn from "../components/UploadFileBtn"

import { userGetFileAndFolder } from "../redux/action"
import { getFileInfo } from "../utils/api"
import noti from "../utils/noti"

const monthOptions = Array(12).fill("").map((item, index) => ({ value: index + 1, label: index + 1 }))
const monthNow = new Date().getMonth() + 1
const yearNow = new Date().getFullYear()
const yearOptions = [
    { label: yearNow - 1, value: yearNow - 1 },
    { label: yearNow, value: yearNow },
    { label: yearNow + 1, value: yearNow + 1 }
]

const Home = props => {
    const [year, setYear] = useState(yearNow)
    const [month, setMonth] = useState(monthNow)

    useEffect(() => {
        getData()
    }, [year, month])

    const getData = () => props.userGetFileAndFolder({ isDeleted: false, year, month })

    const [isDownloading, setIsDownloading] = useState(false)
    const onDownload = async id => {
        if (isDownloading) return

        setIsDownloading(true)
        try {
            const res = await getFileInfo(id)

            if (res.data && !res.data.status) throw new Error(res.data.error)

            window.open(res.data.url)
        } catch (err) {
            noti({
                type: "danger",
                message: err.message
            })
        }
        setIsDownloading(false)
    }

    return <div>
        {/* <Row>
            <Col md={2} sm={6} xs={6}>
                <UploadFileBtn getData={getData} />
            </Col>
        </Row>
        <FileFolder type="Folders" data={props.folders} isDeleted={props.isDeleted} />
        <FileFolder type="Files" data={props.files} isDeleted={props.isDeleted} /> */}

        <Container>
            <Row className="mb-2">
                <Col md={2}>
                    <h5 className="mb-0">Translated files</h5>
                </Col>
                <Col md={2}>
                    <Select
                        options={yearOptions}
                        placeholder="Year"
                        value={yearOptions.find(item => item.value === year)}
                        onChange={e => setYear(e.value)}
                    />
                </Col>
                <Col md={2}>
                    <Select
                        options={monthOptions}
                        placeholder="Month"
                        value={monthOptions.find(item => item.value === month)}
                        onChange={e => setMonth(e.value)}
                    />
                </Col>
                <Col md={6} className="text-right">
                    <UploadFileBtn getData={getData} />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={12}>
                    {props.files && props.files.length
                        ? <Table hovered striped bordered size="sm">
                            <thead>
                                <tr>
                                    <th>File name</th>
                                    <th>Date uploaded</th>
                                    <th>Length</th>
                                    <th>Money</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.files.map((file, index) => <tr key={index}>
                                    <td>{file.name}</td>
                                    <td>{file.date}</td>
                                    <td>{file.minutes} mins {file.seconds} seconds</td>
                                    <td>{file.money.toLocaleString()} VND</td>
                                    <td className="text-center">
                                        <i
                                            className="fas fa-download cursor-pointer"
                                            title="Download"
                                            onClick={() => onDownload(file._id)}
                                        />
                                    </td>
                                </tr>)}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="font-weight-bold">{props.totalTime}</td>
                                    <td className="font-weight-bold">{props.totalMoney.toLocaleString()} VND</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                        : <Alert color="primary">No file to display</Alert>}
                </Col>
            </Row>
        </Container>
    </div>
}

const mapStateToProps = state => ({
    files: state.files,
    folders: state.folders,
    totalTime: state.totalTime,
    totalMoney: state.totalMoney
})

const mapDispatchToProps = {
    userGetFileAndFolder
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)