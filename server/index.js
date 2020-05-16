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

io.on("connection", (socket) => {
    console.log(socket.id + ": connected")
    socket.emit("id", { id: socket.id })

    socket.on("disconnect", () => {
        console.log(socket.id + ": disconnected")
    })
})

app.get("/", (req, res) => {
    res.send("Home page. Server running okay.")
})
