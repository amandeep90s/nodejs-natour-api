const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Need to define before app initialization
dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app');

// Connecting to db
mongoose.connect(process.env.DATABASE_URI || '').catch((error) => {
  throw error;
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port);
