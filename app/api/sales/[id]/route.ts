// app/api/sales/[id]/route.ts
import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";

interface Params {
  params: { id: string };
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;

  const sale = await prisma.sale.findUnique({ where: { id } });
  if (!sale) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // revert inventory
  await prisma.inventory.update({
    where: { id: sale.inventoryId },
    data: { quantity: { increment: sale.quantity } },
  });

  await prisma.sale.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
