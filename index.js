require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/products', productRoute);

app.get('/', (req, res) => {
  res.send('Hello from Node API testing nodemon');
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@backenddb.pmwkpa4.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backendDB`
  )
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log(`Example app listening on port 3000`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
