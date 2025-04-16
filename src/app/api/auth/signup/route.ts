import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the default role of USER
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "USER", // Default role
      },
    });

    return NextResponse.json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Error creating user", details: error }, { status: 500 });
  }
}
