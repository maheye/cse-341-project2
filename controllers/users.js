const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db('project2').collection("users").find();
        result.toArray().then((users) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(users);
    });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




  const getSingle = async (req, res) => {
    try{
        const userId = new ObjectId(req.params.id);
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const result = await mongodb.getDatabase().db('project2').collection("users").find({_id: new ObjectId(userId) });
        result.toArray().then((users) => {
            if (users.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(users[0]);
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }        
};

module.exports = {
    getAll,
    getSingle,
};