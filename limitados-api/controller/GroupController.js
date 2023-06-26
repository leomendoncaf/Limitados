const mongoose = require('mongoose');
const Group = require('../models/group');

class GroupController {
  async getAll(req, res) {
    try {
      const userId = req.userId;
      const groups = await Group
        .find({ members: { $in: [userId] } })
        .select({ id: 1, name: 1, description: 1, members: 1 })
        .populate('members', { id: 1, name: 1, email: 1, balance: 1 })
        .exec();
      return res.status(200).json(groups);
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch groups', trace: error });
    }
  }
  async createGroup(req, res) {
    try {
      const { name, members, description } = req.body;

      const group = await Group
        .create({ name, description, members });

      const populatedGroup = await Group
        .findById(group.id)
        .select({ id: 1, name: 1, description: 1, members: 1 })
        .populate('members', { id: 1, name: 1, email: 1, balance: 1 })
        .exec();

      return res.status(201).json(populatedGroup);
    } catch (error) {
      return res.status(500).json({ error: 'Could not create group', trace: error });
    }
  }

  async getGroupById(req, res) {
    try {
      const groupId = req.params.id;
      console.log({ groupId: groupId })
      const group = await Group
        .findById(groupId)
        .select({ id: 1, name: 1, description: 1, members: 1 })
        .populate('members', { id: 1, name: 1, email: 1, balance: 1 })
        .exec();
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }

      return res.json(group);
    } catch (error) {
      return res.status(500).json({ error: 'Could not get group' });
    }
  }

  async updateGroup(req, res) {
    try {
      const groupId = req.params.id;
      const { name, members } = req.body;
      const group = await Group.findByIdAndUpdate(groupId, { name, members }, { new: true });
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
      return res.json(group);
    } catch (error) {
      return res.status(500).json({ error: 'Could not update group' });
    }
  }

  async deleteGroup(req, res) {
    try {
      const groupId = req.params.id;
      const group = await Group.findByIdAndDelete(groupId);
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
      return res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Could not delete group' });
    }
  }

  async addMembersToGroup(req, res) {
    try {
      const groupId = req.params.id;
      const { members } = req.body;
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
      group.members = [...new Set([...group.members, ...members])];
      await group.save();
      return res.json(group);
    } catch (error) {
      return res.status(500).json({ error: 'Could not add members to group' });
    }
  }

  async removeMembersFromGroup(req, res) {
    try {
      const groupId = req.params.id;
      const { members } = req.body;
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
      group.members = group.members.filter(member => !members.includes(member));
      await group.save();
      return res.json(group);
    } catch (error) {
      return res.status(500).json({ error: 'Could not remove members from group' });
    }
  }
}

module.exports = new GroupController();
