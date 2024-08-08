const ErrorResponse = require("../utils/errorResponse");

function errorHandler(err, req, res, next) {
    let error = { ...err }
    error.message = err.message;

    console.log(JSON.parse(JSON.stringify(err)));

    //Mongoose bad object ID
    if (err.name === 'CastError') {
        const message = `Bootcamp with id of ${err.value} not found`;
        error = new ErrorResponse(message, 404);
    }

    //Mongoose duplicate objects
    if (err.code === 11000) {
        const message = `This object is already existing in the database`;
        error = new ErrorResponse(message, 400);
    }

    //Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(error => error.message);
        error = new ErrorResponse(messages, 400);
    }

    res.status(error.code || 500).json({
        success: false,
        error: error.message || 'Server error'
    });
}

module.exports = errorHandler;