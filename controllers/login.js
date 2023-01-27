module.exports = {
  index,
}

function index(req, res) {
  if (req.user) {
    res.redirect('/trips');
  } else {
    res.render('login', { title: '' });
  }
}
