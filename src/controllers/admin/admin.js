const constants = require('../../constants');
const adminAuthService = require('../../services/AdminAuthService');
const BigPromise = require('../../middleware/bigPromise');
const appUtils = require('../../utils/appUtils');
const { deleteFile } = require('../../middleware/multerParser');


// add new subadmin
const addNewAdmin = (async (req, res, next) => {

    try {
        const responseFromService = await adminAuthService.addNewAdmin(req.body);
        const msg = constants.MESSAGES.login_success;
        appUtils.successResponse(res, responseFromService, msg);

    } catch (error) {
        appUtils.errorResponse(res, error, constants.code.error_code);
    }
})


// edit a subadmin
const editAdmin = (async (req, res, next) => {

    try {
        const responseFromService = await adminAuthService.editAdmin(req.body);
        const msg = constants.MESSAGES.login_success;
        appUtils.successResponse(res, responseFromService, msg);

    } catch (error) {
        appUtils.errorResponse(res, error, constants.code.error_code);
    }
})


// uplaod a file
const uploadFile = (async (req, res, next) => {
    try {
        const responseFromService = await adminAuthService.uploadFile(req.file, req.body.folderName);
        deleteFile(req.file.filename);
        const msg = constants.MESSAGES.success;
        appUtils.successResponse(res, responseFromService, msg);
    } catch (error) {
        appUtils.errorResponse(res, error, constants.code.error_code);
    }
})


// login admin
const login = (async (req, res, next) => {
    try {
        const responseFromService = await adminAuthService.login(req.body);
        const msg = constants.MESSAGES.login_success;
        appUtils.successResponse(res, responseFromService, msg);
    } catch (error) {
        appUtils.errorResponse(res, error, constants.code.error_code);
    }
})


// dashboard analytics
const dashboardAnalytics = (async (req, res, next) => {
    try {
        const responseFromService = await adminAuthService.dashboardAnalytics(req.query);
        const msg = constants.MESSAGES.success;
        appUtils.successResponse(res, responseFromService, msg);
    } catch (error) {
        appUtils.errorResponse(res, error, constants.code.error_code);
    }
})

// forgot password
const forgotPassword = (async (req, res, next) => {
    try {
        const responseFromService = await adminAuthService.forgotPassword(req.body);
        const msg = constants.MESSAGES.forget_pass_otp;
        appUtils.successResponse(res, responseFromService, msg);
    } catch (error) {
        appUtils.errorResponse(res, error, constants.code.error_code);
    }
})

// reset password
const resetPassword = (async (req, res, next) => {
    try {
        const responseFromService = await adminAuthService.resetPassword(req);
        const msg = constants.MESSAGES.forget_pass_otp;
        appUtils.successResponse(res, responseFromService, msg);
    } catch (error) {
        appUtils.errorResponse(res, error, constants.code.error_code);
    }
})

module.exports = {
    addNewAdmin,
    uploadFile,
    login,
    editAdmin,
    dashboardAnalytics,
    forgotPassword,
    resetPassword
}
