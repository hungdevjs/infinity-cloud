import React, { useState, useEffect } from "react"
import { Row, Col, Input, Alert } from "reactstrap"
import styled from "styled-components"

import useModal from '../hooks/useModal'
import { getFileInfo } from "../utils/api"
import noti from "../utils/noti"
import FileType from "./FileType"
import FileTypeFilter from "./FileTypeFilter"
import FileView from "./FileView"
import history from "../configs/history"

const FolderContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    padding: 8px 16px;
    margin-bottom: 8px;
    background-color: ${props => props.color};
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
    cursor: pointer;
    overflow: hidden;
    &:hover {
        background-color: #ddd
    }
`

const HoverOpacity = styled.span`
    transition: .2s ease;
    &:hover {
        color: #888
    }
`

export default props => {
    const { type, data, isDeleted, deleteData, rollbackData, setModal } = props

    const isFiles = type === "Files"

    const [dataRender, setDataRender] = useState(data)

    const [searchString, setSearchString] = useState("")
    const [currentType, setCurrentType] = useState("all")

    const [viewingFile, setViewingFile] = useState(null)

    const [isOpen, toggle] = useModal()

    useEffect(() => {
        setDataRender(data)
    }, [data])

    useEffect(() => {
        if (currentType == "all") {
            setDataRender(data && data.filter(item => item.name.toUpperCase().includes(searchString.toUpperCase())))
            return
        }

        let filteredData = data.filter(item => item.type.includes(currentType))

        if (searchString && searchString.trim()) {
            filteredData = filteredData.filter(item => item.name.toUpperCase().includes(searchString.toUpperCase()))
        }

        setDataRender(filteredData)
    }, [currentType])

    const onSearchFile = e => {
        setSearchString(e.target.value)

        if (!e.target.value || !e.target.value.trim()) {
            if (currentType !== "all") {
                setDataRender(data && data.filter(item => item.type.includes(currentType)))
            } else {
                setDataRender(data || [])
            }
            return
        }

        let filteredData = data.filter(item => item.name.toUpperCase().includes(e.target.value.toUpperCase()))

        if (currentType !== "all") {
            filteredData = filteredData.filter(item => item.type.includes(currentType))
        }

        setDataRender(filteredData)
    }

    const onSearchFolder = e => {
        if (!e.target.value || !e.target.value.trim()) {
            setDataRender(data)
            return
        }

        const filteredData = data.filter(item => item.name.toUpperCase().includes(e.target.value.toUpperCase()))
        setDataRender(filteredData)
    }

    const onDownload = async (e, id) => {
        e.stopPropagation()
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
    }

    const onDelete = (e, id) => {
        e.stopPropagation()
        setModal({
            isOpen: true,
            type: "danger",
            message: `Are you sure want to delete this ${isFiles ? "file" : "folder"} ?`,
            onConfirm: () => deleteData(id)
        })
    }

    const onRollback = (e, id) => {
        e.stopPropagation()
        setModal({
            isOpen: true,
            type: "danger",
            message: `Are you sure want to rollback this ${isFiles ? "file" : "folder"} ?`,
            onConfirm: () => rollbackData(id)
        })
    }

    const onForward = async item => {
        if (!isFiles) {
            history.push(`/folder/${item._id}`)
            return
        }

        if (item.type && (item.type.includes("image") || item.type.includes("video") || item.type.includes("audio"))) {
            try {
                toggle()
                const res = await getFileInfo(item._id)
                setViewingFile({
                    ...item,
                    currentUrl: res.data.url
                })
            } catch {
                noti({
                    type: "danger",
                    title: "Failed",
                    message: "Fail in viewing file"
                })
                toggle()
            }
        }
    }

    return <div className="mb-2">
        <FileView isOpen={isOpen} toggle={toggle} viewingFile={viewingFile} setViewingFile={setViewingFile} />
        <h5>{type}</h5>
        {isFiles && <FileTypeFilter currentType={currentType} setCurrentType={setCurrentType} />}
        {data && data.length > 0 && <Row className="mb-3">
            <Col md={4} className="mb-2">
                <Input placeholder="Search" onChange={e => (isFiles ? onSearchFile : onSearchFolder)(e)} />
            </Col>
            <Col md={8} />
        </Row>}
        {dataRender && dataRender.length > 0 ? <Row>
            {dataRender.map((item, index) => <Col className="mb-3" key={index} md={3} sm={6}>
                <FolderContainer color="#eee" onClick={() => onForward(item)}>
                    {isFiles && <FileType type={item.type} />}
                    <span style={{ overflow: "hidden" }}>{item.name}</span>
                    <div className="mt-2">
                        {!isDeleted ? <>
                            {isFiles && <HoverOpacity><i className="fas fa-download mr-3" title="Download" onClick={e => onDownload(e, item._id)} /></HoverOpacity>}
                            <HoverOpacity><i className="fas fa-trash" title="Delete" onClick={e => onDelete(e, item._id)} /></HoverOpacity>
                        </> : <HoverOpacity><i className="fas fa-trash-restore" title="Roll back" onClick={e => onRollback(e, item._id)} /></HoverOpacity>}
                    </div>
                </FolderContainer>
            </Col>)}
        </Row> : <Row>
                <Col md={6}>
                    <Alert color="primary">No {type.toLowerCase()} to display</Alert>
                </Col>
            </Row>}
    </div>
}