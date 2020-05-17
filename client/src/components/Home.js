import React, { useState, useContext } from "react"
import { Form, Button, Input } from "reactstrap"

import Option from "./Option"
import { UserContext } from "../contexts/user.context"

export default (props) => {
    const [username, setUsername] = useState("")
    const [signed, setSign] = useState(false)

    const userContext = useContext(UserContext)

    return (
        <>
            <h5 className="mb-3 text-center">RELAX SPACE</h5>
            <div className="mb-2 d-flex" style={{ minWidth: "300px" }}>
                {!signed && (
                    <Form
                        className="flex-grow-1 d-flex"
                        onSubmit={(e) => {
                            e.preventDefault()
                            if (username.trim()) {
                                userContext.setUsername(username)
                                setSign(true)
                            }
                        }}
                    >
                        <Input
                            className="mr-2"
                            placeholder="Your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                        <Button color="primary" type="submit">
                            Set
                        </Button>
                    </Form>
                )}
                {signed && (
                    <>
                        <Option option="Chat" />
                        <Option option="Game" />
                    </>
                )}
            </div>
        </>
    )
}
