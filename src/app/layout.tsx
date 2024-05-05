import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner"
import { authOptions } from "@/lib/authOptions";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Horsepower Cartel",
  description: "Experience Luxury,Your Way",
  creator:'Piyush Saini',
  
  // images: [
  //   {
  //     url: 'https://res.cloudinary.com/dzow59kgu/image/upload/v1711790592/Screenshot_344_y40cim.png' ,
  //     width: 1200,
  //     height: 630,
  //     alt: "Horsepower Cartel Experience Luxury,Your Way",
  //   },
  // ],
  icons:[
    {
      url:'/homepage.png',
      href:'/homepage.png'
    }
  ],
  keywords: [
    'Luxury Car Dealership',
    'Buy Premium Cars',
    'Luxury Dealership',
    'Horsepower cartel',
    'Buy Cars',
  ]
};

export default async function RootLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session} >
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
