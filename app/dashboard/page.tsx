// app/dashboard/page.tsx
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export const revalidate = 0;

export default async function DashboardPage() {
  // server component to fetch metrics
  const totalItems = await prisma.inventory.count();
  const lowStock = await prisma.inventory.count({
    where: { quantity: { lt: 5 } },
  });
  const totalRevenueAgg = await prisma.sale.aggregate({
    _sum: { totalPrice: true },
  });
  const totalRevenue = totalRevenueAgg._sum.totalPrice ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Inventory Items</div>
          <div className="text-2xl font-bold">{totalItems}</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Low Stock Alerts</div>
          <div className="text-2xl font-bold">{lowStock}</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold">₹{Math.round(totalRevenue)}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Recent Inventory</h2>
          {/* display few items */}
          {/* server fetch */}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Recent Sales</h2>
          {/* server fetch */}
        </div>
      </div>
    </div>
  );
}
