// app/dashboard/page.tsx
import { prisma } from "@/lib/prisma";
import { Package, AlertTriangle, IndianRupee } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Import from lib/auth where authOptions is properly exported
import { redirect } from "next/navigation";

export const revalidate = 0;

const MetricCard = ({
  title,
  value,
  icon,
  note,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  note: string;
}) => (
  <div className="rounded-xl border bg-card text-card-foreground shadow">
    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 className="tracking-tight text-sm font-medium">{title}</h3>
      <div className="h-4 w-4 text-muted-foreground">{icon}</div>
    </div>
    <div className="p-6 pt-0">
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{note}</p>
    </div>
  </div>
);

export default async function DashboardPage() {
  // --- FIX START ---
  // 1. Get the current user's session
  const session = await getServerSession(authOptions);

  // 2. If no user is logged in, send them to the login page
  if (!session?.user?.id) {
    redirect("/login");
  }
  const userId = session.user.id;

  // 3. Add a `where` clause to every Prisma query to filter by the user's ID
  const totalItems = await prisma.inventory.count({
    where: { userId: userId },
  });

  const lowStock = await prisma.inventory.count({
    where: {
      userId: userId,
      quantity: { lt: 5 },
    },
  });

  const totalRevenueAgg = await prisma.sale.aggregate({
    _sum: { totalPrice: true },
    where: { userId: userId },
  });
  // --- FIX END ---

  const totalRevenue = totalRevenueAgg._sum.totalPrice ?? 0;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Inventory Items"
          value={totalItems}
          icon={<Package />}
          note="All unique products"
        />
        <MetricCard
          title="Low Stock Alerts"
          value={lowStock}
          icon={<AlertTriangle />}
          note="Items with quantity < 5"
        />
        <MetricCard
          title="Total Revenue"
          value={`₹${Math.round(totalRevenue).toLocaleString()}`}
          icon={<IndianRupee />}
          note="Gross revenue from sales"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h2 className="font-semibold mb-4">Recent Inventory</h2>
          <div className="text-center text-foreground/60 py-8">
            Component to display recent items coming soon.
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h2 className="font-semibold mb-4">Recent Sales</h2>
          <div className="text-center text-foreground/60 py-8">
            Component to display recent sales coming soon.
          </div>
        </div>
      </div>
    </div>
  );
}
