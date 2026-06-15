import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus, MoreVertical, AlertTriangle } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Screen } from '../types';

interface InventoryProps {
    setScreen: (screen: Screen) => void;
}

const Inventory: React.FC<InventoryProps> = ({ setScreen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  const categories = ['Todos', 'Tabacos', 'Sedas', 'Vapes', 'Acessórios', 'Essências'];

  const filteredProducts = PRODUCTS.filter(p => {
    // 1. Filter by Category
    let categoryMatch = true;
    if (selectedCategory !== 'Todos') {
       // Simple mapping for demo purposes matching the mock data categories
       if (selectedCategory === 'Tabacos') categoryMatch = p.category.includes('Fumo');
       else if (selectedCategory === 'Vapes') categoryMatch = p.category.includes('Pod');
       else categoryMatch = p.category.includes(selectedCategory.slice(0, 4)); // Loose match
    }

    // 2. Filter by Low Stock
    const stockMatch = showLowStockOnly ? (p.stock < 5 || p.isLowStock) : true;

    // 3. Filter by Search
    const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && stockMatch && searchMatch;
  });

  return (
    <div className="flex flex-col h-full bg-background-dark/50 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 pt-6 px-4 pb-2 backdrop-blur-xl bg-background-dark/30 border-b border-white/5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">Controle de Estoque</h1>
          {/* Hidden on desktop as it's in quick actions */}
          <button 
            onClick={() => setScreen('entry')}
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full bg-primary/80 backdrop-blur-md text-white shadow-glow border border-white/10 active:scale-95 transition-transform hover:bg-primary"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Search */}
      <section className="px-4 py-4 relative z-10">
        <div className="glass-panel relative flex items-center rounded-xl h-12 px-4 shadow-lg transition-all focus-within:bg-white/10">
            <Search className="text-white/50 mr-3 w-5 h-5" />
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome, marca ou SKU" 
                className="bg-transparent border-none outline-none text-white placeholder-white/40 flex-1 h-full w-full focus:ring-0 text-sm"
            />
        </div>
      </section>

      {/* Multi-Filters */}
      <section className="px-4 pb-2 relative z-10 flex flex-col gap-3">
        {/* Toggle Low Stock */}
        <div 
            onClick={() => setShowLowStockOnly(!showLowStockOnly)}
            className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${showLowStockOnly ? 'bg-red-500/20 border-red-500/40' : 'glass-panel border-white/5 hover:bg-white/5'}`}
        >
            <div className={`w-5 h-5 rounded flex items-center justify-center border ${showLowStockOnly ? 'bg-red-500 border-red-500 text-white' : 'border-white/30'}`}>
                {showLowStockOnly && <AlertTriangle className="w-3 h-3" />}
            </div>
            <span className={`text-sm font-medium ${showLowStockOnly ? 'text-red-200' : 'text-gray-400'}`}>Apenas Estoque Baixo</span>
        </div>

        {/* Categories */}
        <div className="w-full overflow-x-auto hide-scrollbar flex gap-2">
            {categories.map(cat => (
                <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-center h-8 px-4 rounded-full whitespace-nowrap active:scale-95 transition-all text-xs font-medium border ${
                        selectedCategory === cat 
                        ? 'bg-primary/80 border-white/20 shadow-glow text-white' 
                        : 'glass-panel border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </section>

      {/* List */}
      <main className="px-4 py-4 space-y-4 relative z-10 pb-32">
        {filteredProducts.length === 0 ? (
            <div className="text-center py-10 opacity-50">
                <p className="text-white">Nenhum produto encontrado.</p>
            </div>
        ) : (
            filteredProducts.map((product) => (
             <div key={product.id} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
                <div className="glass-panel relative flex items-center p-3 rounded-2xl shadow-xl">
                    <div 
                        className="h-16 w-16 shrink-0 rounded-xl bg-cover bg-center border border-white/5" 
                        style={{ backgroundImage: `url('${product.image}')` }}
                    />
                    <div className="ml-4 flex-1 min-w-0">
                        <h3 className="text-base font-bold text-white leading-tight truncate">{product.name}</h3>
                        <p className="text-xs text-white/50 mt-1">{product.category}</p>
                        <p className="text-sm font-medium text-white/80 mt-1">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                        </p>
                    </div>
                    <div className="flex flex-col items-end justify-between self-stretch py-1 pl-2 h-16">
                        <MoreVertical className="text-white/30 w-5 h-5 cursor-pointer hover:text-white" />
                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border backdrop-blur-sm ${product.isLowStock || product.stock < 5 ? 'bg-red-500/20 border-red-500/20' : 'bg-green-500/20 border-green-500/20'}`}>
                            <div className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${product.isLowStock || product.stock < 5 ? 'bg-red-400 shadow-red-400' : 'bg-green-400 shadow-green-400'}`}></div>
                            <span className={`text-xs font-bold ${product.isLowStock || product.stock < 5 ? 'text-red-300' : 'text-green-300'}`}>{product.stock} un</span>
                        </div>
                    </div>
                </div>
             </div>
        )))}
      </main>
    </div>
  );
};

export default Inventory;