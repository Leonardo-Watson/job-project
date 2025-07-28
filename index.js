const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Node API testing nodemon');
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    'mongodb+srv://leonardowatson26:AHWX29pyvUToBfNQ@backenddb.pmwkpa4.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backendDB'
  )
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, '0.0.0.0', () => {
      console.log(`Example app listening on port 3000`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
