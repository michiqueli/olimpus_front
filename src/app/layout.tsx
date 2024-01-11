import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/Redux/provider";
import NavBar from "@/components/constants/navbar";
import Footer from "@/components/constants/footer";
import SessionAuthProvider from "../context/SessionAuthProvider";
import { CartProvider } from "@/context/CartContext";

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
                {children}
              <Footer />
            </Providers>
        </SessionAuthProvider>
          </CartProvider>
      </body>
    </html>
  );
}
