const express = require('express');
const router = express.Router();
const db = require('../../config/db')
const DB = new db()
const constant = require('../../constant/constant')
const {
    HttpSuccess,
  } = require('../../HttpException/index');
router.post('/addData', async (req, res) => {
    const table = req.body.key;
    const data = req.body.data.flat();
    console.log('this is key', table);
    console.log('this is data', data);
  
    const dbTable = constant.dataBase.filter(tableDB => tableDB === table);
  
    if (dbTable.length > 0) {
      let client;
      try {
        const { client: dbClient, database } = await DB.connect();
        client = dbClient;
        const collection = database.collection(table);
        const result = await collection.insertMany(data);
        await DB.closeConnection(client);
        return HttpSuccess(res, {
          result,
        });
      } catch (error) {
        console.error('Error inserting data:', error);
        if (client) await DB.closeConnection(client); // Ensure the connection is closed on error
        return res.status(500).json({ error: 'An error occurred while inserting data' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid table name' });
    }
  });
  
  module.exports = router;

  module.exports = router;  