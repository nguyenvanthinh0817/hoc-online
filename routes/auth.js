var express = require('express');
var router = express.Router();
var controller = require('../controllers/auth');


router.get('/login', controller.login);

router.get('/dangky', controller.dangky);

router.get('/login', controller.login);

router.get('/logout', controller.logout);


router.post('/login', controller.postLogin);
router.post('/dangky', controller.postDangky);


module.exports = router;
