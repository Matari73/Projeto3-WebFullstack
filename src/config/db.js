import mongoose from "mongoose";

async function conectaNaDatabase() {
    mongoose.connect("mongodb+srv://admin:admin@cluster0.60q0n.mongodb.net/StarWars?retryWrites=true&w=majority&appName=Cluster0");
      
    return mongoose.connection;
}
  
export default conectaNaDatabase;