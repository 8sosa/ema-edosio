// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL!;
const options = {
  // All options removed since they're not needed
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.DATABASE_URL) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

export {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
