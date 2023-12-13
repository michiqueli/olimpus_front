import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/Redux/provider";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import SessionAuthProvider from "./context/SessionAuthProvider";

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
        <SessionAuthProvider>
          <Providers>
            <NavBar />
            {children}
            <Footer />
          </Providers>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
