const Stop = require('../models/stop');

module.exports = {
  new: newStop,
  create,
  show
};

function newStop(req, res) {
  res.render('stops/new', { title: 'New Stop', tripId: req.params.tripId });
}

function create(req, res) {
  const stop = new Stop({ title: req.body.title, dateTime: req.body.dateTime, location: req.body.location, details: req.body.details });
  stop.trip = req.params.tripId;
  stop.save((err) => {
      if (err) {
          return;
      }
      res.redirect(`/trips/${req.params.tripId}`);
  });
}

function show(req, res) {
  Stop.findById(req.params.id, function(err, stop) {
    res.render('stops/show', { title: 'About the Stop', stop: stop });
  });
}