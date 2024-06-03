'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { usePathname } from "next/navigation";
import HeadLinks from "./components/headlinks/headlinks";
import { useEffect, useState } from "react";
import Loading from "./components/loading/loading";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const pathname = usePathname()
  const pageNotNavbar = pathname === '/login' || pathname === '/sign-up' || pathname === '/dashboard' || pathname === '/dashboard/add-employed' || pathname === '/dashboard/add-product' || pathname === '/dashboard/add-offer' || pathname === '/dashboard/add-product' || pathname === '/dashboard/add-offer' || pathname === '/dashboard/add-product' || pathname === '/fashion' || pathname === '/toys' || pathname === '/sports' || pathname === '/hogar' || pathname === '/electronic'
  const pageNotFooter = pathname === '/dashboard' 
  
  return (
    <html lang="en">
      <HeadLinks />
      <body className={inter.className}>
        {
          loading ? (
            <Loading />
          ) : (
            <>
              {!pageNotNavbar && <Navbar />}
              {children}
              {!pageNotFooter && <Footer />}
            </>
          )
        }
      </body>
    </html>
  );
}
