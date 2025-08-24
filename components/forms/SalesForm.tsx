// components/forms/SalesForm.tsx
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InventoryItem, SaleCreateInput } from "@/types";

const schema = z.object({
  inventoryId: z.string().min(1, "Please select an item."),
  quantity: z.number().int().positive("Quantity must be at least 1."),
});

type FormData = z.infer<typeof schema>;

export default function SalesForm({ onSuccess }: { onSuccess?: () => void }) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const inventoryId = watch("inventoryId");
  const quantity = watch("quantity") ?? 1;

  useEffect(() => {
    fetch("/api/inventory")
      .then((r) => r.json())
      // --- THIS IS THE FIX ---
      // Ensures that inventory is always an array to prevent crashes
      .then((data) => setInventory(Array.isArray(data) ? data : []));
  }, []);

  async function onSubmit(values: FormData) {
    const inv = inventory.find((i) => i.id === values.inventoryId);
    if (!inv) {
      alert("Invalid inventory item selected.");
      return;
    }
    if (inv.quantity < values.quantity) {
      alert("Not enough stock available.");
      return;
    }

    const totalPrice = inv.price * values.quantity;
    const payload = { ...values, totalPrice } as SaleCreateInput;

    const res = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      onSuccess?.();
      reset();
    } else {
      const json = await res.json();
      alert(json?.error ?? "Error processing sale.");
    }
  }

  const selectedItem = inventory.find((i) => i.id === inventoryId);
  const total = selectedItem
    ? selectedItem.price * (quantity > 0 ? quantity : 0)
    : 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Select Item</label>
        <select
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register("inventoryId")}
        >
          <option value="">-- Choose an item --</option>
          {inventory.map((i) => (
            <option key={i.id} value={i.id}>
              {i.company} {i.model} ({i.quantity} in stock)
            </option>
          ))}
        </select>
        {errors.inventoryId && (
          <p className="text-sm text-red-500">{errors.inventoryId.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Quantity</label>
        <input
          type="number"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register("quantity", { valueAsNumber: true })}
          defaultValue={1}
        />
        {errors.quantity && (
          <p className="text-sm text-red-500">{errors.quantity.message}</p>
        )}
      </div>

      <div className="p-3 rounded-md bg-secondary/10 text-center">
        <p className="text-sm font-medium">
          Total:{" "}
          <span className="font-bold text-lg">₹{total.toLocaleString()}</span>
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center w-full h-10 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {isSubmitting ? "Processing..." : "Process Sale"}
      </button>
    </form>
  );
}
