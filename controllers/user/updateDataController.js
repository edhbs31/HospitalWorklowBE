const express = require('express');
const router = express.Router();
const db = require('../../config/db')
const DB = new db()
const constant = require('../../constant/constant')
const {
    HttpSuccess,
  } = require('../../HttpException/index');
router.post('/updateData', async (req, res) => {
    const table = req.body.database;
    const fieldToUpdate = req.body.fieldToUpdate;
    const newValue = req.body.newValue;
    const key = req.body.key;
    const keyValue = req.body.keyValue; // Assuming you have a key value to match
    const dbTable = constant.dataBase.filter(tableDB => tableDB === table);
    
    if (dbTable.length > 0) {
        try {
            const { client, database } = await DB.connect();
            const collection = database.collection(table);
            const query = { [key]: keyValue }; // Constructing the query
            const update = { $set: { [fieldToUpdate]: newValue } }; // Constructing the update object
            const options = { upsert: false }; // Specify options
            const result = await collection.updateOne(query, update, options);
            await DB.closeConnection(client); // Close the connection
            return HttpSuccess(res, { result }); // Return the result
        } catch (error) {
            console.error('Error updating data:', error);
            return res.status(500).json({ error: 'An error occurred while updating data' });
        }
    } else {
        return res.status(400).json({ error: 'Invalid table name' });
    }
});

  module.exports = router;  