const Arrangement = require('../models/arrangement');

module.exports = {
  new: newArrangement,
  create
};

function newArrangement(req, res) {
  res.render('arrangements/new', { title: 'New Travel Arrangement', tripId: req.params.tripId });
}

function create(req, res) {
  const arrangement = new Arrangement({ type: req.body.type, dateTime: req.body.dateTime, location: req.body.location, details: req.body.details });
  arrangement.trip = req.params.tripId;
  arrangement.save((err) => {
      if (err) {
          return;
      }
      res.redirect(`/trips/${req.params.tripId}`);
  });
}