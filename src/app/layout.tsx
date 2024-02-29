import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import { ThemeProvider } from "./components/ThemeProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rent-A-Ride",
  description: "Rent a ride",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session} >
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
