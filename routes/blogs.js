const express = require('express');
const router = express.Router();

const blogsController = require('../controllers/blogs');

router.get('/', blogsController.getAllBlogs);

router.get('/:id', blogsController.getSingleBlog);

router.post('/', blogsController.createBlog);

router.put('/:id', blogsController.updateBlog);

router.delete('/:id', blogsController.deleteBlog);

module.exports = router;