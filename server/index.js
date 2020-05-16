const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const cors = require("cors")

require("dotenv").config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

var server = http.Server(app, { wsEngine: "ws" })
var io = socketio(server)

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`Server is running on port ${port}`))

let users = []

io.on("connection", (socket) => {
    console.log(socket.id + ": connected")
    socket.emit("id", { id: socket.id })

    socket.on("disconnect", () => {
        console.log(socket.id + ": disconnected")

        const user = users.find((user) => user.id === socket.id)
        users = users.filter((user) => user.id !== socket.id)

        if (user) {
            const { username, roomName } = user

            socket.broadcast.to(roomName).emit("newMessage", {
                username: "admin",
                content: `${username} has left!`,
            })

            io.to(roomName).emit("join", { people: users })
        }
    })

    socket.on("newMessage", ({ username, message, roomName }) => {
        if (
            !username ||
            !username.trim() ||
            !message ||
            !message.trim() ||
            !roomName ||
            !roomName.trim()
        ) {
            return
        }

        io.to(roomName).emit("newMessage", {
            username,
            content: message,
        })
    })

    socket.on("join", ({ username, roomName }) => {
        if (!username || !username.trim() || !roomName || !roomName.trim()) {
            return
        }

        users = [...users, { id: socket.id, username, roomName }]
        socket.join(roomName)

        socket.emit("newMessage", {
            username: "admin",
            content: `${username}, welcome to room ${roomName}.`,
        })

        socket.broadcast.to(roomName).emit("newMessage", {
            username: "admin",
            content: `${username} has joined!`,
        })

        const people = users.filter((user) => user.roomName === roomName)

        io.to(roomName).emit("join", { people })
    })
})

app.get("/", (req, res) => {
    res.send("Home page. Server running okay.")
})
