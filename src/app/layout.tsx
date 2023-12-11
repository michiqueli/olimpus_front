import type { Metadata } from 'next'
import './globals.css'
import { Provider } from 'react-redux'
import store from "../Redux/store"

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
        <Provider store={store}>
           {children}
        </Provider>
       
        </body>
    </html>
  )
}