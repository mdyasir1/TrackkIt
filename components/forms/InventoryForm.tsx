// components/forms/InventoryForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InventoryCreateInput } from "@/types";

const schema = z.object({
  company: z.string().min(1, "Company is required."),
  model: z.string().min(1, "Model is required."),
  quantity: z.number().int().nonnegative("Must be a positive number."),
  price: z.number().nonnegative("Must be a positive number."),
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Company</label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register("company")}
        />
        {errors.company && (
          <p className="text-sm text-red-500">{errors.company.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Model</label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register("model")}
        />
        {errors.model && (
          <p className="text-sm text-red-500">{errors.model.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Quantity</label>
          <input
            type="number"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && (
            <p className="text-sm text-red-500">{errors.quantity.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Price (INR)
          </label>
          <input
            type="number"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center w-full h-10 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add to Inventory"}
      </button>
    </form>
  );
}
