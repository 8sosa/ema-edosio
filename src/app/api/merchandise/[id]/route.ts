import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

// Use the new `context` argument to get `params`
export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    // Access the dynamic parameter
    const { id } = context.params;

    const client = new MongoClient(process.env.DATABASE_URL!);
    await client.connect();
    const db = client.db("filmmakerDB");
    const collection = db.collection("Product");

    // If your Product documents use MongoDB ObjectId (_id),
    // you can query by _id like this (assuming params.id is a valid 24-character hex string):
    const item = await collection.findOne({ _id: new ObjectId(id) });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
