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
    setItems(json);
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
    <div>
      <h1 className="text-2xl font-semibold mb-4">Inventory</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-3">Add Item</h3>
          <InventoryForm onSuccess={load} />
        </div>

        <div className="bg-white p-4 rounded shadow col-span-1">
          <h3 className="font-medium mb-3">All Items</h3>
          <InventoryTable items={items} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
