// components/forms/AuthForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { AuthRegisterInput } from "@/types";
import { useState } from "react";

const schema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type FormData = z.infer<typeof schema>;

export default function AuthForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormData) {
    setApiError(null);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values as AuthRegisterInput),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const json = await res.json();
      setApiError(json?.error ?? "Register failed");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {apiError && (
        <p className="text-sm text-red-500 text-center">{apiError}</p>
      )}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none" htmlFor="storeName">
          Store Name
        </label>
        <input
          id="storeName"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register("storeName")}
        />
        {errors.storeName && (
          <p className="text-sm text-red-500">{errors.storeName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center w-full h-10 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
