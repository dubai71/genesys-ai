import React from 'react';
import { ArrowLeft, Eraser, Search, QrCode, Plus, ShoppingCart, Percent, ArrowRight, ChevronUp } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Screen } from '../types';

interface SalesProps {
  setScreen: (screen: Screen) => void;
}

const Sales: React.FC<SalesProps> = ({ setScreen }) => {
  return (
    <div className="flex flex-col h-full bg-background-dark relative overflow-hidden min-h-screen">
       {/* Background */}
       <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] pointer-events-none z-0"></div>
       <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[100px] pointer-events-none z-0"></div>

       {/* Top Bar */}
       <div className="relative z-10 flex items-center justify-between p-4 pt-12 pb-4 glass-panel border-b-0 rounded-b-xl">
         <button onClick={() => setScreen('dashboard')} className="text-white/80 hover:text-white flex w-10 h-10 items-center justify-center rounded-full glass-card">
            <ArrowLeft className="w-5 h-5" />
         </button>
         <div className="flex flex-col items-center">
            <h2 className="text-white text-lg font-bold leading-tight">Nova Venda</h2>
            <span className="text-xs text-white/50 font-medium">Caixa #04 • João S.</span>
         </div>
         <button className="text-white/80 hover:text-white flex w-10 h-10 items-center justify-center rounded-full glass-card">
            <Eraser className="w-5 h-5" />
         </button>
       </div>

       {/* Content */}
       <main className="relative z-10 flex-1 flex flex-col overflow-hidden w-full max-w-md mx-auto">
         {/* Search */}
         <div className="px-4 py-4 shrink-0">
            <div className="flex w-full items-center rounded-xl glass-card h-12 overflow-hidden px-4 gap-3 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                <Search className="text-white/50 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Buscar produto..."
                    className="flex-1 bg-transparent border-none text-white placeholder:text-white/40 focus:ring-0 text-sm font-medium h-full p-0 outline-none"
                />
                <button className="text-primary">
                    <QrCode className="w-5 h-5" />
                </button>
            </div>
         </div>

         {/* Categories */}
         <div className="w-full overflow-x-auto hide-scrollbar px-4 pb-2 shrink-0 flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold whitespace-nowrap shadow-glow">Todos</button>
            {['Essências', 'Carvões', 'Sedas', 'Acessórios'].map(c => (
                <button key={c} className="px-4 py-2 rounded-lg glass-card text-white/70 text-xs font-medium whitespace-nowrap hover:bg-white/5">{c}</button>
            ))}
         </div>

         {/* Grid */}
         <div className="flex-1 overflow-y-auto hide-scrollbar pb-64">
            <div className="px-4 pt-2">
                <h3 className="text-white/90 text-sm font-bold mb-3 pl-1">Populares</h3>
                <div className="grid grid-cols-2 gap-3">
                    {PRODUCTS.map(product => (
                        <div key={product.id} className="glass-card rounded-xl p-3 flex flex-col gap-3 relative overflow-hidden group">
                             <div className="aspect-square rounded-lg bg-black/20 w-full relative overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white border border-white/10">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                                </div>
                             </div>
                             <div className="flex flex-col gap-1">
                                <p className="text-white text-sm font-semibold leading-tight truncate">{product.name}</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-white/50 text-xs">Estoque: {product.stock}</p>
                                    <button className="w-7 h-7 rounded-full bg-white/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-white">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
         </div>
       </main>

       {/* Checkout Sheet */}
       <div className="fixed bottom-0 left-0 w-full z-40 flex flex-col justify-end">
         <div className="w-full h-24 bg-gradient-to-t from-background-dark via-background-dark/90 to-transparent pointer-events-none absolute bottom-[180px]"></div>
         <div className="w-full glass-panel border-b-0 rounded-t-2xl p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col gap-4 relative bg-[#131022]/95 backdrop-blur-xl mb-[80px]">
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-1"></div>
            
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                            <ShoppingCart className="w-5 h-5" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border border-[#131022]">3</div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-white/60">Itens selecionados</span>
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">Ver lista de produtos</span>
                            <ChevronUp className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
                        </div>
                    </div>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors">
                    <Percent className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-medium text-white/80">Desconto</span>
                </button>
            </div>
            
            <div className="h-[1px] w-full bg-white/10"></div>
            
            <div className="flex justify-between items-end pb-1">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/50">Total a pagar</span>
                    <span className="text-2xl font-bold text-white tracking-tight">R$ 61,50</span>
                </div>
                <div className="text-right flex flex-col items-end">
                    <span className="text-[10px] text-white/40 line-through">R$ 65,00</span>
                    <span className="text-[10px] text-green-400 font-medium">Economia de R$ 3,50</span>
                </div>
            </div>
            
            <button className="w-full h-12 rounded-xl bg-gradient-to-br from-primary to-[#5b3af5] flex items-center justify-center gap-2 text-white font-bold text-base hover:scale-[1.01] active:scale-[0.98] transition-transform shadow-glow">
                <span>Finalizar Venda</span>
                <ArrowRight className="w-5 h-5" />
            </button>
         </div>
       </div>
    </div>
  );
};

export default Sales;