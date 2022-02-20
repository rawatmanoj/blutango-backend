const constants = require('../constants');

exports.successResponse = (res, params, message) => {
    let response = { ...constants.defaultServerResponse };
    response.success = true;
    response.body = { data: params };
    response.message = message;
    response.status = 200;
    return res.status(response.status).send(response);
}

exports.errorResponse = (res, error, errorCode, message = constants.MESSAGES.bad_request) => {
    let response = { ...constants.defaultServerResponse };
    if (typeof error.message === "string") {
        response.message = error.message;
    }
    response.success = false;
    response.status = errorCode;
    response.body = { data: error };
    return res.status(response.status).send(response);
};