const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const uuid = require('uuid');
const router = express.Router()
const path = require('path');
const socket = require('socket.io');
const helmet = require('helmet');

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api', adsRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(400).send('Not found..');
});

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = process.env.DB_URL;
else dbUri = 'mongodb://localhost:27017/InformationBoard';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});