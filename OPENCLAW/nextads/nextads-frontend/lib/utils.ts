import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function formatNumber(value: number): string {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
    return value.toString()
}

export function formatPercent(value: number): string {
    return `${value.toFixed(2)}%`
}

export function getStatusClass(status: string): string {
    const map: Record<string, string> = {
        active: 'status-active',
        paused: 'status-paused',
        pending: 'status-pending',
        ready: 'status-ready',
        queued: 'status-pending',
        processing: 'status-pending',
        done: 'status-active',
        failed: 'status-paused',
    }
    return map[status] ?? 'status-pending'
}
