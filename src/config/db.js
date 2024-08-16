import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function conectaNaDatabase() {
    mongoose.connect(process.env.DB_CONNECTION_STR);
    return mongoose.connection;
}
  
export default conectaNaDatabase;