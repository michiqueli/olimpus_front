import type { Metadata } from 'next'
import './globals.css'
import { Providers } from "@/Redux/provider";

export const metadata: Metadata = {
  title: 'Olimpus ',
  description: 'Creado por Emprendedores',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <Providers>{children}</Providers>       
        </body>
    </html>
  )
}