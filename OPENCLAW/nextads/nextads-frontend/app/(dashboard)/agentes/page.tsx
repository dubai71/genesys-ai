export default function AgentesPage() {
    return (
        <div className="space-y-4 animate-in">
            <h1 className="text-3xl font-bold tracking-tight">Agentes IA</h1>
            <p className="text-muted-foreground">Monitorando 4 instâncias de agentes autônomos.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {['Analista', 'Criativo', 'Otimizador', 'Scraper'].map((name) => (
                    <div key={name} className="p-5 border border-border rounded-xl bg-card">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-success ring-4 ring-success/20"></div>
                            <h3 className="font-semibold text-foreground">{name}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">Status: Operante<br />Última ação: Há 5 mins</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
