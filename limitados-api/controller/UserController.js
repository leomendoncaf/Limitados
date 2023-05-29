const express = require('express');
const router = express.Router();
const User = require('../models/user');

class UserController {
  async getAll(req, res) {
    try {
      const users = await User.find();
      const safeUsers = Array.from(users).map(user => {
        return {
          id: user._id,
          name: user.name,
          email: user.email
        }
      })
      res.json(safeUsers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req, res) {
    const userId = req.params.id;
    if (!userId) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }
    try {
      const user = await User.findById(userId);
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find user' });
      }
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getCurrentUser(req, res) {
    const userId = req.userId;
    console.log(userId)
    if (!userId) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }
    try {
      const user = await User.findById(userId);
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find user' });
      }
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}




// POST create user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE delete user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get user by ID
async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    res.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = new UserController();
