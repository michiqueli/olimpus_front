import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/Redux/provider";
import NavBar from "@/components/constants/navbar";
import Footer from "@/components/constants/footer";
import SessionAuthProvider from "../context/SessionAuthProvider";
import { CartProvider } from "@/context/CartContext";
import Cart from "@/components/cart/cart";

export const metadata: Metadata = {
  title: "Olimpus ",
  description: "Creado por Emprendedores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <SessionAuthProvider>
            <Providers>
              <NavBar />
              <div className="flex w-full">
              <div className="flex-col-2 w-[85%]">
                {children}
              </div>
              <Cart />
            </div>
              <Footer />
            </Providers>
          </SessionAuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
