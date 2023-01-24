const express = require('express');
const router = express.Router({ mergeParams: true });
const arrangementsCtrl = require('../controllers/arrangements');

router.get('/new', arrangementsCtrl.new)
router.post('/', arrangementsCtrl.create);

module.exports = router;