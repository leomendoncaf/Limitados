const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const cleanedToken = token.replace(/bearer /ig, '').trim()

  console.log({ cleanedToken: cleanedToken })

  jwt.verify(cleanedToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalid' });
    }

    req.userId = decoded.userId;
    return next();
  });
};

module.exports = authMiddleware;
