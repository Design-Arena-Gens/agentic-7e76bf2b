import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instagram Auto-Reply Bot | بوت الرد الآلي على انستغرام",
  description: "Automatically reply to Instagram messages | رد تلقائي على رسائل انستغرام",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
