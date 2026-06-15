"use client";

import { Search, Bell, User } from "lucide-react";

export function Header() {
    return (
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-border bg-card px-8 shadow-sm">
            <div className="flex flex-1 items-center">
                <div className="relative w-full max-w-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                        type="search"
                        placeholder="Buscar campanhas, criativos, assets..."
                        className="block w-full rounded-full border-0 bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-accent transition-all"
                    />
                </div>
            </div>
            <div className="flex items-center gap-6">
                <button className="relative text-muted-foreground hover:text-foreground transition-colors">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-danger ring-2 ring-card" />
                </button>
                <div className="flex items-center gap-3 border-l border-border pl-6">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-semibold">Admin</span>
                        <span className="text-xs text-muted-foreground">Premium User</span>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent ring-2 ring-accent/20">
                        <User className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </header>
    );
}
