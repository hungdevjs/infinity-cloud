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
app.use("/api/file", auth, fileRoute)

const fs = require("fs")
// const axios = require("axios")
const { sendFile } = require("./utils/api")
const FormData = require('form-data');
const formData = new FormData()

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const axios = require("axios")

app.post("/api/test", upload.array('files', 10), async (req, res) => {
    formData.append("file", fs.createReadStream(req.files[0].path))
    console.log(formData)
    try {
        // const data = await axios.post("https://api.icq.net/bot/v1/messages/sendFile?token=001.0498146150.1889524267:754575509&chatId=hungdevjs", formData)
        const data = await sendFile(formData)
        console.log(data)
    } catch(err) {
        console.log(err.mesasge)
    }

    res.send("ok")
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
