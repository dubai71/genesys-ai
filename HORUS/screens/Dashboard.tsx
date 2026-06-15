import React from 'react';
import { Bell, TrendingUp, Calendar, Box as BoxIcon, AlertTriangle, Menu, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { CHART_DATA, PRODUCTS } from '../constants';
import { Screen } from '../types';

interface DashboardProps {
    setScreen: (screen: Screen) => void;
    toggleSidebar: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setScreen, toggleSidebar }) => {
  const lowStockCount = PRODUCTS.filter(p => p.stock < 5 || p.isLowStock).length;

  return (
    <div className="flex flex-col gap-6 p-5 pb-32">
      {/* Header */}
      <header className="flex items-center justify-between pt-4 lg:pt-0">
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="lg:hidden p-2 -ml-2 text-white hover:bg-white/10 rounded-full">
            <Menu className="w-6 h-6" />
          </button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden ring-2 ring-white/10">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBophT2IwNm9uyyl0Sh8nnARU70OlxaKznzhb3xBkKq6dTMVt-a8nSUY04abAKntuomS71RAdjEF7exZtdTfRWJQQdlomAr3g3i9mQsvFf3bhcJi5PEwD6OjrjI9xstLCbcoZpTTqiTz2mT0s2pnkJSKzjB0pjowj7eaapxGd8NprQmXKPtFwvpL20kTb4Pv9X8FoSHzbQW-HkaoE6hRxjnHRKQXHxskfu02d845NKZly3MIdNiRsV_CqHQuhGGTXS3CU1leAuTnQpR" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background-dark rounded-full"></div>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Bom dia,</p>
            <h2 className="text-white text-lg font-bold leading-tight">Gerente</h2>
          </div>
        </div>
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors relative">
          <Bell className="w-5 h-5" />
          {lowStockCount > 0 && (
             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          )}
        </button>
      </header>

      {/* Notifications Area */}
      {lowStockCount > 0 && (
          <div className="glass-panel border-l-4 border-l-red-500 bg-red-500/10 p-4 rounded-xl flex items-start gap-3 animate-fade-in-up">
            <div className="p-2 bg-red-500/20 rounded-full shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
                <h4 className="text-white font-bold text-sm">Alerta de Estoque</h4>
                <p className="text-white/70 text-xs mt-1">Existem <span className="text-white font-bold">{lowStockCount} produtos</span> com estoque crítico. Reposição necessária.</p>
                <button 
                    onClick={() => setScreen('inventory')}
                    className="mt-2 text-xs font-bold text-red-400 flex items-center gap-1 hover:text-red-300"
                >
                    Ver produtos <ArrowRight className="w-3 h-3" />
                </button>
            </div>
          </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm font-medium">Vendas Hoje</p>
                <TrendingUp className="text-primary w-5 h-5" />
            </div>
            <p className="text-white text-2xl font-bold tracking-tight">R$ 1.250</p>
            <div className="flex items-center gap-1">
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-1.5 py-0.5 rounded flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> 5%
                </span>
                <span className="text-gray-500 text-xs">vs ontem</span>
            </div>
        </div>
        
        <div className="glass-panel rounded-2xl p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm font-medium">Vendas Mês</p>
                <Calendar className="text-purple-400 w-5 h-5" />
            </div>
            <p className="text-white text-2xl font-bold tracking-tight">R$ 45.300</p>
            <div className="flex items-center gap-1">
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-1.5 py-0.5 rounded flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> 12%
                </span>
                <span className="text-gray-500 text-xs">vs mês ant.</span>
            </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm font-medium">Estoque</p>
                <BoxIcon className="text-blue-400 w-5 h-5" />
            </div>
            <p className="text-white text-2xl font-bold tracking-tight">3.402</p>
            <p className="text-gray-500 text-xs">Unidades totais</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 flex flex-col gap-2 border-red-500/20 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 bg-red-500/20 w-16 h-16 rounded-full blur-xl"></div>
            <div className="flex items-center justify-between relative z-10">
                <p className="text-gray-400 text-sm font-medium">Críticos</p>
                <AlertTriangle className="text-red-400 w-5 h-5" />
            </div>
            <p className="text-white text-2xl font-bold tracking-tight relative z-10">{lowStockCount}</p>
            <p className="text-red-400 text-xs font-medium relative z-10">Repor urgente</p>
        </div>
      </div>

      {/* Chart */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h3 className="text-white text-lg font-bold leading-tight">Desempenho Diário</h3>
                <p className="text-gray-400 text-xs font-medium mt-1">Últimos 7 dias</p>
            </div>
            <div className="text-right">
                <p className="text-primary text-xl font-bold">R$ 8.450</p>
            </div>
        </div>
        <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA}>
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {CHART_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.active ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-2 px-2">
                {CHART_DATA.map((d, i) => (
                    <span key={i} className={`text-[10px] font-medium uppercase ${d.active ? 'text-white font-bold' : 'text-gray-500'}`}>
                        {d.day}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;