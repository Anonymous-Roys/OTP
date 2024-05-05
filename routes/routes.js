const router = require('express').Router();
const {signup, getBill} = require('../controller/appController.js')

router.post('/user/sign', signup)
router.post('/product/getBill', getBill)


module.exports = router;