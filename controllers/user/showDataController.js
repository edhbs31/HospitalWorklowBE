const express = require('express');
const router = express.Router();
const db = require('../../config/db')
const DB = new db()
const constant = require('../../constant/constant')
const {
    HttpSuccess,
  } = require('../../HttpException/index');
router.post('/showTable', async (req, res) => {
    const table = req.body.table;
    console.log("req table", table)
    const dbTable = constant.dataBase.filter(tableDB => tableDB === table);
    const limit = req.body.limit || 10; // Default limit is 10 if not provided
    const offset = req.body.offset || 0; // Default offset is 0 if not provided
    const queryKey = req.body.queryKey;
    const queryField = req.body.queryField;
    const sortField = req.body.sortField || 'id'; // Default sort field is 'id'
    const sortOrder = req.body.sort === 'asc' ? 1 : 1; // Default sort order is descending
    let query = {};
    console.log("table", table)
    console.log("dbTable", dbTable)
    if (dbTable.length > 0) {
        try {
            const { client, database } = await DB.connect();
            const collection = database.collection(table);
            let results = null ;
            if (queryField!="" && queryKey!="") {
                query[queryField] = new RegExp(queryKey,'i')
                results = await collection.find(query).limit(limit).toArray()
            } else {
                results = await collection.find(query).skip(offset).limit(limit).sort({ [sortField]: sortOrder }).toArray(); // Apply limit and offset
            }
            await DB.closeConnection(client); // Close the connection
            console.log("result.leng", results.length)
            return HttpSuccess(res, { results }); // Return the results
        } catch (error) {
            console.error('Error retrieving data:', error);
            return res.status(500).json({ error: 'An error occurred while retrieving data' });
        }
    } else {
        return res.status(400).json({ error: 'Invalid table name' });
    }
});


  module.exports = router;  