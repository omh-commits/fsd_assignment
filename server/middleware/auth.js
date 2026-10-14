// Small helpers that stop a request when nobody is logged in.
// Usage: router.get('/cart', requireLogin(), handler)

function requireLogin(message = 'Please log in first.') {
  return function (req, res, next) {
    if (!req.session.userId) {
      return res.status(401).json({ status: 'error', message });
    }
    next();
  };
}

function requireSubadmin(req, res, next) {
  if (!req.session.subadminId) {
    return res.status(401).json({ status: 'error', message: 'You must log in first!' });
  }
  next();
}

function requireHeadadmin(req, res, next) {
  if (!req.session.headadminEmail) {
    return res.status(401).json({ status: 'error', message: 'You must log in first!' });
  }
  next();
}

module.exports = { requireLogin, requireSubadmin, requireHeadadmin };
