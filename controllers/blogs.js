const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllBlogs = async (req, res) => {
    //#swagger.tags=['blogs']
    try {
        const result = await mongodb.getDatabase().db().collection('blogs').find();
        result.toArray().then((blogs) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(blogs);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSingleBlog = async (req, res) => {
    //#swagger.tags=['blogs']
    const blogId = req.params.id;
    if (!ObjectId.isValid(blogId)) {
        return res.status(400).json({ error: 'Invalid blog ID' });
    }

    try {
        const result = await mongodb.getDatabase().db().collection('blogs').find({ _id: new ObjectId(blogId) });
        result.toArray().then((blogs) => {
            if (blogs.length === 0) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(blogs[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createBlog = async (req, res) => {
    //#swagger.tags=['blogs']
    const { title, users, category, content, published_date, tags, format } = req.body;

    // Data validation
    if (!title || !users || !content || !published_date || !tags || !format) {
        return res.status(400).json({ error: "Title, users, content, published date, tags, and format are required." });
    }

    // Create the updated blog object
    const blog = {
        title,
        users,
        category,
        content,
        published_date,
        tags,
        format
    };

    try {
        // Update the blog in the database
        const response = await mongodb.getDatabase().db().collection('blogs').insertOne(blog);
        
        // Check if the blog was successfully updated
        if (response.acknowledged) {
            return res.status(204).send();// Success
        } else {
            return res.status(500).json('Some error occurred while creating the blog.');// Internal server error
        }
    } catch (error) {
        return res.status(500).json(error.message || 'Some error occurred while creating the blog.');// Internal server error
    }
};

const updateBlog = async (req, res) => {
    //#swagger.tags=['blogs']
    const blogId = new ObjectId(req.params.id);

    // Destructure the request body
    const { title, users, category, content, published_date, tags, format } = req.body;

    // Data validation
    if (!title || !users || !content || !published_date || !tags || !format) {
        return res.status(400).json({ error: "Title, users, content, published date, tags, and format are required." });
    }

    // Create the updated blog object
    const updatedBlog = {
        title,
        users,
        category,
        content,
        published_date,
        tags,
        format
    };

    try {
        // Update the blog in the database
        const response = await mongodb.getDatabase().db().collection('blogs').replaceOne({ _id: blogId }, updatedBlog);

        // Check if the blog was successfully updated
        if (response.modifiedCount > 0) {
            return res.status(204).send(); // Success
        } else {
            return res.status(404).json({ error: "Blog not found." }); // Blog with given ID not found
        }
    } catch (error) {
        return res.status(500).json(error.message || 'Some error occurred while updating the blog.'); // Internal server error
    }
};

const deleteBlog = async (req, res) => {
    //#swagger.tags=['blogs']
    try {
        const blogId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('blogs').deleteOne({ _id: blogId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the blog.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllBlogs,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog
};