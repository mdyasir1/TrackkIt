// components/SalesTable.tsx
"use client";
import { Sale } from "@/types";
import { format } from "date-fns";

export default function SalesTable({
  sales,
  onDelete,
}: {
  sales: Sale[];
  onDelete?: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left">
            <th className="p-2">Item</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Total (INR)</th>
            <th className="p-2">Sold At</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">
                {s.inventory
                  ? `${s.inventory.company} ${s.inventory.model}`
                  : s.inventoryId}
              </td>
              <td className="p-2">{s.quantity}</td>
              <td className="p-2">₹{s.totalPrice}</td>
              <td className="p-2">
                {format(new Date(s.soldAt), "yyyy-MM-dd HH:mm")}
              </td>
              <td className="p-2">
                <button
                  onClick={() => onDelete?.(s.id)}
                  className="px-2 py-1 border rounded text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
