import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test Dark Mode",
  description: "Testing Tailwind setup",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
