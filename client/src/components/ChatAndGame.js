import React, { useState } from "react"
import {
    Button,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"

import history from "../configs/history"

export default (props) => {
    const {
        location: { pathname },
    } = history

    const option = pathname.substring(1)

    const [header, setHeader] = useState("")

    const [isOpen, setOpen] = useState(false)

    const toggle = () => setOpen(!isOpen)

    const renderModal = () => (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader toggle={toggle}>{`${header} ${option}`}</ModalHeader>
            <ModalBody>
                <Label>{option.toUpperCase()} ID</Label>
                <Input placeholder={`${option.toUpperCase()} ID`} />
            </ModalBody>
            <ModalFooter>
                <Button color="primary">Confirm</Button>
            </ModalFooter>
        </Modal>
    )

    return (
        <>
            {renderModal()}
            <h5 className="mb-3">
                <i className="fas fa-comment-alt text-danger mr-2" />
                {option.toUpperCase()}
            </h5>
            <Button
                color="primary"
                className="mr-2"
                onClick={() => {
                    setHeader("Join")
                    setOpen(true)
                }}
            >
                Join {option}
            </Button>
            <Button
                color="success"
                onClick={() => {
                    setHeader("Create")
                    setOpen(true)
                }}
            >
                Create {option}
            </Button>
        </>
    )
}
