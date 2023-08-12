const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    return res.status(403).send('No token provided.');
  }
  const token = authHeaders.substring(7);
  if (!token) {
    return res.status(403).send('Invalid token.');
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized access.');
    }
    req.userId = decoded.user_id;
    next();
  });
}
