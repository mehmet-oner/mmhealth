import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mmhealth — Healthy eating made effortless",
  description:
    "mmhealth is your mobile-first companion for personalized meal plans, mindful guidance, and a supportive nutrition community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-slate-50 font-sans antialiased"
      >
        {children}
      </body>
    </html>
  );
}
