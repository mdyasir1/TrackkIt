// components/forms/InventoryForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InventoryCreateInput } from "@/types";

const schema = z.object({
  company: z.string().min(1),
  model: z.string().min(1),
  quantity: z.number().int().nonnegative(),
  price: z.number().nonnegative(),
});

type FormData = z.infer<typeof schema>;

export default function InventoryForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    // setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { company: "", model: "", quantity: 1, price: 0 },
  });

  async function onSubmit(values: FormData) {
    const res = await fetch("/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values as InventoryCreateInput),
    });
    if (res.ok) {
      reset();
      onSuccess?.();
    } else {
      const json = await res.json();
      alert(json?.error ?? "Error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block mb-1">Company</label>
        <input className="w-full border px-3 py-2" {...register("company")} />
        {errors.company && (
          <p className="text-red-600">{errors.company.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Model</label>
        <input className="w-full border px-3 py-2" {...register("model")} />
        {errors.model && <p className="text-red-600">{errors.model.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            className="w-full border px-3 py-2"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && (
            <p className="text-red-600">{errors.quantity.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Price (INR)</label>
          <input
            type="number"
            className="w-full border px-3 py-2"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-600">{errors.price.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-slate-800 text-white rounded"
      >
        {isSubmitting ? "Adding..." : "Add to Inventory"}
      </button>
    </form>
  );
}
