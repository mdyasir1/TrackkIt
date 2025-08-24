// components/Header.tsx
"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Package2, Menu, X } from "lucide-react"; // npm install lucide-react

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className="text-foreground/60 transition-colors hover:text-foreground/80"
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          href={session ? "/dashboard" : "/"}
          className="mr-6 flex items-center space-x-2"
        >
          <Package2 className="h-6 w-6 text-primary" />
          <span className="font-bold">TrackKit</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {session?.user ? (
            <>
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/dashboard/inventory">Inventory</NavLink>
              <NavLink href="/dashboard/sales">Sales</NavLink>
            </>
          ) : null}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden items-center space-x-2 md:flex">
            {session?.user ? (
              <>
                <span className="px-3 py-1.5 text-sm font-medium border rounded-md bg-secondary/10">
                  {session.user.storeName}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary/10"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 p-4">
            {session?.user ? (
              <>
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/dashboard/inventory">Inventory</NavLink>
                <NavLink href="/dashboard/sales">Sales</NavLink>
                <hr className="border-border/40" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {session.user.storeName}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary/10"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
