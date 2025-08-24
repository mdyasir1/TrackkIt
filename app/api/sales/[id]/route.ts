import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { SaleCreateInput } from "@/types";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sales = await prisma.sale.findMany({
    where: { userId: session.user.id as string }, // Filter sales by user
    orderBy: { soldAt: "desc" },
    include: { inventory: true },
  });

  return NextResponse.json(sales);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as SaleCreateInput;
  const { inventoryId, quantity, totalPrice } = body;

  if (!inventoryId || !quantity || totalPrice === undefined) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Ensure inventory exists and belongs to this user
  const inv = await prisma.inventory.findUnique({
    where: { id: inventoryId, userId: session.user.id },
  });

  if (!inv)
    return NextResponse.json({ error: "Inventory not found" }, { status: 404 });
  if (inv.quantity < quantity)
    return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });

  const sale = await prisma.sale.create({
    data: {
      inventoryId,
      quantity,
      totalPrice,
      userId: session.user.id as string,
    },
    include: { inventory: true },
  });

  // Deduct stock for the same user
  await prisma.inventory.update({
    where: { id: inventoryId, userId: session.user.id },
    data: { quantity: { decrement: quantity } },
  });

  return NextResponse.json(sale, { status: 201 });
}
