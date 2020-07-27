import React, { useState, useEffect } from "react"
import { Row, Col, Input, Alert } from "reactstrap"
import styled from "styled-components"

import { getFileInfo } from "../utils/api"
import noti from "../utils/noti"

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

export default ({ type, data, isDeleted }) => {
    const isFiles = type === "Files"

    const [dataRender, setDataRender] = useState(data)

    useEffect(() => {
        setDataRender(data)
    }, [data])

    const typeColor = type => {
        if (!isFiles) return "#eee"

        switch (type) {
            case "image":
                return "dodgerblue"
            case "video":
                return "tomato"
            default:
                return "grey"
        }
    }

    const onSearch = e => {
        if (!e.target.value || !e.target.value.trim()) {
            setDataRender(data)
            return
        }

        const filteredData = dataRender.filter(item => item.name.toUpperCase().includes(e.target.value.toUpperCase()))
        setDataRender(filteredData)
    }

    const onDownload = async id => {
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

    return <div className="px-3 mb-2">
        <h5>{type}</h5>
        {data && data.length > 0 && <Row className="mb-3">
            <Col md={4} className="mb-2">
                <Input placeholder="Search" onChange={e => onSearch(e)} />
            </Col>
            <Col md={8} />
        </Row>}
        {dataRender && dataRender.length > 0 ? <Row>
            {[...dataRender, ...dataRender, ...dataRender, ...dataRender, ...dataRender].map((item, index) => <Col className="mb-3" key={index} md={3} sm={6}>
                <FolderContainer color={typeColor(item.type)}>
                    <span style={{ overflow: "hidden" }}>{item.name}</span>
                    <div className="mt-2">
                        {!isDeleted ? <>
                            {isFiles && <HoverOpacity><i className="fas fa-download mr-2" title="Download" onClick={() => onDownload(item._id)} /></HoverOpacity>}
                            <HoverOpacity><i className="fas fa-trash" title="Delete" /></HoverOpacity>
                        </> : <HoverOpacity><i className="fas fa-trash-restore" title="Restore" /></HoverOpacity>}
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