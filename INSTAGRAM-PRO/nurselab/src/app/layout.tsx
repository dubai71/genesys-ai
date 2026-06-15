import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NurseLab — Content OS',
  description: 'Sistema de gestão de conteúdo para @enfermagemcom.ia',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-black text-[#EDDABA] font-body overflow-hidden h-screen">
        {children}
      </body>
    </html>
  )
}
