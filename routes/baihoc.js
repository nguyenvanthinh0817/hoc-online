/** @format */

var express = require('express');
var router = express.Router();
var multer = require('multer');
var controller = require('../controllers/baihoc');

var storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './public/uploads/baihoc');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.${file.originalname}`);
    },
});

var upload = multer({ storage: storage });

router.get('/:id', controller.index);

router.get('/create/:id', controller.create);

router.post('/create/:id', upload.single('video'), controller.postCreate);

module.exports = router;
