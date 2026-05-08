const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function checkDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  
  const cars = await mongoose.connection.db.collection('cars').find({}).toArray();
  console.log(`Found ${cars.length} cars in the database.`);
  if (cars.length > 0) {
    console.log('Sample car:', JSON.stringify(cars[0], null, 2));
  }
  
  const availableCars = await mongoose.connection.db.collection('cars').find({ available: true }).toArray();
  console.log(`Found ${availableCars.length} available cars.`);
  
  process.exit(0);
}

checkDB();
