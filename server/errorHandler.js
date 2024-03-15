module.exports = function errorHandler(error,req,res,next) {
    let status = error.status || 500
    let message = error.message || 'Internal server error'
    // console.log(error);

    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400
            message = error.errors[0].message
            break;
        case "JsonWebTokenError":
        case "InvalidToken":
            status = 401
            message = "you are not authorized"
            break;
        case "NotFound":
            status = 404
            message = "Lodging not found"
            break;
        case "Forbidden":
            status = 403
            message = "you are not authorized"
            break;

        default:
            break;
    }

    res.status(status).json({
        message
    })
}