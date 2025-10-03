import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { NavigationBar } from "@/components/navigation/NavigationBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mmhealth",
  description: "Mobile-first healthy eating companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-neutral-800 antialiased`}
      >
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
