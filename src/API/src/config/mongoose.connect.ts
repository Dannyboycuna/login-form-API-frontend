import mongoose from "mongoose";
require('dotenv').config();

const MongoDB = process.env.MONGO_DB_URI;
mongoose.set('strictQuery', true)

if (!MongoDB) {
  console.error('MONGO_DB_URI is not defined. Please check your environment variables.')
  process.exit(1)
}

async function connectToDataBase(){
  try {

    if (MongoDB) {
      await mongoose.connect(MongoDB);
      console.log("Connected to MongoDB")
    } else {
      throw new Error('MongoDB URI is undefined.');
    }
   
  }
  catch (error) {
    console.error("Error connecting MongoDB", error)
  }
}

module.exports = connectToDataBase();