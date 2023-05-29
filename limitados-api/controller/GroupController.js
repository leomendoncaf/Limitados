const mongoose = require('mongoose');
const Group = require('../models/group');

class GroupController {
  async createGroup(req, res) {
    try {
      const { name, members, description } = req.body;

      const group = await Group.create({ name, description, members });
      return res.status(201).json(group);
    } catch (error) {
      return res.status(500).json({ error: 'Could not create group', trace: error });
    }
  }

  async getGroupById(req, res) {
    try {
      const groupId = req.params.id;
      console.log({ groupId: groupId })
      const group = await Group.findById(groupId).populate('members').exec();
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
      const cleanedGroup = group;
      cleanedGroup.members = group.members.map(member => {
        return {
          id: member._id,
          name: member.name,
          email: member.email,
          balance: member.balance
        }
      })
      return res.json(cleanedGroup);
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
      return res.json({ message: 'Group deleted successfully' });
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
