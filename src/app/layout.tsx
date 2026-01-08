import { LanguageProvider } from "@/lib/i18n";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/components/WalletContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkOnSol | Solana Link in Bio",
  description: "The minimalist, privacy-focused portfolio builder for Solana.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletContextProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
