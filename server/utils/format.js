module.exports.errorFormat = message => ({ status: false, error: message })

module.exports.successFormat = data => ({ status: true, ...data })