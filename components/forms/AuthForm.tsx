// components/forms/AuthForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { AuthRegisterInput } from "@/types";

const schema = z.object({
  storeName: z.string().min(2, "Store name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password min 6 chars"),
});

type FormData = z.infer<typeof schema>;

export default function AuthForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormData) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values as AuthRegisterInput),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const json = await res.json();
      alert(json?.error ?? "Register failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4"
    >
      <div>
        <label className="block mb-1">Store Name</label>
        <input className="w-full border px-3 py-2" {...register("storeName")} />
        {errors.storeName && (
          <p className="text-red-600 text-sm">{errors.storeName.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-slate-800 text-white rounded"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
