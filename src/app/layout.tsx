import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/Redux/provider";
import Footer from "./components/footer";
import NavBar from "./components/navbar";

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
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
