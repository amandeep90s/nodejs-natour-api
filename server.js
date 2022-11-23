const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Need to define before app initialization
dotenv.config({ path: `${__dirname}/config.env` });

// Connecting to db
mongoose.connect(process.env.DATABASE_URI || '').catch((error) => {
  throw error;
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
