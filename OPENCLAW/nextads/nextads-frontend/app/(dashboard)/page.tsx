"use client";

import { MetricCard } from "@/components/MetricCard";
import {
    TrendingUp,
    Users,
    MousePointerClick,
    DollarSign
} from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Visão Geral</h1>
                    <p className="text-muted-foreground mt-1">
                        Aqui estão as métricas das suas campanhas autônomas gerenciadas pelos agentes.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="rounded-lg border-border bg-card px-4 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-accent">
                        <option>Últimos 7 dias</option>
                        <option>Últimos 30 dias</option>
                        <option>Este Mês</option>
                    </select>
                    <button className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white shadow-glow transition-all hover:bg-accent/90">
                        Exportar Relatório
                    </button>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Impressões"
                    value="1.2M"
                    trend={12.5}
                    icon={<Users className="h-5 w-5" />}
                />
                <MetricCard
                    title="Cliques Totais"
                    value="45.2K"
                    trend={8.2}
                    icon={<MousePointerClick className="h-5 w-5" />}
                />
                <MetricCard
                    title="Gasto Total"
                    value="R$ 12.450"
                    trend={-2.4}
                    icon={<DollarSign className="h-5 w-5" />}
                />
                <MetricCard
                    title="ROAS Médio"
                    value="4.8x"
                    trend={15.3}
                    icon={<TrendingUp className="h-5 w-5" />}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Desempenho de Conversões</h2>
                        <p className="text-sm text-muted-foreground">Cliques e Conversões ao longo do tempo</p>
                    </div>
                    <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-border bg-surface text-muted-foreground">
                        Gráfico de Linhas (Recharts placeholder)
                    </div>
                </div>

                <div className="col-span-3 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Atividades dos Agentes</h2>
                        <p className="text-sm text-muted-foreground">Ações automatizadas recentes</p>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
                                <div className="mt-0.5 h-2 w-2 rounded-full bg-success ring-4 ring-success/20" />
                                <div>
                                    <p className="text-sm font-medium">Agente de Otimização pausou Anúncio B</p>
                                    <p className="text-xs text-muted-foreground">CTR abaixo da meta estipulada (0.8%). Ajuste preventivo.</p>
                                    <span className="mt-1 block text-xs font-medium text-primary/60">Há {i * 10} minutos</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
