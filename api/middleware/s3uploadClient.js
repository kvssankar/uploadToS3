const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: '',
  secretAccessKey: '',
  region: '',
});

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
  storage: multerS3({
    s3: s3,
    bucket: '',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(
        null,
        "files_from_node/" + Date.now().toString() + "_" + file.originalname
      );
    },
  }),
});


module.exports = {
  upload
};