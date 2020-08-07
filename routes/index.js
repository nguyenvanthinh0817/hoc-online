var express = require('express');
var router = express.Router();
var controller = require('../controllers/index');
/* GET home page. */
router.get('/', controller.index);
router.get('/gioithieu', controller.gioithieu);

router.get('/lienhe', controller.lienhe);

module.exports = router;
