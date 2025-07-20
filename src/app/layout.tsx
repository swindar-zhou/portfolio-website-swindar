import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { navData } from "@/data/data";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shivam Patel - Software Engineer",
  description: "A beautiful portfolio showcasing my work as a software engineer.",
    icons: {
    icon: "/favicon.ico",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar navItems={navData} />
          <Image
            src="/layout/background-ellipse2.svg"
            alt=""
            fill={false}
            width={0}
            height={0}
            className="z-1 blur-lg absolute max-w-5xl top-0 left-1/2 transform -translate-x-1/2 -translate-y-5/9 w-full pointer-events-none select-none"
            aria-hidden="true"
            priority
          />
          {children}
          <Footer />
          <Image
            src="/layout/background-ellipse2.svg"
            alt=""
            fill={false}
            width={1000} // Adjust width to fit your design
            height={900} // Adjust height to fit your design
            className="absolute bottom-0 blur-xl left-1/2 transform -translate-x-1/2 translate-y-2/3 w-auto z-0 pointer-events-none select-none"
            aria-hidden="true"
            priority
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
