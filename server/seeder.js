const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './.env' });

// Load models
const Trek = require('./models/Trek');
const User = require('./models/User');
const Booking = require('./models/Booking');

// Load data
const treks = require('./data/treks');
const users = require('./data/users');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import into DB
const importData = async () => {
  try {
    await Trek.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();

    await Trek.insertMany(treks);
    await User.insertMany(users);

    console.log('✅ Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Trek.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();

    console.log('✅ Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use the -i flag to import or -d to delete');
  process.exit();
}
