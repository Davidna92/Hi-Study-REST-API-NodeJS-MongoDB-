class ErrorResponse extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
    toJSON() {
        return {
            success: false,
            error: this.message
        }
    }
}

module.exports = ErrorResponse;