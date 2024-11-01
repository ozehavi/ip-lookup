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


// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// const os = require('os');
// require('dotenv').config();


// // Cache the IP information for better performance
// let cachedIPInfo = null;
// let lastFetch = null;
// const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// // Cached IP information route
// app.get('/api/host-info/cached', async (req, res, next) => {
//   try {
//     const now = Date.now();
    
//     if (!cachedIPInfo || !lastFetch || (now - lastFetch > CACHE_DURATION)) {
//       const internalIP = getInternalIP();
//       const publicIP = await getPublicIP();
      
//       cachedIPInfo = {
//         internal_ip: internalIP,
//         public_ip: publicIP,
//         hostname: os.hostname(),
//         last_updated: new Date().toISOString()
//       };
      
//       lastFetch = now;
//     }

//     res.json(cachedIPInfo);
//   } catch (error) {
//     next(error);
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     message: 'Something broke!',
//     error: process.env.NODE_ENV === 'development' ? err.message : undefined 
//   });
// });

// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   // Log initial IP information
//   console.log('Internal IP:', getInternalIP());
//   getPublicIP().then(ip => console.log('Public IP:', ip));
// });