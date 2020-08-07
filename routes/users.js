var express = require('express');
var router = express.Router();
var controller = require('../controllers/user');

/* GET users listing. */
router.get('/', controller.index);
router.post('/create', controller.create);
router.post('/update/:id', controller.update);
router.get('/delete/:id', controller.delete);
module.exports = router;
