//middleware to check if user is logged in
var ensureAuth = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      req.flash("error", "You must be logged in to see this page.");
      res.redirect('/login');
  }
}

module.exports = {ensureAuthenticated: ensureAuth};