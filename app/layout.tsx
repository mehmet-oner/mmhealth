import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { NavigationBar } from "@/components/navigation/NavigationBar";

export const metadata: Metadata = {
  title: "mmhealth",
  description: "Your healthy eating companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-800 antialiased">
        <AuthProvider>
          <NavigationBar />
          <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-10 sm:px-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
