function errorHandler(err, req, res, next) {

    console.log(err, "errorHandler");
    
    
    let statusCode = err.status || 500
    let errorMessage = err.message || "Internal server error"
    res.status(statusCode).json({errorMessage: errorMessage})
}

module.exports = errorHandler