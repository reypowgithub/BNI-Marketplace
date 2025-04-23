function handlingMiddleware(req, res, next) {
    const diasudah = false
    if (diasudah) {
        next()
    } else {
        res.send("anda belum login")
    }
}

module.exports = handlingMiddleware;