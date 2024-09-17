import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 50000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });
    console.log(
      `Connected to mongodb database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
