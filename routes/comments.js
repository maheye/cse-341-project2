const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', commentsController.getAllComments);

router.get('/:id', commentsController.getSingleComment);

router.post('/', isAuthenticated, commentsController.createComment);

router.put('/:id', isAuthenticated, commentsController.updateComment);

router.delete('/:id', isAuthenticated, commentsController.deleteComment);

module.exports = router;