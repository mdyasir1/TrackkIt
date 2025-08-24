// app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "./providers";


export const metadata = {
  title: "TrackKit",
  description: "Inventory & Sales management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        <Providers>
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
