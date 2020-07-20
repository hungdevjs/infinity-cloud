const mongoose = require("mongoose")
const passwordHash = require("password-hash")

const User = require("./models/user.model")

const uri = "mongodb+srv://hungdevjs:Asdfgh1@3@cluster0.i0wyh.gcp.mongodb.net/infinitycloud?retryWrites=true&w=majority"

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

createUser({
    email: "hungdev.js@gmail.com",
    password: passwordHash.generate("Asdfgh1@3"),
    isDeleted: false
})