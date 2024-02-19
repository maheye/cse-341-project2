const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogs');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', blogsController.getAllBlogs);

router.get('/:id', blogsController.getSingleBlog);

router.post('/', isAuthenticated, blogsController.createBlog);

router.put('/:id', isAuthenticated, blogsController.updateBlog);

router.delete('/:id', isAuthenticated, blogsController.deleteBlog);

module.exports = router;