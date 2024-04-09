const { Thoughts, User } = require('../models');

module.exports = {
  // Function to get all of the Thoughts by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
 async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({ _id: req.params.thoughtsId });

      if (!thought) {
        return res.status(404).json({ message: 'No thoughts associated' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
async createThought(req, res) {
    try {
      const thought = await Thoughts.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { Thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      }

      res.json('Created a thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Updates and application using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
 async deleteThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndRemove({ _id: req.params.thoughtsId });

      if (!thought) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { Thoughts: req.params.thoughtsId },
        { $pull: { Thoughts: req.params.thoughtsId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created but no user with this id!',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
 async addReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $addToSet: { tags: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $pull: { tags: { tagId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};