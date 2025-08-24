// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to TrackKit</h1>
      <p className="mb-6">Simple inventory & sales MVP for small shops.</p>
      <div className="space-x-3">
        <Link href="/login" className="px-4 py-2 border rounded">
          Sign in
        </Link>
        <Link href="/register" className="px-4 py-2 border rounded">
          Register
        </Link>
      </div>
    </div>
  );
}
