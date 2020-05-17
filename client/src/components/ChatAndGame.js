import React, { useState, useContext, useEffect } from "react"
import { Button, Input, Form } from "reactstrap"

import history from "../configs/history"
import { UserContext } from "../contexts/user.context"

export default (props) => {
    const userContext = useContext(UserContext)

    const { username } = userContext

    useEffect(() => {
        if (!username || !username.trim()) {
            history.push("/")
        }
    }, [])

    const {
        location: { pathname },
    } = history

    const option = pathname.substring(1)

    const iconCode = option === "chat" ? "fas fa-comment-alt" : "fas fa-gamepad"

    const [roomName, setRoomName] = useState("")

    return (
        <>
            <h5 className="mb-3 text-center">
                <i className={`text-danger mr-2 ${iconCode}`} />
                {option.toUpperCase()}
            </h5>

            <Form
                className="w-100 mb-2 d-flex"
                onSubmit={(e) => {
                    e.preventDefault()
                    if (roomName.trim()) {
                        history.push(`/${option}/${roomName}`)
                    }
                }}
            >
                <Input
                    className="mr-2"
                    placeholder="Room name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value.trim())}
                    autoFocus
                />
                <Button color="primary">Join</Button>
            </Form>
        </>
    )
}
