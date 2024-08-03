const mongoose = require('mongoose');

// Use the provided connection string
const dbURI = `${process.env.DB_URI}`;

mongoose.connect(dbURI, { dbName: `${process.env.DB_NAME}`, useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB cluster`);
});

mongoose.connection.on('error', (err) => {
  console.error(`Database connection error: ${err}`);
});


module.exports = mongoose