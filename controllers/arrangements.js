const Arrangement = require('../models/arrangement');

module.exports = {
  new: newArrangement,
  create,
  delete: deleteArrangement
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

function deleteArrangement(req, res) {
  Arrangement.findByIdAndDelete(req.params.id, function(err) {
      if (err) return res.redirect(`/trips/${req.params.tripId}/arrangements/${req.params.id}`);
      res.redirect(`/trips/${req.params.tripId}`);
  });
}