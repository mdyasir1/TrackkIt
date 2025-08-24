import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { InventoryUpdateInput } from "@/types";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  const item = await prisma.inventory.findUnique({
    where: { id, userId: session.user.id },
    include: { category: true },
  });

  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  const body = (await req.json()) as InventoryUpdateInput;

  const updated = await prisma.inventory.updateMany({
    where: { id, userId: session.user.id }, // Ensure only the owner can update
    data: body,
  });

  if (updated.count === 0)
    return NextResponse.json(
      { error: "Not found or unauthorized" },
      { status: 404 }
    );

  return NextResponse.json({ success: true });
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;

  // Delete sales only for the same user's inventory
  //   const deletedSales = await prisma.sale.deleteMany({
  //     where: { inventoryId: id, userId: session.user.id },
  //   });

  const deletedInventory = await prisma.inventory.deleteMany({
    where: { id, userId: session.user.id },
  });

  if (deletedInventory.count === 0)
    return NextResponse.json(
      { error: "Not found or unauthorized" },
      { status: 404 }
    );

  return NextResponse.json({ success: true });
}
