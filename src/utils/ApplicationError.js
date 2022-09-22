class ApplicationError extends Error {
  /**
   * Custom error handler for all errors
   * @param {Object} param0.error The error object of axios or a custom error object.
   * @param {String} param0.status When passed, this statuscode overrides the statuscode of the error object.
   * @param {String} param0.message When passed, this message overrides the message of the error object.
   */
  constructor({ error, status, message, type, body = null }) {
    const messageText = message || error.message || "Something went wrong. Please try again later.";
    //  message || error.message || 'Something went wrong. Please try again later.';

    super(messageText);
    this.name = this.constructor.name;
    this.message = messageText;
    this.data = error.data || body || { messageText, type };
    this.status = status || error.statusCode || 500;

    this.headers = { ...(error.headers || {}) };
    this.headers["Content-Type"] = this.headers["Content-Type"] || "application/json";

    if (!error) Error.captureStackTrace(this, this.constructor);
  }
}

export default ApplicationError;
