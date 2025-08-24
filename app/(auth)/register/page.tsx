// app/(auth)/register/page.tsx
'use client'

import dynamic from "next/dynamic";
const AuthForm = dynamic(() => import("@/components/forms/AuthForm"), {
  ssr: false,
});

export default function RegisterPage() {
  return (
    <div className="max-w-2xl mx-auto py-16">
      <h2 className="text-2xl font-semibold mb-4">Create your store</h2>
      <AuthForm />
    </div>
  );
}
