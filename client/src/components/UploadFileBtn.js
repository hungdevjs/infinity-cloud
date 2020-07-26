import React from "react"
import { connect } from "react-redux"
import { Row, Col, Button } from "reactstrap"

const UploadFileBtn = props => {

    return <Row className="mb-2">
        <Col md={12} className="ml-3">
            {props.user} <Button color="primary">Upload files</Button>
        </Col>
    </Row>
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFileBtn)