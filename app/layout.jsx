import LenisWrapper from './components/LenisWrapper'
import './globals.css'

export const metadata = {
  title: 'Kunal | Portfolio',
  description: 'My modern portfolio built with Next.js',
  icons: {
  icon: '/icon.ico',
}

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans overflow-x-hidden">
        <LenisWrapper>
          {children}
        </LenisWrapper>
      </body>
    </html>
  )
}
