module.exports.errorFormat = message => ({ status: false, error: message })

module.exports.successFormat = data => ({ status: true, ...data })

module.exports.dateFormat = "DD-MM-YYYY"

module.exports.dateTimeFormat = "DD-MM-YYYY HH:mm:ss"