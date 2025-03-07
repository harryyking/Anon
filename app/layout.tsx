import type { Metadata } from "next";
import { Fredoka} from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider";
import { getSEOTags } from "@/lib/seo";

const brandFont = Fredoka({subsets: ["latin"]})

export const metadata = getSEOTags({
  twitter: {},
  openGraph: {},
  keywords: [],
  
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="fantasy">
      <Provider>
      <body
        className={brandFont.className}
      >
      <div className="bg-base-100">
        {children}
      </div>
        </body>
      </Provider>
    </html>
  );
}
