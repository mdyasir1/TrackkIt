// app/(auth)/register/page.tsx
"use client";
import AuthForm from "@/components/forms/AuthForm";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Create Your Store</h1>
          <p className="text-foreground/60">
            Enter your details to get started
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
