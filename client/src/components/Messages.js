import React, { useState, useRef, useEffect } from "react"
import { Row, Col, Input, Button, Form, FormGroup } from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"

import PeopleInRoom from "./PeopleInRoom"

export default ({ messages, onSend, username, people }) => {
    const [message, setMessage] = useState("")

    const messBlock = useRef(null)

    useEffect(() => {
        if (messBlock) {
            messBlock.current.scrollTop = messBlock.current.scrollHeight
        }
    }, [])

    return (
        <>
            <Row className="mb-3">
                <Col md={3}>
                    <PeopleInRoom people={people} />
                </Col>
                <Col md={9}>
                    <div
                        className="mb-2 p-2"
                        ref={messBlock}
                        style={{
                            height: "70vh",
                            border: "1px solid #bbb",
                            borderRadius: "4px",
                            overflowY: "scroll",
                        }}
                    >
                        {/* <PerfectScrollbar> */}
                        {messages.map((item) => (
                            <div key={item.id}>
                                <p
                                    style={{ fontSize: "0.6rem" }}
                                    className={`mb-1 text-secondary ${
                                        item.username === username
                                            ? "text-right"
                                            : ""
                                    }`}
                                >
                                    {item.username}
                                </p>
                                <div
                                    className={`d-flex ${
                                        item.username === username
                                            ? "justify-content-end"
                                            : ""
                                    }`}
                                >
                                    <div
                                        className={`px-2 py-1 mb-2 text-white ${
                                            item.username === username
                                                ? "bg-primary"
                                                : item.username === "admin"
                                                ? "bg-secondary"
                                                : "bg-danger"
                                        }`}
                                        style={{ borderRadius: "4px" }}
                                    >
                                        <span>{item.content}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* </PerfectScrollbar> */}
                    </div>
                </Col>
            </Row>

            <Form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (message.trim()) {
                        onSend(message)
                        setMessage("")
                    }
                }}
            >
                <FormGroup>
                    <div className="d-flex align-items-start">
                        <Input
                            className="mr-2"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            autoFocus
                        />
                        <Button color="primary">Send</Button>
                    </div>
                </FormGroup>
            </Form>
        </>
    )
}
