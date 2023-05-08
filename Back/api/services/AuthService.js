const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../api/models/user');

class AuthService {
  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token };
  }

  async register(name, email, password) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token };
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        throw new Error();
      }

      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

module.exports = AuthService;
