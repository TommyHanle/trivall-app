const Trip = require('../models/trip');
const Stop = require('../models/stop')
const Arrangement = require('../models/arrangement')

module.exports = {
  index,
  new: newTrip,
  create,
  show,
}

function index(req, res) {
  if(req.user){
  Trip.find({user: req.params.userId}, function(err, trips) {
  if (err) {
  // handle the error (e.g. render an error view, log the error, etc.)
  } else {
  res.render('trips/index', { title: 'All Trips', trips });
  }
  });
  } else {
  res.redirect('/login');
  }
  }

/* function index(req, res) {
    Trip.find({}, function(err, trips) {
      res.render('trips/index', { title: 'All Trips', trips });
    });
} */

function newTrip(req, res) {
  res.render('trips/new', { title: 'Create Trip' });
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  const trip = new Trip(req.body);
  trip.save(function(err) {
    if (err) return res.redirect('/trips/new');
    console.log(trip);
    res.redirect(`/trips/${trip._id}`);
  });
}

function show(req, res) {
  Trip.findById(req.params.id, function(err, trip) {
    Stop.find({trip: trip._id}, function(err, stops) {
      Arrangement.find({trip: trip._id}, function(err, arrangements) {
        res.render('trips/show', { title: 'Trip Details', trip: trip, stops: stops, arrangements: arrangements });
    });
  });
})
}
