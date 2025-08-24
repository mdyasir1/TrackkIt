import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { AuthRegisterInput } from "../../../../types";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AuthRegisterInput;
    const { storeName, email, password } = body;

    if (!storeName || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    // --- THIS IS THE FIX ---
    // This now correctly saves `storeName` as a string, matching your schema.
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        storeName: storeName, // Correctly assigns the storeName string
      },
      select: { id: true, email: true, createdAt: true, storeName: true },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (err) {
    console.error("REGISTRATION_ERROR", err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 409 }
        );
      }
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
