"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Image as ImageIcon,
    PlaySquare,
    BarChart3,
    Settings,
    Bot,
    LogOut
} from "lucide-react";

const navigation = [
    { name: "Início", href: "/", icon: LayoutDashboard },
    { name: "Feed Inspiração", href: "/feed", icon: PlaySquare },
    { name: "Central de Mídia", href: "/dam", icon: ImageIcon },
    { name: "Criativos", href: "/criativos", icon: BarChart3 },
    { name: "Agentes AIOS", href: "/agentes", icon: Bot },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col bg-primary text-primary-foreground shadow-2xl">
            <div className="flex h-20 shrink-0 items-center justify-center border-b border-primary-foreground/10 px-6">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-bold shadow-glow">
                        NA
                    </div>
                    <span className="text-xl font-bold tracking-tight">NextAds.</span>
                </div>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto px-4 py-8 custom-scrollbar">
                <nav className="flex-1 space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href !== '/' ? item.href : '/___impossible');
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                                        ? "bg-accent text-white shadow-glow"
                                        : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-white"
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-primary-foreground/50 group-hover:text-white"}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t border-primary-foreground/10 p-4">
                <Link
                    href="/settings"
                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-primary-foreground/70 transition-all hover:bg-primary-foreground/10 hover:text-white"
                >
                    <Settings className="h-5 w-5 text-primary-foreground/50 group-hover:text-white" />
                    Configurações
                </Link>
                <button className="group mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-danger transition-all hover:bg-danger/10">
                    <LogOut className="h-5 w-5" />
                    Sair
                </button>
            </div>
        </div>
    );
}
