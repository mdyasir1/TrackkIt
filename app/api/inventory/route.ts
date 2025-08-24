// app/api/inventory/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { InventoryCreateInput } from "@/types";

export async function GET() {
  const items = await prisma.inventory.findMany({
    include: { category: true },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as InventoryCreateInput;
  const { company, model, categoryId = null, quantity, price } = body;

  if (!company || !model || quantity === undefined || price === undefined) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const item = await prisma.inventory.create({
    data: {
      company,
      model,
      categoryId,
      quantity,
      price,
      userId: session.user.id as string,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
