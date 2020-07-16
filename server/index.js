const express = require("express")
const cors = require("cors")

require("dotenv").config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.get("/", (req, res) => {
    res.send("Home page. Server running okay.")
})

app.listen(3000, () => console.log("server is running on port 3000"))
