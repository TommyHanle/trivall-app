const Trip = require('../models/trip');
const Stop = require('../models/stop')
const Arrangement = require('../models/arrangement')

module.exports = {
  index,
  new: newTrip,
  create,
  show,
  edit,
  update,
  delete: deleteTrip
}

function index(req, res) {
    Trip.find({}, function(err, trips) {
      res.render('trips/index', { title: 'All Trips', trips });
    });
} 

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
    Stop.find({trip: trip._id}).sort({dateTime: 1}).exec(function(err, stops) {
      Arrangement.find({trip: trip._id}).sort({dateTime: 1}).exec(function(err, arrangements) {
        res.render('trips/show', { title: 'TRIP DETAILS', trip: trip, stops: stops, arrangements: arrangements });
      });
    });
  });
}

function edit(req, res) {
  Trip.findById(req.params.id, function(err, trip) {
    res.render('trips/edit', { title: 'Edit Trip', trip });
  });
}

function update(req, res) {
  Trip.findByIdAndUpdate(req.params.id, req.body, function(err, trip) {
    res.redirect(`/trips/${trip._id}`);
  });
}

function deleteTrip(req, res) {
  Trip.findByIdAndDelete(req.params.id, function(err, trip) {
    Stop.deleteMany({ trip: req.params.id }, function(err) {
      if (err) return next(err);
    });
    Arrangement.deleteMany({ trip: req.params.id }, function(err) {
      if (err) return next(err);
    });
    res.redirect('/trips');
  });
}
