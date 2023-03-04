import { MongoClient } from "mongodb";
import dontenv from "dotenv";

dontenv.config();

// Create a new MongoClient
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default client;
