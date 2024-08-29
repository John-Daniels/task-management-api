import mongoose from 'mongoose';
import config from '../config'

const main = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Successfully connected to Database!");
  } catch (e) {
    console.log("Couldn't connect to the Database", e);
  }
};

main();
