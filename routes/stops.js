const express = require('express');
const router = express.Router({ mergeParams: true });
const stopsCtrl = require('../controllers/stops');

router.get('/new', stopsCtrl.new)
router.post('/', stopsCtrl.create);
router.get('/:id', stopsCtrl.show);

module.exports = router;