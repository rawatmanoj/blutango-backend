const multer = require('multer');
const fs = require('fs');
const path = require('path');

let folderUploadPath = `../../src/upload`;
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // callback(null, '../upload')
        const dir = path.join(__dirname, folderUploadPath);
        fs.mkdir(dir, err => callback(null, dir))
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }
});

// delete file in the src/upload folder
exports.deleteFile = function (fileName) {
    let filePath = path.join(__dirname, folderUploadPath, fileName);
    return fs.unlinkSync(filePath);
}


exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: process.env.UPLOAD_FILE_SIZE_IN_MB,
    }
})