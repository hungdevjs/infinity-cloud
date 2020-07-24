const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const morgan = require("morgan")

const auth = require("./middlewares/auth")

require("dotenv").config()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan("tiny"))

const PORT = process.env.PORT || 8888

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const connection = mongoose.connection
connection.once("open", () =>
    console.log("MongoDB database connected successfully!")
)

const accountRoute = require("./routes/account.route")
app.use("/account", accountRoute)

const fileRoute = require("./routes/file.route")
app.use("/file", auth, fileRoute)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
