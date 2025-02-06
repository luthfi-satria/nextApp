import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyApp dashboard",
  description: "Powered by NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <PageHeader/>
          <div className="mt-14 min-h-max">
            <div className="mycontainer">
              {children}
            </div>
          </div>
          <PageFooter />
      </body>
    </html>
  );
}
