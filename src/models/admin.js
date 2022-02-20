const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Schema } = mongoose;

const adminSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [40, 'Name should be under 40 chars']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide an email'],
        //validate:[] // can be used with a validator to verify if its a email
    },
    admin_role: {
        type: String,
        default: 2 //'1=>super_admin/2=>sub_admin'
    },
    reset_pass_token: String,
    country_code: {
        type: String,
        default: null
    },
    phone_number: {
        type: String,
        required: [true, 'Please provide a phone number'],
        unique: true,
        default: null
    },
    thought_of_the_day: {
        type: String,
        default: null
    },
    profile_pic_url: {
        type: String,
        default: null
    },
    reset_pass_expiry: {
        type: Date,
        default: null
    },
    status: {//applicable for all type of users
        type: Number,
        default: 1,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false,// by this it will ot give back password when quering for a admin
        // minlength:[8,'password should be atleast 8 chars'] not required as using joi validation in middleware
    },
    token: {
        type: String,
    },
    permissions: {
        type: Array,
        default: []
    },
    social_media_handles: {
        type: Object,
    },

    role_id: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

//encrypt password before save

adminSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);

});

adminSchema.methods.isValidatedPassword = async function (userInputPassword) {

    return await bcrypt.compare(userInputPassword, this.password);

}

adminSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.ADMIN_JWT_SECRET, {
        expiresIn: process.env.ADMIN_JWT_EXPIRY
    })
}

adminSchema.methods.getJwtForgotPasswordToken = function () {
    return jwt.sign({ id: this._id }, this.password, {
        expiresIn: process.env.FORGOT_PASSWORD_LINK_EXPIRE_IN_MINUTES
    })
}

adminSchema.methods.getForgotPasswordToken = function () {
    const forgotToken = crypto.randomBytes(20).toString("hex");
    this.reset_pass_token = crypto.createHash("sha256").update(forgotToken).digest("hex");
    //this.reset_pass_expiry = Date.now() + process.env.ADMIN_FORGOT_PASS_EXPIRY;
    this.reset_pass_expiry = Date.now() + 20 * 60 * 60 * 1000
    return forgotToken;
}

module.exports = mongoose.model('admin', adminSchema)

