const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const indexRouter = require('./routes/index');
const app = express();

app.get('/', (req, res) => {
  res.send('Server Active');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use((req, res) => res.status(404).json({
    success: 'false',
    message: 'router not found',
}));
  
app.use((err, req, res, next) => res.status(500).json({
    success: 'false',
    message: 'Internal Server Error',
}));

module.exports = app;