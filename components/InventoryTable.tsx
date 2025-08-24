// components/InventoryTable.tsx
"use client";
import { InventoryItem } from "@/types";
import { Edit, Trash2 } from "lucide-react";

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
  if (status === "Out of stock") {
    return (
      <div
        className={`${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300`}
      >
        Out of stock
      </div>
    );
  }
  if (status === "Low stock") {
    return (
      <div
        className={`${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300`}
      >
        Low stock
      </div>
    );
  }
  return (
    <div
      className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300`}
    >
      In stock
    </div>
  );
};

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
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Company
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Model
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Qty
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Price
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Status
            </th>
            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {items.map((it) => {
            const status =
              it.quantity === 0
                ? "Out of stock"
                : it.quantity < 5
                ? "Low stock"
                : "In stock";
            return (
              <tr
                key={it.id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <td className="p-4 align-middle font-medium">{it.company}</td>
                <td className="p-4 align-middle text-muted-foreground">
                  {it.model}
                </td>
                <td className="p-4 align-middle">{it.quantity}</td>
                <td className="p-4 align-middle">
                  ₹{it.price.toLocaleString()}
                </td>
                <td className="p-4 align-middle">
                  <StatusBadge status={status} />
                </td>
                <td className="p-4 align-middle text-right space-x-2">
                  <button
                    onClick={() => onEdit?.(it.id)}
                    className="p-2 rounded-md hover:bg-secondary/10"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete?.(it.id)}
                    className="p-2 rounded-md hover:bg-red-500/10 text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
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
