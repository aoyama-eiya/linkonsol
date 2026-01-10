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
  title: "LinkOn Sol",
  description: "Privacy-first, serverless Web3 Link in Bio on Solana.",
  metadataBase: new URL("https://linkon-sol.pages.dev"),
  openGraph: {
    title: "LinkOn Sol",
    description: "Privacy-first, serverless Web3 Link in Bio on Solana.",
    url: "https://linkon-sol.pages.dev",
    siteName: "LinkOn Sol",
    locale: "en_US",
    type: "website",
    images: ["/ogp.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkOn Sol",
    description: "Privacy-first, serverless Web3 Link in Bio on Solana.",
    images: ["/ogp.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
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
