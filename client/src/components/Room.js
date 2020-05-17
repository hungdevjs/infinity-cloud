import React, { useState, useEffect, useRef, useContext } from "react"

import io from "socket.io-client"

import { UserContext } from "../contexts/user.context"
import history from "../configs/history"
import { serverURL } from "../configs/constant"
import Messages from "./Messages"

let socket = io(serverURL)
socket.on("id", (res) => localStorage.setItem("socketId", res.id))

export default (props) => {
    const userContext = useContext(UserContext)
    const { username } = userContext

    const isChat = history.location.pathname.split("/")[1] === "chat"

    const roomName = props.match.params.roomName

    const [people, setPeople] = useState([])
    const [messages, setMessages] = useState([])

    const refMessage = useRef([])

    useEffect(() => {
        if (!username || !username.trim()) {
            history.push("/")
            return
        }

        if (!localStorage.getItem("socketId")) {
            socket = io(serverURL)
            socket.on("id", (res) => localStorage.setItem("socketId", res.id))
        }

        socket.emit("join", { username, roomName })

        socket.on("join", (res) => {
            setPeople(res.people)
        })

        socket.on("newMessage", (res) => {
            const newId =
                refMessage.current.length > 0
                    ? refMessage.current[refMessage.current.length - 1].id + 1
                    : 1

            refMessage.current = [
                ...refMessage.current,
                {
                    id: newId,
                    ...res,
                },
            ]

            setMessages(refMessage.current)
        })

        return () => {
            socket.disconnect()
            localStorage.removeItem("socketId")
            history.push("/")
        }
    }, [])

    const onSend = (message) =>
        socket.emit("newMessage", { message, username, roomName })

    const ChatRoom = () => (
        <div style={{ width: "70vw", minWidth: "300px" }}>
            <p>
                Username: {username} | Room name: {roomName} | SocketID:{" "}
                {localStorage.getItem("socketId")}
            </p>

            <Messages
                messages={messages}
                people={people}
                username={username}
                roomName={roomName}
                onSend={onSend}
            />
        </div>
    )

    const GameRoom = () => <p>Coming soon...</p>

    return isChat ? <ChatRoom /> : <GameRoom />
}
