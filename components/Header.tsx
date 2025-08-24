// components/Header.tsx
"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-semibold">
          TrackKit
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/dashboard/inventory">Inventory</Link>
          <Link href="/dashboard/sales">Sales</Link>
          {session?.user?.email ? (
            <>
              <span className="px-2 py-1 text-sm border rounded">
                {session.user.storeName}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm px-3 py-1 border rounded"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-3 py-1 border rounded">
                Sign in
              </Link>
              <Link href="/register" className="px-3 py-1 border rounded">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
