const mongoose = require("mongoose")
const passwordHash = require("password-hash")

const User = require("./models/user.model")
const File = require("./models/file.model")

const uri = "mongodb+srv://hungdevjs:Asdfgh1@3@cluster0.i0wyh.gcp.mongodb.net/infinitycloudtest1?retryWrites=true&w=majority"

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

async function createUser(user) {
    console.log("Creating user")

    const newUser = new User(user)

    await newUser.save()

    console.log(`Created user ${user.email}`)
}

// createUser({
//     email: "hungdev.js@gmail.com",
//     password: passwordHash.generate("Asdfgh1@3"),
//     folders: [{ name: "TEST FOLDER" }],
//     isDeleted: false
// })

createUser({
    email: "admin",
    password: passwordHash.generate("admin"),
    folders: [],
    isDeleted: false
})

async function createFile(file) {
    console.log(`Creating file ${file.name}`)
    const newFile = new File(file)

    await newFile.save()

    console.log(`Created ${file.name}`)
}

// createFile({
//     name: "45245973_1688590054579788_5933342872400035840_o.jpg",
//     type: "image",
//     url: "https://ub.icq.net/files/get/0gxgx000hvklGbnPxPStf9hNsGf9hObhIGh6fMOBgPwFLZsLoc1MxuGOE9g5qQKMgUjUkTKVnWQlgiEUTkxzxZRqgBL7UsgqZscFKIiZUlspotKEs0KstsgyKUqZxlox17hVVRhvhGlXaxh1JzPIKT9MdBhiGtf9h/45245973_1688590054579788_5933342872400035840_o.jpg",
//     userId: "5f1b0bcfbb537206cc017253"
// })