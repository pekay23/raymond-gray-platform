import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers"; // Keeps the clean wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raymond Gray | Integrated Facilities Management Solutions in Ghana",
  description: "Seamless soft and hard facility services for corporate, residential, and institutional clients.",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        {/* Navbar & Footer logic moved inside here */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
