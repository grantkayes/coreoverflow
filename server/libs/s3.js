const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuidv4 = require('uuid/v4');

require('dotenv').config();

if (
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_S3_BUCKET ||
  !process.env.AWS_S3_REGION ||
  !process.env.AWS_S3_ENDPOINT
) {
  throw new ReferenceError(
    'Environmental variables: AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY or AWS_S3_BUCKET are undefined',
    'libs/aws.js',
    9
  );
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
  s3BucketEndpoint: true,
  endpoint: process.env.AWS_S3_ENDPOINT
});

const MY_BUCKET_NAME = process.env.AWS_S3_BUCKET;

// S3 Functions
const uploadDocument = multer({
  storage: multerS3({
    s3,
    bucket: MY_BUCKET_NAME,
    acl: 'public-read',
    contentType: function(req, file, cb) {
      cb(null, 'image/jpeg');
    },
    metadata: function(req, file, cb) {
      const original = file.originalname.replace(/ /g, '_');

      cb(null, {
        fileName: original,
        fieldName: file.fieldname
      });
    },
    key: async function(req, file, cb) {
      // Hash the file names
      const userId = '1';

      const uuid = uuidv4();

      const uuidKey = `${userId}/${uuid}`;

      cb(null, uuidKey);
    }
  })
});

module.exports = {
  // Documents:
  uploadDocument
};
