var express = require('express');
var router = express.Router();
const tripsCtrl = require('../controllers/trips');
const Trip = require('../models/trip');

router.use((req, res, next) => {
    if(req.originalUrl === '/trips/new') return next();
    if (req.user) {
        Trip.find({ user: req.user._id })
        .then(trips => {
                res.locals.trips = trips;
                next();
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
    } else {
        res.redirect('/login');
    }
});  


router.get('/', (req, res, next) => {
    res.render('trips/index', { trips: res.locals.trips, title: 'Trips' });
});  

router.get('/new', tripsCtrl.new);
router.get('/:id', tripsCtrl.show);
router.get('/:id/edit', tripsCtrl.edit);
router.put('/:id', tripsCtrl.update);
router.post("/:id", tripsCtrl.delete);

router.post('/', tripsCtrl.create);

module.exports = router;

