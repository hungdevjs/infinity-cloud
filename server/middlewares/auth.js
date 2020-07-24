const jwt = require("jsonwebtoken")

const { errorFormat } = require("../utils/format")

module.exports = (req, res, next) => {
    const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : ""

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        const user = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET_KEY)

        req.user = user

        next()
    } catch (err) {
        res.json(errorFormat("Unauthorized"))
    }
}