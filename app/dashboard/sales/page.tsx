// app/dashboard/sales/page.tsx
"use client";
import { useEffect, useState } from "react";
import SalesForm from "@/components/forms/SalesForm";
import SalesTable from "@/components/SalesTable";
import { Sale } from "@/types";

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);

  async function load() {
    const res = await fetch("/api/sales");
    const json = await res.json();
    setSales(json);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete sale and revert stock?")) return;
    await fetch(`/api/sales/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Sales</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-3">Create Sale</h3>
          <SalesForm onSuccess={load} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-3">Sales History</h3>
          <SalesTable sales={sales} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
