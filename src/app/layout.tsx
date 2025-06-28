import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NuqsProvider from "@/providers/NuqsProvider";
import { Toaster } from "@/components/ui/sonner";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SuperAdminSidebar } from "@/components/SuperAdminSidebar";
import "leaflet/dist/leaflet.css";
import { LocationProvider } from "@/providers/LocationProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediNow",
  description: "Your Trusted Pharmacy",
  referrer: "no-referrer",
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
        <NuqsProvider>
          <ReactQueryProvider>
            <NextAuthProvider>
              <SidebarProvider>
                <SuperAdminSidebar />
                <main className="flex flex-col w-screen ">
                  <LocationProvider>{children}</LocationProvider>
                </main>
              </SidebarProvider>
              <Toaster position="top-center" />
            </NextAuthProvider>
          </ReactQueryProvider>
        </NuqsProvider>
      </body>
    </html>
  );
}
