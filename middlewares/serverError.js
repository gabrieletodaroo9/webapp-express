const serverError = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500)
        .json(
            { err: err.message }
        )
}

module.exports = serverError