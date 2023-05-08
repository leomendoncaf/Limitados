const User = require('../models/user');

class UserService {
  async createUser(userData) {
    const user = new User(userData);
    await user.save();
    return user;
  }

  async getUserById(userId) {
    const user = await User.findById(userId);
    return user;
  }

  async updateUser(userId, userData) {
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    return user;
  }

  async deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    return user;
  }

  async getGroupMembers(groupId) {
    const groupMembers = await User.find({ groupId: groupId });
    return groupMembers;
  }
}

module.exports = UserService;
