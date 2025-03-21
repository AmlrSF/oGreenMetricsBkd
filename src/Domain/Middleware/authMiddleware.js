// New file: Interfaces/Middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../Entities/user'); // Adjust path as needed

async function authMiddleware(req, reply, next) {
  try {
    const token = req.cookies["auth_token"];
    
    if (!token) {
      return reply.code(401).send({ error: "Authentication required" });
    }
    
    const secret = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, secret);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return reply.code(401).send({ error: "User not found" });
    }
    
    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return reply.code(401).send({ error: "Authentication failed" });
  }
}

module.exports = authMiddleware;