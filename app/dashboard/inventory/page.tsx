// app/dashboard/inventory/page.tsx
"use client";
import { useEffect, useState } from "react";
import InventoryForm from "@/components/forms/InventoryForm";
import InventoryTable from "@/components/InventoryTable";
import { InventoryItem } from "@/types";

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);

  async function load() {
    const res = await fetch("/api/inventory");
    const json = await res.json();
    // --- THIS IS THE FIX ---
    // Ensures that `items` is always an array
    setItems(Array.isArray(json) ? json : []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete item?")) return;
    await fetch(`/api/inventory/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-xl border bg-card text-card-foreground shadow p-6 h-fit">
          <h3 className="font-semibold mb-4">Add Item</h3>
          <InventoryForm onSuccess={load} />
        </div>
        <div className="lg:col-span-2 rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="font-semibold mb-4">All Items</h3>
          <InventoryTable items={items} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
