import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const client = new MongoClient(process.env.DATABASE_URL!);
    await client.connect();
    const db = client.db("filmmakerDB");
    const collection = db.collection("Product");

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
