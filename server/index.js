const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const morgan = require("morgan")
const formData = require('express-form-data');

const auth = require("./middlewares/auth")

require("dotenv").config()

const app = express()

app.use(cors())
app.use(formData.parse());

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
app.use("/api/file", auth, fileRoute)

const fs = require("fs")
const { sendFile } = require("./utils/api")
const FormData = require('form-data');
app.post("/api/test", async (req, res) => {
    console.log(req.files)
    const formData = new FormData()
    formData.append("file", fs.createReadStream(req.files.files[0].path))

    const data = await sendFile(formData)
    console.log(data)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
