const express = require('express');
const router = express.Router();
const db = require('../../config/db')
const DB = new db()
const constant = require('../../constant/constant')
const {
     HttpSuccess,
  } = require('../../HttpException/index');
router.post('/deleteData', async (req, res) => {
  const table = req.body.table;
  const key = req.body.key;
  const keyValue = req.body.keyValue;
  const dbTable = constant.dataBase.filter(tableDB => tableDB === table);

  if (dbTable.length > 0) {
    try {
      const { client, database } = await DB.connect();
      const collection = database.collection(table);
      const query = { [key]: keyValue };
      const deleteResult = await collection.deleteMany(query);
      console.log(`${deleteResult.deletedCount} document(s) was/were deleted.`);
      await DB.closeConnection(client);
      return  HttpSuccess(res, {
        result: deleteResult
      });
    } catch (error) {
      console.error('Error deleting data:', error);
      return res.status(500).json({ error: 'An error occurred while deleting data' });
    }
  } else {
    return res.status(400).json({ error: 'Invalid table name' });
  }
});
  module.exports = router;  