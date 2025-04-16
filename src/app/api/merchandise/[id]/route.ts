// app/api/items/[id]/route.ts
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    // Now you can use params.id safely.
    // const session = await getServerSession(authOptions);
    // if (!session || !session.user?.email) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
  
    try {
      const client = new MongoClient(process.env.DATABASE_URL!);
      await client.connect();
      const db = client.db("filmmakerDB");
      const collection = db.collection("Product");
  
      // If your Product documents use MongoDB ObjectId (_id),
      // you can query by _id like this (assuming params.id is a valid 24-character hex string):
      const item = await collection.findOne({ _id: new ObjectId(params.id) });
  
      if (!item)
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
  
      return NextResponse.json(item, { status: 200 });
    } catch (error) {
      console.error("Error fetching item:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  
