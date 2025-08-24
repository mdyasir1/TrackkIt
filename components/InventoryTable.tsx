// components/InventoryTable.tsx
"use client";
import { InventoryItem } from "@/types";

export default function InventoryTable({
  items,
  onDelete,
  onEdit,
}: {
  items: InventoryItem[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left">
            <th className="p-2">Company</th>
            <th className="p-2">Model</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Price (INR)</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => {
            const status =
              it.quantity === 0
                ? "Out of stock"
                : it.quantity < 5
                ? "Low stock"
                : "In stock";
            return (
              <tr key={it.id} className="border-t">
                <td className="p-2">{it.company}</td>
                <td className="p-2">{it.model}</td>
                <td className="p-2">{it.quantity}</td>
                <td className="p-2">₹{it.price}</td>
                <td className="p-2">{status}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => onEdit?.(it.id)}
                    className="px-2 py-1 border rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete?.(it.id)}
                    className="px-2 py-1 border rounded text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
