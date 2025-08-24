// components/forms/SalesForm.tsx
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InventoryItem, SaleCreateInput } from "@/types";

const schema = z.object({
  inventoryId: z.string().min(1),
  quantity: z.number().int().positive(),
});

type FormData = z.infer<typeof schema>;

export default function SalesForm({ onSuccess }: { onSuccess?: () => void }) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const inventoryId = watch("inventoryId");
  const quantity = watch("quantity") ?? 1;

  useEffect(() => {
    fetch("/api/inventory")
      .then((r) => r.json())
      .then(setInventory);
  }, []);

  async function onSubmit(values: FormData) {
    const inv = inventory.find((i) => i.id === values.inventoryId);
    if (!inv) {
      alert("Invalid inventory");
      return;
    }
    if (inv.quantity < values.quantity) {
      alert("Not enough stock");
      return;
    }

    const totalPrice = inv.price * values.quantity;

    const payload = {
      inventoryId: values.inventoryId,
      quantity: values.quantity,
      totalPrice,
    } as SaleCreateInput;

    const res = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      onSuccess?.();
    } else {
      const json = await res.json();
      alert(json?.error ?? "Error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block mb-1">Select Item</label>
        <select
          className="w-full border px-3 py-2"
          {...register("inventoryId")}
        >
          <option value="">-- choose --</option>
          {inventory.map((i) => (
            <option key={i.id} value={i.id}>
              {i.company} {i.model} — {i.quantity} in stock — ₹{i.price}
            </option>
          ))}
        </select>
        {errors.inventoryId && (
          <p className="text-red-600">{errors.inventoryId.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Quantity</label>
        <input
          type="number"
          className="w-full border px-3 py-2"
          {...register("quantity", { valueAsNumber: true })}
          defaultValue={1}
        />
        {errors.quantity && (
          <p className="text-red-600">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <p className="text-sm">
          Total: ₹
          {(() => {
            const inv = inventory.find((i) => i.id === inventoryId);
            return inv ? inv.price * (quantity ?? 0) : 0;
          })()}
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        {isSubmitting ? "Processing..." : "Process Sale"}
      </button>
    </form>
  );
}
