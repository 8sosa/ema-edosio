// app/api/merchandise/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('filmmakerDB');
    const collection = db.collection('Product');
    const products = await collection.find({}).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching merchandise:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
