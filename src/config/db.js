import mongoose from "mongoose";

async function conectaNaDatabase() {
    mongoose.connect(process.env.DB_CONNECTION_STR);
    return mongoose.connection;
}
  
export default conectaNaDatabase;