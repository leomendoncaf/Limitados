const Group = require('../models/group');

class GroupService {
  async createGroup(name, description, users) {
    const newGroup = new Group({
      name,
      description,
      users
    });
    await newGroup.save();
    return newGroup;
  }

  async getGroupById(groupId) {
    const group = await Group.findById(groupId);
    return group;
  }

  async updateGroup(groupId, name, description, users) {
    const group = await Group.findById(groupId);
    group.name = name;
    group.description = description;
    group.users = users;
    await group.save();
    return group;
  }

  async deleteGroup(groupId) {
    const group = await Group.findByIdAndDelete(groupId);
    return group;
  }
}

module.exports = new GroupService();
