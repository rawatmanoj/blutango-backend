const express = require("express");
const adminSchema = require('../apiSchema/adminSchema');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const AdminController = require("../controllers/admin");
const adminRoute = express.Router();
const { upload } = require('../middleware/multerParser');
const AdminControllerObject = AdminController.AdminAuthController;

// admin routes
adminRoute.post("/addSubAdmin", joiSchemaValidation.validateBody(adminSchema.addNewAdmin), AdminControllerObject.addNewAdmin);
adminRoute.put("/editSubAdmin", AdminControllerObject.editAdmin);
adminRoute.post("/login", joiSchemaValidation.validateBody(adminSchema.login), AdminControllerObject.login);
adminRoute.post("/forgotPassword", joiSchemaValidation.validateBody(adminSchema.forgotPassword), AdminControllerObject.forgotPassword);
adminRoute.post("/resetPassword", joiSchemaValidation.validateBody(adminSchema.resetPassword), AdminControllerObject.resetPassword);

// upload route
adminRoute.post("/uploadFile", upload.single('file'), AdminControllerObject.uploadFile);

//dashboard routes
adminRoute.get("/dashboardAnalytics", joiSchemaValidation.validateBody(adminSchema.dashboardAnalytics), AdminControllerObject.dashboardAnalytics);

module.exports = adminRoute;