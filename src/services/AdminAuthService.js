const AdminModel = require('../models/admin');
const constants = require('../constants');
const helperFunction = require('../utils/helperFunction');
const crypto = require('crypto');

async function addNewAdmin(params) {
    const { email, name, password, country_code, phone_number, permissions } = params;
    //  const admin = await AdminModel.find({ $or: [{ 'email': email, 'phone_number': phone_number }] });
    const isAdmin = await AdminModel.find({ $or: [{ email }, { phone_number }] })

    if (isAdmin && isAdmin?.length !== 0) {
        throw new Error(constants.MESSAGES.acc_already_exists);
    }
    const admin = await AdminModel.create({
        name,
        email,
        password,
        country_code,
        phone_number,
        permissions
    });
    admin.password = null;
    return admin;
}

async function editAdmin(params) {
    let updateTheseFields = {
        name: params.name,
        country_code: params.country_code,
        phone_number: params.phone_number,
        permissions: params.permissions,
        status: params.status

    }
    console.log(updateTheseFields, "hiii")
    const admin = await AdminModel.findByIdAndUpdate(params.id, updateTheseFields, { new: true });
}



async function login(params) {
    const { email, password } = params;
    const admin = await AdminModel.findOne({ email }).select('+password');

    if (!admin) {
        throw new Error(constants.MESSAGES.subAdmin_not_found);
    }
    const isValidPassword = await admin.isValidatedPassword(password);

    if (!isValidPassword) {
        throw new Error(constants.MESSAGES.invalid_password)
    }

    const token = await admin.getJwtToken();
    admin.token = token;
    admin.password = null;
    //console.log(token);

    return admin;
}

async function uploadFile(params, folderName) {
    return await helperFunction.uploadFile(params, folderName);
}

async function dashboardAnalytics(params) {
    console.log(params, "hi")
}


// forgot password
async function forgotPassword(params) {
    const { email } = params;

    const admin = await AdminModel.findOne({ email }).select('+password');
    if (!admin) {
        throw new Error(constants.MESSAGES.user_not_found);
    }

    const forgotPassToken = await admin.getForgotPasswordToken();

    //save in db but without validation (currently no need as we are using one time jwt)
    const isSaved = await admin.save({ validateBeforeSave: false });
    if (!isSaved) {
        throw new Error(constants.MESSAGES.can_not_saved);
    }

    console.log(forgotPassToken);

    // make email body
    const msg = {
        toMail: email,
        fromMail: "",
        subject: 'Reset Password Request',
        text: 'and easy to do anywhere, even with Node.js',
        html: `Hi ${admin.name}
        <br> Click on the link below to reset your password
        <br> ${process.env.ADMIN_RESET_PASS_URL}?token=${forgotPassToken}
        <br> Please Note: For security purposes, this link expires in ${process.env.FORGOT_PASSWORD_LINK_EXPIRE_IN_MINUTES} Hours.
        `,
        name: "BlueTango"
    }

    // send email
    helperFunction.sendEmail(msg);
}

async function resetPassword(req) {
    //get token from params
    const token = req.headers.authorization.replace("Bearer ", "");

    // hash the token as db also stores the hashed version
    const encryToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log(token, '---', encryToken)
}

module.exports = {
    addNewAdmin,
    uploadFile,
    login,
    editAdmin,
    dashboardAnalytics,
    forgotPassword,
    resetPassword
}