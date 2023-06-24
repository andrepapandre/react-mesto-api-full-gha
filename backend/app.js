const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const cors = require('cors');
mongoose.connect('mongodb://127.0.0.1/mestodb');

const app = express();
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use(router);

app.listen(3001, () => {
  console.log('Server is listenning on port 3000');
});
