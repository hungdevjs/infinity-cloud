const jwt = require("jsonwebtoken")
const passwordHash = require("password-hash")

const User = require("../models/user.model")
const { errorFormat, successFormat } = require("../utils/format")

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ isDeleted: false, email })

        if (!user) {
            throw new Error("User doesn't exist")
        }

        if (!passwordHash.verify(password, user.password)) {
            throw new Error("Wrong email or password")
        }

        const accessToken = jwt.sign(
            { email, _id: user._id },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: process.env.JWT_ACCESS_TOKEN_LIFE }
        )

        res.json(successFormat({ accessToken }))
    } catch (err) {
        res.json(errorFormat(err.message))
    }
}

module.exports.getInfo = async (req, res) => {
    try {
        const token = req.headers.authorization
            ? req.headers.authorization.split(" ")[1]
            : ""

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        const userInfo = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET_KEY)

        res.json(successFormat(userInfo))
    } catch (err) {
        res.json(errorFormat(err.message))
    }
}