import { UploadCloud, Folder, Image as ImageIcon, Search } from "lucide-react";

export default function DAMPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Central de Mídia (DAM)</h1>
                    <p className="text-muted-foreground mt-1">
                        Gerencie todos os seus assets digitais (imagens, vídeos, áudios) utilizados pelos agentes.
                    </p>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white shadow-glow transition-all hover:bg-accent/90">
                    <UploadCloud className="h-5 w-5" />
                    Fazer Upload
                </button>
            </div>

            <div className="flex items-center gap-4 border-b border-border pb-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Buscar por tags, nomes ou descreva a imagem..."
                        className="w-full rounded-lg border-none bg-surface py-2 pl-9 pr-4 text-sm outline-none ring-1 ring-border focus:ring-2 focus:ring-accent"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="rounded-lg bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-border/50">Todos</button>
                    <button className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-surface">Imagens</button>
                    <button className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-surface">Vídeos</button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* Placeholders baseados nas cores premium */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-surface shadow-sm cursor-pointer">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground transition-transform group-hover:scale-110">
                            <ImageIcon className="h-12 w-12 opacity-20" />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                            <p className="text-sm font-medium text-white truncate">asset_criativo_{i}.png</p>
                            <p className="text-xs text-white/70">1.2 MB</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
