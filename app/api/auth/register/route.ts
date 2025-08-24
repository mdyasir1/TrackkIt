import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { AuthRegisterInput } from "../../../../types";


export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AuthRegisterInput;
    const { storeName, email, password } = body;

    if (!storeName || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await prisma?.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma?.user.create({
      data: { storeName, email, password: hashed },
      select: { id: true, storeName: true, email: true, createdAt: true },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
