'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard, Sparkles, Zap, FolderOpen,
    Image as ImageIcon, BarChart3, Settings, LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/feed-inspiracao', label: 'Feed de Inspiração', icon: Sparkles },
    { href: '/central-controle', label: 'Central de Controle', icon: Zap },
    { href: '/dam', label: 'DAM — Ativos', icon: FolderOpen },
    { href: '/criativos', label: 'Criativos', icon: ImageIcon },
    { href: '/agentes', label: 'Agentes IA', icon: BarChart3 },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-primary flex flex-col h-screen shrink-0">
            {/* Logo */}
            <div className="px-6 py-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-glow">
                        <Zap size={16} className="text-white" />
                    </div>
                    <div>
                        <span className="font-bold text-white text-lg tracking-tight">NextAds</span>
                        <div className="text-xs text-white/40 -mt-0.5">Powered by AI Agents</div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map(({ href, label, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className={cn('nav-item', pathname === href && 'active')}
                    >
                        <Icon size={18} />
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t border-white/10 space-y-1">
                <button className="nav-item w-full text-left">
                    <Settings size={18} />
                    <span>Configurações</span>
                </button>
                <button className="nav-item w-full text-left text-danger/80 hover:text-danger">
                    <LogOut size={18} />
                    <span>Sair</span>
                </button>
            </div>
        </aside>
    )
}
