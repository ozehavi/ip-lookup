const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const homeRouter = require('./routes/home');
const hostInfoRouter = require('./routes/host');
const domainRouter = require('./routes/domain');
const historyRouter = require('./routes/history');


const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

//Connect to the MongoDB database
const mongoUri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/ip-lookup';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB', err));

// Routes
app.use('/', homeRouter);
app.use('/host', hostInfoRouter);
app.use('/domain', domainRouter);
app.use('/history', historyRouter);

// connection
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening to port ${port}`));