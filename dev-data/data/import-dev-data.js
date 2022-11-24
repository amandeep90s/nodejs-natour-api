const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

// Need to define before app initialization
dotenv.config({ path: '../../config.env' });
// Connecting to db
mongoose
  .connect(process.env.DATABASE_URI || 'mongodb://0.0.0.0:27017/natoursDB')
  .catch((error) => {
    throw error;
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import data into the database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
    process.exit();
  } catch (error) {
    console.log('Error 🔥', error);
    throw error;
  }
};

// Delete all data from tour collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (error) {
    console.log('Error 🔥', error);
    throw error;
  }
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
