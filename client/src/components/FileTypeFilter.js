import React from "react"
import {Row, Col} from "reactstrap"

import FileType from "./FileType"

const types = ["all", "image", "video", "text", "audio", "application"]

export default ({ currentType, setCurrentType }) => {

    return <Row className="my-2">
        <Col md={4} className="d-flex justify-content-between">
            {types.map((item, index) => <FileType 
                key={index} 
                label
                type={item} 
                opacity 
                currentType={currentType} 
                onClick={() => setCurrentType(item)}
            />)}
        </Col>
    </Row>
}