var express = require('express');
var router = express.Router();
const loginCtrl = require('../controllers/login');

router.get('/', loginCtrl.index);

module.exports = router;
