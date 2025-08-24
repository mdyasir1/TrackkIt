// app/dashboard/sales/page.tsx
"use client";
import { useEffect, useState } from "react";
import SalesForm from "@/components/forms/SalesForm";
import SalesTable from "@/components/SalesTable";
import { Sale } from "@/types";

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);

  async function load() {
    try {
      const res = await fetch("/api/sales");
      if (!res.ok) {
        // If the response is not OK, set sales to an empty array
        setSales([]);
        return;
      }
      const json = await res.json();
      // --- THIS IS THE FIX ---
      // Ensures that `sales` is always an array, even if the API returns something else
      setSales(Array.isArray(json) ? json : []);
    } catch (error) {
      console.error("Failed to fetch sales:", error);
      setSales([]); // Set to empty array on fetch error
    }
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
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-xl border bg-card text-card-foreground shadow p-6 h-fit">
          <h3 className="font-semibold mb-4">Create Sale</h3>
          <SalesForm onSuccess={load} />
        </div>
        <div className="lg:col-span-2 rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="font-semibold mb-4">Sales History</h3>
          <SalesTable sales={sales} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
