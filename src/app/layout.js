import { Poppins } from 'next/font/google' // Memuat font Google Poppins secara teroptimasi (Next.js)
import './globals.css' // Gaya global proyek
import Navbar from '@/components/Navbar' // Navbar global di semua halaman
import { CartProvider } from '@/context/CartContext'
import CartDrawer from '@/components/CartDrawer'
import FloatingButtons from '@/components/FloatingButtons'

// Inisialisasi font Poppins dan expose sebagai CSS variable agar mudah dipakai di seluruh app
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})


export const metadata = {
  title: 'NUMENTAI Dimsum | Dimsum Mentai Lumer Khas Semarang',
  description:
    'Numentai menyediakan dimsum mentai lumer premium siap pesan online via WhatsApp. Camilan creamy dan gurih untuk segala momen, langsung dari Semarang.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta property="og:title" content="NUMENTAI Dimsum" />
        <meta property="og:description" content="Dimsum mentai lumer premium, pesan mudah via WhatsApp." />
        <meta property="og:image" content="https://ikanoy.vercel.app/preview.jpg" />
        <meta property="og:url" content="https://ikanoy.vercel.app" />
        <meta property="og:type" content="website" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        {/* Terapkan variable font + smoothing */}
        <CartProvider>
          <Navbar /> {/* Navbar tampil di semua halaman */}
          <main className="fontpop">{children}</main> {/* Area konten halaman */}
          <CartDrawer />
          <FloatingButtons />
        </CartProvider>
      </body>
    </html>
  )
}
