import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { WatchlistProvider } from "@/components/WatchlistProvider";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WatchYou — Stream Movies & Series",
    template: "%s | WatchYou",
  },
  description:
    "Discover and stream your favorite movies and TV series. A premium streaming experience crafted with elegance. Built by Crafyne.",
  keywords: ["streaming", "movies", "series", "watchyou", "entertainment", "crafyne"],
  authors: [{ name: "Crafyne", url: "https://crafyne.com" }],
  creator: "Crafyne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <ToastProvider>
          <WatchlistProvider>{children}</WatchlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
