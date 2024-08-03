const { MongoClient } = require('mongodb');

class db {
    constructor() {
        this.client = null
    }
    async connect() {
        try {
          const uri = 'mongodb+srv://user:admin@cluster0.jvfu57r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Your MongoDB connection string
          const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
          await client.connect(); // Ensure the client is connected
    
          const database = client.db('user'); // Replace 'user' with your actual database name
          console.log('Connected to database');
        this.client = client
          // Return both the client and the database
          return { client, database };
        } catch (err) {
          console.log('Error connecting to the database:', err);
          throw err; // Re-throw the error after logging it
        }
      }
    async closeConnection(client) {
        await client.close();
    }
    
}

module.exports = db;  

