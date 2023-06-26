require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const cors = require('cors');
mongoose.connect('mongodb://127.0.0.1/mestodb');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
<<<<<<< HEAD
});
=======
});
>>>>>>> 8805ed42e469c127bc46252c5ab5458edebe56d5
