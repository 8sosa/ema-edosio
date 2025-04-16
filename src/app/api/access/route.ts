import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/prisma';

// The POST method handler
export const POST = async (req: NextRequest) => {
  // Extract token from request cookies using getToken
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if the token exists and if the user email is available
  if (!token || !token.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { email, masterclassId, grantAccess } = await req.json();

  if (!email || !masterclassId || grantAccess !== true) {
    return NextResponse.json({ message: 'Missing required data' }, { status: 400 });
  }

  try {
    // No need to create or convert an ObjectId if masterclassId is already the correct type
    // Just use the masterclassId as it is

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Grant lifetime access by creating/updating the MasterclassAccess record
    await prisma.masterclassAccess.upsert({
      where: {
        userId_masterclassId: {
          userId: user.id,
          masterclassId: masterclassId, // Directly use the masterclassId (assumed to be a string or ObjectId)
        },
      },
      update: {
        purchasedAt: new Date(),
        expiresAt: null,  // Lifetime access
      },
      create: {
        userId: user.id,
        masterclassId: masterclassId, // Directly use the masterclassId
        purchasedAt: new Date(),
        expiresAt: null, // Lifetime access
      },
    });

    return NextResponse.json({ message: 'Access granted' });
  } catch (error) {
    console.error('Error granting access', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
};
