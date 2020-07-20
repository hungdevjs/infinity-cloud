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
            { email, password },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: process.env.JWT_ACCESS_TOKEN_LIFE }
        )

        res.json(successFormat({ accessToken }))
    } catch (err) {
        res.json(errorFormat(err.message))
    }
}