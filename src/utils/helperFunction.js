const AWS = require('aws-sdk');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// new s3 client
const s3Client = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const uploadParams = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: '', // pass key
    Body: null, // pass file body
    ContentType: null
};


exports.uploadFile = async (params, folderName) => {
    return new Promise((resolve, reject) => {
        const buffer = fs.createReadStream(params.path);
        //assigining parameters to send the value in s3 bucket
        console.log(folderName);

        uploadParams.Key = folderName + '/' + `${Date.now()}_ ${params.originalname}`;
        uploadParams.Body = buffer;
        uploadParams.ContentType = params.mimetype;
        var s3upload = s3Client.upload(uploadParams).promise();
        s3upload.then(function (data) {
            resolve(data.Location);
        })
            .catch(function (err) {
                reject(err);
            });
    });
    // return true;   
}

exports.sendEmail = async (params) => {
    try {
        let msg = {
            to: params.toMail,
            from: {
                email: process.env.SENDGRID_FROM_EMAIL,
                name: params.name || 'BluXinga'
            },
            subject: params.subject,
            html: params.html,
        };
        await sgMail.send(msg);
    } catch (error) {
        if (error.response) {
            console.error(error.response.body)
        }
        throw new Error(error);
    }
}

