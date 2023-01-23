const Trip = require('../models/trip');

module.exports = {
  index,
}

function index(req, res) {
    Trip.find({}, function(err, trips) {
      res.render('trips/index', { title: 'All Trips', trips });
    });
}