// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-10rem)]">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
        Welcome to TrackKit
      </h1>
      <p className="max-w-[600px] text-foreground/80 md:text-xl mt-4 mb-8">
        The simple, modern solution for inventory and sales management for your
        small shop.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/login"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-secondary/10"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
