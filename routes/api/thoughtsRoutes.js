const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtsController');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:thoughtsId
router
  .route('/:thoughtsId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/Thoughts/:applicationId/tags
router.route('/:thoughtsId/reactions').post(addReaction);

// /api/Thoughts/:applicationId/tags/:tagId
router.route('/:thoughtsId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
