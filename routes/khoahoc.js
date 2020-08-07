/** @format */

var express = require('express');
var router = express.Router();
var multer = require('multer');
var controller = require('../controllers/khoahoc');

var storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, './public/uploads/khoahoc')
    },
    filename: function(req, file, cb){
        cb(null,`${Date.now()}.${file.originalname}`)
    }
})

var upload = multer({storage: storage});


/* GET users listing. */

router.get('/', controller.index);
router.get('/create', controller.getCreate);
router.get('/khaitru/:idKh/:idHv', controller.khaitru);
router.get('/addhv/:idKh/:idHv', controller.themhv);
router.get('/update/:id', controller.update);
router.get('/themhv/:id', controller.getThemhv);
router.get('/:id', controller.chitiet);
router.get('/delete/:id', controller.delete);



router.post(
    '/create',
    upload.single('avatar'),
    controller.create
);

router.post(
    '/update/:id',
    upload.single('avatar'),
    controller.postUpdate
);
//////////////


module.exports = router;
