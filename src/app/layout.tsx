import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DocChat",
  description: "Chat with your uploaded documents",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
