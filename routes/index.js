const express = require('express');

const router = express.Router();
const rateLimit = require('express-rate-limit');

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
// Limiter is to prevent users from sending requests multiple times each IP to 100 requests per windowMs for 1 second request
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 10, // limit each IP to 100 requests per windowMs
});
// Middleware is used to check if the user has already login before or not
// Middleware is used to prevent unathorized user that haven't login
const middleware = require('../middleware/auth');
//MiddlewareClient is used to check if the client is valid or not
//MiddlewareClient is used in Login, Register and getData
const addData = require('../controllers/user/addDataController');
router.use('/addData', limiter,   addData);

const deleteData = require('../controllers/user/deleteDataController');
router.use('/deleteData', limiter, deleteData);

const filterData = require('../controllers/user/filterDataController');
router.use('/filterData', limiter,   filterData);

const showTable = require('../controllers/user/showDataController');
router.use('/showTable', limiter,   showTable);

const updateData = require('../controllers/user/updateDataController');
router.use('/updateData', limiter,   updateData);



module.exports = router;