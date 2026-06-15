import React from 'react';
import { ArrowLeft, Calendar, Expand, CheckCircle } from 'lucide-react';
import { Screen } from '../types';

interface EntryProps {
  setScreen: (screen: Screen) => void;
}

const Entry: React.FC<EntryProps> = ({ setScreen }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-background-dark">
      {/* Background blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-primary rounded-full blur-[80px] opacity-40 z-0" />
      <div className="absolute top-[40%] right-[-20%] w-80 h-80 bg-purple-600 rounded-full blur-[80px] opacity-40 z-0" />
      
      {/* Top Bar */}
      <div className="z-10 flex items-center p-4 pb-2 justify-between sticky top-0 backdrop-blur-md bg-background-dark/30">
        <button 
            onClick={() => setScreen('inventory')}
            className="text-white flex w-12 h-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white text-lg font-bold leading-tight text-center drop-shadow-md">Registro de Entrada</h2>
        <div className="w-12"></div>
      </div>

      <div className="z-10 flex-1 px-4 py-2 overflow-y-auto pb-32">
        <div className="glass-panel w-full rounded-2xl p-6 flex flex-col gap-6 relative overflow-hidden">
            {/* Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="flex flex-col gap-2">
                <label className="text-white/80 text-sm font-medium ml-1">Produto</label>
                <div className="relative">
                    <select className="bg-white/5 border border-white/10 text-white w-full h-14 rounded-xl px-4 text-base appearance-none focus:ring-0 focus:border-primary/50 focus:bg-white/10 transition-all outline-none">
                        <option className="bg-[#131022]" value="">Selecione o produto</option>
                        <option className="bg-[#131022]" value="1">Essência Zomo - Melancia</option>
                        <option className="bg-[#131022]" value="2">Carvão de Coco - 1kg</option>
                        <option className="bg-[#131022]" value="3">Narguile Amazon Hookah</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                        <Expand className="w-4 h-4 rotate-45" />
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-2 flex-1">
                    <label className="text-white/80 text-sm font-medium ml-1">Quantidade</label>
                    <input 
                        type="number" 
                        placeholder="0"
                        className="bg-white/5 border border-white/10 text-white w-full h-14 rounded-xl px-4 text-base focus:ring-0 focus:border-primary/50 outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <label className="text-white/80 text-sm font-medium ml-1">Valor Unitário</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-sm">R$</span>
                        <input 
                            type="text" 
                            placeholder="0,00"
                            className="bg-white/5 border border-white/10 text-white w-full h-14 rounded-xl pl-10 pr-4 text-base focus:ring-0 focus:border-primary/50 outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-white/80 text-sm font-medium ml-1">Data de Entrada</label>
                <div className="relative group">
                    <input 
                        type="date" 
                        className="bg-white/5 border border-white/10 text-white w-full h-14 rounded-xl px-4 text-base focus:ring-0 focus:border-primary/50 outline-none uppercase bg-transparent z-10 relative"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none z-0">
                        <Calendar className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-white/80 text-sm font-medium ml-1">Fornecedor</label>
                <input 
                    type="text" 
                    placeholder="Nome do fornecedor"
                    className="bg-white/5 border border-white/10 text-white w-full h-14 rounded-xl px-4 text-base focus:ring-0 focus:border-primary/50 outline-none"
                />
            </div>

            <div className="mt-2 p-4 rounded-xl bg-primary/10 border border-primary/20 flex justify-between items-center">
                <span className="text-sm text-white/70">Total Estimado</span>
                <span className="text-xl font-bold text-white drop-shadow-sm">R$ 0,00</span>
            </div>

            <button 
                onClick={() => setScreen('inventory')}
                className="w-full h-14 rounded-xl bg-gradient-to-br from-primary to-[#5b3af0] text-white font-bold text-lg tracking-wide flex items-center justify-center gap-2 shadow-glow active:scale-[0.98] transition-transform mt-4"
            >
                <CheckCircle className="w-6 h-6" />
                Registrar Entrada
            </button>
        </div>
      </div>
    </div>
  );
};

export default Entry;