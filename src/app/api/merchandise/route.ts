// app/api/merchandise/route.ts
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = process.env.DATABASE_URL;
  if (!uri) return NextResponse.json({ error: 'No DB URL' }, { status: 500 });

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('filmmakerDB');
    const collection = db.collection('Product');
    const products = await collection.find({}).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching merchandise:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  } finally {
    await client.close();
  }
}
