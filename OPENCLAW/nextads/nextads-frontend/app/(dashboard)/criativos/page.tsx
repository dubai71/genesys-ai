import { Plus, Filter, Play, Pause, BarChart2 } from "lucide-react";

export default function CriativosPage() {
    const criativos = [
        { id: 1, name: "Campanha Black Friday - Imagem 1", status: "active", ctr: "3.2%", spend: "R$ 450", roas: "5.4x" },
        { id: 2, name: "Retargeting Carrinho Abandonado", status: "active", ctr: "4.8%", spend: "R$ 210", roas: "8.1x" },
        { id: 3, name: "Campanha Institucional Video A", status: "paused", ctr: "0.9%", spend: "R$ 890", roas: "1.2x" },
        { id: 4, name: "Lookalike Audiences - Teste B", status: "pending", ctr: "-", spend: "R$ 0", roas: "-" },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gestão de Criativos</h1>
                    <p className="text-muted-foreground mt-1">
                        Veja a performance de cada anúncio gerado pelos agentes.
                    </p>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white shadow-glow transition-all hover:bg-accent/90">
                    <Plus className="h-5 w-5" />
                    Novo Teste A/B
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="flex items-center justify-between border-b border-border bg-surface/50 p-4">
                    <div className="flex gap-4">
                        <button className="text-sm font-medium text-primary">Todos os Criativos</button>
                        <button className="text-sm font-medium text-muted-foreground hover:text-primary">Ativos (2)</button>
                        <button className="text-sm font-medium text-muted-foreground hover:text-primary">Pausados (1)</button>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
                        <Filter className="h-4 w-4" /> Filtros
                    </button>
                </div>

                <div className="divide-y divide-border">
                    {criativos.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 transition-colors hover:bg-surface/50 cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-lg bg-surface flex items-center justify-center border border-border">
                                    <span className="text-xs font-bold text-muted-foreground">AD</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">{item.name}</h4>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span className={`status-badge ${item.status === 'active' ? 'status-active' :
                                                item.status === 'paused' ? 'status-paused' : 'status-pending'
                                            }`}>
                                            {item.status === 'active' ? 'Ativo' : item.status === 'paused' ? 'Pausado' : 'Pendente'}
                                        </span>
                                        <span className="text-xs text-muted-foreground">Última atualização: há 2 horas</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 text-sm">
                                <div className="text-right">
                                    <p className="text-muted-foreground">CTR</p>
                                    <p className="font-semibold text-foreground">{item.ctr}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-muted-foreground">Gasto</p>
                                    <p className="font-semibold text-foreground">{item.spend}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-muted-foreground">ROAS</p>
                                    <p className="font-semibold text-foreground text-success">{item.roas}</p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button className="rounded-md p-2 text-muted-foreground hover:bg-surface hover:text-primary flex items-center justify-center">
                                        {item.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                    </button>
                                    <button className="rounded-md p-2 text-muted-foreground hover:bg-surface hover:text-primary flex items-center justify-center">
                                        <BarChart2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
