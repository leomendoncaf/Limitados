const jwt = require('jsonwebtoken');

class Authorization {
  static verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
      
      req.user = decoded;
      next();
    });
  }
  
  static checkPermission(req, res, next) {
    const user = req.user;
    const groupId = req.params.groupId;
    
    // Check if the user is a member of the group
    if (!user.groups.includes(groupId)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    
    // Check if the user is an admin of the group
    if (user.adminGroups.includes(groupId)) {
      req.isAdmin = true;
    }
    
    next();
  }
}
