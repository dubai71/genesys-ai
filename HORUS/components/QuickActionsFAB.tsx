import React, { useState } from 'react';
import { Plus, ShoppingCart, PackagePlus, X, Zap } from 'lucide-react';
import { Screen } from '../types';

interface QuickActionsFABProps {
  setScreen: (screen: Screen) => void;
}

const QuickActionsFAB: React.FC<QuickActionsFABProps> = ({ setScreen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (screen: Screen) => {
    setScreen(screen);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-24 lg:bottom-10 right-6 z-50 flex flex-col items-end gap-3">
      {/* Actions */}
      <div className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'}`}>
        
        <div className="flex items-center gap-3">
            <span className="bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-lg backdrop-blur shadow-sm">Nova Entrada</span>
            <button 
                onClick={() => handleAction('entry')}
                className="w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center hover:scale-105 transition-transform"
            >
                <PackagePlus className="w-6 h-6" />
            </button>
        </div>

        <div className="flex items-center gap-3">
            <span className="bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-lg backdrop-blur shadow-sm">Nova Venda</span>
            <button 
                onClick={() => handleAction('sales')}
                className="w-12 h-12 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center hover:scale-105 transition-transform"
            >
                <ShoppingCart className="w-6 h-6" />
            </button>
        </div>

      </div>

      {/* Main Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl bg-primary text-white shadow-[0_0_20px_rgba(55,19,236,0.5)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${isOpen ? 'rotate-45 bg-red-500 shadow-red-500/30' : ''}`}
      >
        <Zap className={`w-7 h-7 transition-transform ${isOpen ? 'scale-0 absolute' : 'scale-100'}`} />
        <Plus className={`w-8 h-8 transition-transform ${isOpen ? 'scale-100' : 'scale-0 absolute'}`} />
      </button>
    </div>
  );
};

export default QuickActionsFAB;