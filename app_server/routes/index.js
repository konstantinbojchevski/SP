var express = require('express');
var router = express.Router();
const ctrlMain = require("../controllers/main")
const ctrlUsers = require("../controllers/users")
const ctrlPay = require("../controllers/payment")
const ctrlDogs = require("../controllers/dogs")
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },

    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({storage: storage}).single('dog_pic');

router.get('/', ctrlMain.ads2);

router.get('/feed', ctrlMain.ads);

router.get('/aboutUs', ctrlMain.aboutUs);

router.get('/register', ctrlMain.register);

router.get('/newAd', ctrlMain.newAdBreeds);

router.get('/faq', ctrlMain.faq);

router.get('/dogprofile', ctrlMain.dogprofile);

router.get('/personprofile', ctrlMain.personprofile);

router.get('/payment', ctrlMain.payment);

router.post('/register/request', ctrlUsers.addUser);

router.get('/register/success', ctrlMain.success);

router.post('/newad/request', upload, ctrlDogs.addDog);

router.post('/signin', ctrlUsers.login);

router.get('/signout', ctrlUsers.logout);

router.get('/ad/:idAd', ctrlMain.ad);

router.get('/deleteDog/:id',ctrlDogs.deleteDog);

router.get('/search', ctrlMain.adsSearch);

router.get('/filter', ctrlMain.filter);

router.get('/db', ctrlMain.initial);

router.get('/clear', ctrlUsers.clear);

router.post('/editAd/:id', ctrlDogs.editDog);

router.post('/payment/request', ctrlPay.addPayment);

router.get('/error', ctrlMain.error);

router.post('/wallet/:id', ctrlMain.wallet);

router.get('/user/delete/:username', ctrlUsers.deleteUser)

module.exports = router;
