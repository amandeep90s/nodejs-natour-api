const dotenv = require('dotenv');
// Need to define before app initialization
dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app');

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
