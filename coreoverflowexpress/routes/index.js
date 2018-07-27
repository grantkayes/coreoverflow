var express = require('express');
var router = express.Router();

const {
  // Documents:
  uploadDocument
} = require('../libs/s3');

const upload = uploadDocument.array('doc');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', function(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
    }

    const filesObj = { success: req.files, failed: req.failed };

    res.json(filesObj);
  });
});

module.exports = router;
