export default function FeedPage() {
    return (
        <div className="space-y-4 animate-in">
            <h1 className="text-3xl font-bold tracking-tight">Feed de Inspiração</h1>
            <p className="text-muted-foreground">O agente <strong>Scraper</strong> ainda não buscou novas referências nas redes sociais (banco de dados offline).</p>

            <div className="h-64 rounded-xl border border-dashed border-border flex items-center justify-center bg-surface">
                <span className="text-sm text-muted-foreground">Em breve: Grid de anúncios com melhor performance do mercado</span>
            </div>
        </div>
    )
}
