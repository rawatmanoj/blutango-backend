const constants = require('../constants');
const appUtils = require('../utils/appUtils');
const validateObjectSchema = (data, schema) => {
    const result = schema.validate(data);
    if (result.error) {
        const errorDetails = result.error.details.map(value => {
            return {
                message: value.message,
                path: value.path
            };
        });
        return errorDetails;
        // console.error(result.error)
    }
    return null;
}

exports.validateBody = (schema) => {
    return (req, res, next) => {
        let dataToBeValidated = req.method === "GET" ? req.query : req.body;
        const error = validateObjectSchema(dataToBeValidated, schema);
        if (error) {
            console.log(error, "errrrrror")
            return appUtils.errorResponse(res, error, constants.code.error_code, error[0].message.split('"').join(""))
        }
        return next();
    }
}