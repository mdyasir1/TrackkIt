// app/(auth)/login/page.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormData) {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="max-w-md mx-auto py-20">
      <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block mb-1">Email</label>
          <input className="w-full border px-3 py-2" {...register("email")} />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
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
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="px-4 py-2 bg-slate-800 text-white rounded"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <div className="mt-4">
        <a href="/forgot-password" className="text-sm text-blue-600">
          Forgot password?
        </a>
      </div>
    </div>
  );
}
