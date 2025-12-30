// Lightweight placeholder auth middleware.
// Replace with real authentication/authorization (e.g., JWT) for production.

const auth = (req, res, next) => {
  // In a real app, decode token and set req.user accordingly.
  // For now, allow overriding via headers for local testing.
  if (!req.user) {
    req.user = {
      _id: req.headers['x-user-id'] || null,
      role: req.headers['x-user-role'] || 'admin',
    };
  }
  next();
};

const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  next();
};

module.exports = { auth, authorize };

