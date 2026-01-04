import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RentalPro - Car Rental Management System",
    template: "%s | RentalPro"
  },
  description: "AI-powered car rental management platform with intelligent automation and real-time analytics",
  keywords: ["car rental", "rental management", "AI automation", "vehicle management", "fleet management"],
  authors: [{ name: "RentalPro Team" }],
  creator: "RentalPro",
  publisher: "RentalPro",
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'RentalPro - Car Rental Management System',
    description: 'AI-powered car rental management platform with intelligent automation and real-time analytics',
    siteName: 'RentalPro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RentalPro - Car Rental Management System',
    description: 'AI-powered car rental management platform with intelligent automation and real-time analytics',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
