var express = require('express');
var router = express.Router();
const tripsCtrl = require('../controllers/trips');

router.get('/', tripsCtrl.index);

module.exports = router;
