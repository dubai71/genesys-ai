export default function CentralPage() {
    return (
        <div className="space-y-4 animate-in">
            <h1 className="text-3xl font-bold tracking-tight">Central de Controle</h1>
            <p className="text-muted-foreground">Aguarde os agentes gerarem novos criativos para aprová-los aqui.</p>

            <div className="h-64 rounded-xl border border-dashed border-border flex items-center justify-center bg-surface">
                <span className="text-sm text-muted-foreground">Nenhum criativo pendente de aprovação no momento.</span>
            </div>
        </div>
    )
}
