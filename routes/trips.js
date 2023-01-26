var express = require('express');
var router = express.Router();
const tripsCtrl = require('../controllers/trips');
const Trip = require('../models/trip');
const ensureLoggedIn = require('../config/ensureLoggedIn')

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
    Trip.find({ user: req.user._id }).sort({ startDate: 1 })
        .then(trips => {
            res.render('trips/index', { trips: trips, title: 'TRIPS' });
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
}); 


router.get('/new', ensureLoggedIn, tripsCtrl.new);
router.get('/:id', tripsCtrl.show);
router.get('/:id/edit', ensureLoggedIn, tripsCtrl.edit);
router.put('/:id', ensureLoggedIn, tripsCtrl.update);
router.post("/:id", ensureLoggedIn, tripsCtrl.delete);

router.post('/', ensureLoggedIn, tripsCtrl.create);

module.exports = router;

