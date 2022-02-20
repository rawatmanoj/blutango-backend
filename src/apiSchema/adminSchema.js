const Joi = require('joi')
const constants = require('../constants');
exports.addNewAdmin = Joi.object({
    email: Joi.string().regex(/^(?:^[0-9]{4,15}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i).required(),
    password: Joi.string().min(8)
        .max(15)
        .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))
        .required()
        .messages({
            "string.min": constants.CUSTOM_JOI_MESSAGE.password_msg.min,
            "string.max": constants.CUSTOM_JOI_MESSAGE.password_msg.max,
            "string.base": constants.CUSTOM_JOI_MESSAGE.password_msg.base,
            "string.empty": constants.CUSTOM_JOI_MESSAGE.password_msg.required,
            "any.required": constants.CUSTOM_JOI_MESSAGE.password_msg.required,
            "string.pattern.base": constants.CUSTOM_JOI_MESSAGE.password_msg.pattern
        }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({ 'any.only': constants.CUSTOM_JOI_MESSAGE.password_msg.confirmPassword }),
    //passkey: Joi.string().required(),
    name: Joi.string().required(),
    phone_number: Joi.string().required(),
    country_code: Joi.string().required(),
    permissions: Joi.string().optional()
});


exports.login = Joi.object({
    email: Joi.string().regex(/^(?:^[0-9]{4,15}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i).required(),
    password: Joi.string().required()
        .messages({
            "any.required": constants.CUSTOM_JOI_MESSAGE.password_msg.required,
        })
});

exports.forgotPassword = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required()
});

exports.resetPassword = Joi.object({
    password: Joi.string().required()
        .messages({
            "any.required": constants.CUSTOM_JOI_MESSAGE.password_msg.required,
        })
});

exports.dashboardAnalytics = Joi.object({
    from: Joi.string().required(),
    to: Joi.string().required()
});
