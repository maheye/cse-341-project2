const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllComments = async (req, res) => {
    //#swagger.tags=['comments']
    try {
        // Retrieve all comments from the database
        const result = await mongodb.getDatabase().db().collection('comments').find();
        // Convert the result to an array of comments
        result.toArray().then((comments) => {
            // Set the response header
            res.setHeader('Content-Type', 'application/json');
            // Send the comments as a JSON response
            res.status(200).json(comments);
        });
    } catch (error) {
        console.error(error);
        // Handle internal server error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSingleComment = async (req, res) => {
    //#swagger.tags=['comments']
    try {
        const commentId = req.params.id;
        if (!ObjectId.isValid(commentId)) {
            return res.status(400).json({ error: 'Invalid comment ID' });
        }

        const result = await mongodb.getDatabase().db().collection('comments').find({ _id: new ObjectId(commentId) });
        result.toArray().then((comments) => {
            if (comments.length === 0) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(comments[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createComment = async (req, res) => {
    //#swagger.tags=['comments']
    try {
        const comment = {
            blogId: req.body.blogId,
            commenttext: req.body.commenttext,
            user: req.body.user,
        };

        const response = await mongodb.getDatabase().db().collection('comments').insertOne(comment);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the comment.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateComment = async (req, res) => {
    //#swagger.tags=['comments']
    try {
        const commentId = new ObjectId(req.params.id);
        const comment = {
            blogId: req.body.blogId,
            commenttext: req.body.commenttext,
            user: req.body.user,
        };

        const response = await mongodb.getDatabase().db().collection('comments').replaceOne({ _id: commentId }, comment);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the comment.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteComment = async (req, res) => {
    //#swagger.tags=['comments']
    try {
        const commentId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('comments').deleteOne({ _id: commentId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the comment.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllComments,
    getSingleComment,
    createComment,
    updateComment,
    deleteComment
};