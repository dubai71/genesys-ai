import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: 'NextAds — Gestão Autônoma de Anúncios com IA',
    description: 'Plataforma agentic de gestão de tráfego e criação autônoma de criativos. Operate 24/7.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans bg-surface text-foreground antialiased`}>
                <ReactQueryProvider>
                    {children}
                </ReactQueryProvider>
            </body>
        </html>
    )
}
