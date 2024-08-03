const express = require('express');
const router = express.Router();
const constant = require('../../constant/constant')
const {
    HttpSuccess,
  } = require('../../HttpException/index');
const db = require('../../config/db')
const DB = new db()
router.post('/filterData', async (req, res) => {
const table = req.body.table;
    const field = req.body.field;
    const keyValue = req.body.keyValue;
  
    const dbTable = constant.dataBase.filter(tableDB => tableDB === table);
  
    if (dbTable.length > 0) {
      let client;
      try {
        const { client: dbClient, database } = await DB.connect();
        client = dbClient;
        const collection = database.collection(table);
        const query = { [field]: keyValue };
        const results = await collection.find(query).toArray();
        await DB.closeConnection(client);
        return HttpSuccess(res, {
          results,
        });
      } catch (error) {
        console.error('Error filtering data:', error);
        if (client) await DB.closeConnection(client); // Ensure the connection is closed on error
        return res.status(500).json({ error: 'An error occurred while filtering data' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid table name' });
    }
  });
  module.exports = router;  