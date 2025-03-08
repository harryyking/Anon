import type { Metadata } from "next";
import { Fredoka} from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider";
import { getSEOTags } from "@/lib/seo";

const brandFont = Fredoka({subsets: ["latin"]})

export const metadata = getSEOTags({
  twitter: {

    images: "https://utfs.io/f/Bilqtug6OUkPgpeLcXEJxDfltwLnUvjW3O1TGVH8k94ac5mz"
  },
    openGraph: {
      title: "Tell me how you feel, send me an anonymous message",
      description: "Fun tool to send anonymous feedback—try it now!",
      images: [
        {
          url: "https://utfs.io/f/Bilqtug6OUkPgpeLcXEJxDfltwLnUvjW3O1TGVH8k94ac5mz",
          width: 40,
          height: 40,
          alt: "Reflect Logo",
        },
      ],
    },
  keywords: ["anonymous messaging", "personality ratings", "feedback tool", "social interaction", "self-evaluation"],
  
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
