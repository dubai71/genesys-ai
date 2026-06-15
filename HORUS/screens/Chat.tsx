import React from 'react';
import { Menu, Bell, CheckCircle, Plus, Mic, Send, LayoutGrid, Box, BarChart3, Settings } from 'lucide-react';
import { Screen } from '../types';

interface ChatProps {
  setScreen: (screen: Screen) => void;
}

const Chat: React.FC<ChatProps> = ({ setScreen }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark overflow-hidden">
      {/* Background */}
      <div className="fixed top-[-10%] left-[-20%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 pt-12 pb-4 glass-panel sticky top-0 rounded-b-2xl">
        <div className="flex items-center gap-3">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white">
                <Menu className="w-6 h-6" />
            </button>
            <div>
                <h1 className="text-white text-lg font-bold tracking-tight">Chat Gerencial</h1>
                <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-white/60 font-medium">Sistema Online</span>
                </div>
            </div>
        </div>
        <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-background-dark"></span>
        </button>
      </header>

      {/* Messages */}
      <main className="relative z-10 flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6 pb-40">
        <div className="flex justify-center">
            <span className="text-[11px] font-medium text-white/30 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">Hoje, 10:23 AM</span>
        </div>

        {/* System Msg */}
        <div className="flex items-end gap-3 max-w-[85%] self-start group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px] shrink-0">
                <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCorTqc-cyBeH8m46vC1ZVcBjzb-oi7p1JG1ERkwVuUtvEJj9C8gYRFElryNgCieJ5Btlgensezq8o_AfLHNGTJs6nyZHPIWjDhJu4wYnvt5phPUmSMvx__nr254N6m4JxhGHR17EKc5NIvv7AGbdwXScaYhA3XItLlx0fkPVlpVLOUYsdkUmAcyJzLHGoJnuriB8uWRLSzj1Uy3au10zyLjqQodQ5yR9Xd8LbSpG52rDMGXQ2D9P5lcNSil09gBVNhwlrOCeapYl__" alt="System" className="w-full h-full object-cover opacity-90" />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-xs text-white/50 ml-1">Sistema</span>
                <div className="bg-white/5 backdrop-blur-md border border-white/5 p-4 rounded-2xl rounded-bl-sm text-sm leading-relaxed text-gray-200 shadow-sm">
                    <p>Olá, Administrador. O que vamos gerenciar hoje?</p>
                </div>
            </div>
        </div>

        {/* User Msg */}
        <div className="flex items-end gap-3 max-w-[85%] self-end flex-row-reverse group">
             <div className="w-9 h-9 rounded-full bg-white/10 p-[1px] shrink-0">
                <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-sm overflow-hidden">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBophT2IwNm9uyyl0Sh8nnARU70OlxaKznzhb3xBkKq6dTMVt-a8nSUY04abAKntuomS71RAdjEF7exZtdTfRWJQQdlomAr3g3i9mQsvFf3bhcJi5PEwD6OjrjI9xstLCbcoZpTTqiTz2mT0s2pnkJSKzjB0pjowj7eaapxGd8NprQmXKPtFwvpL20kTb4Pv9X8FoSHzbQW-HkaoE6hRxjnHRKQXHxskfu02d845NKZly3MIdNiRsV_CqHQuhGGTXS3CU1leAuTnQpR" alt="User" className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="flex flex-col gap-1 items-end">
                <span className="text-xs text-white/50 mr-1">Você</span>
                <div className="bg-primary/20 backdrop-blur-md border border-primary/30 p-4 rounded-2xl rounded-br-sm text-sm leading-relaxed text-white shadow-glow">
                    <p>Adicionar 10 unidades de essência Blueberry</p>
                </div>
            </div>
        </div>

        {/* Response */}
        <div className="flex items-end gap-3 max-w-[85%] self-start group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px] shrink-0">
                 <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCorTqc-cyBeH8m46vC1ZVcBjzb-oi7p1JG1ERkwVuUtvEJj9C8gYRFElryNgCieJ5Btlgensezq8o_AfLHNGTJs6nyZHPIWjDhJu4wYnvt5phPUmSMvx__nr254N6m4JxhGHR17EKc5NIvv7AGbdwXScaYhA3XItLlx0fkPVlpVLOUYsdkUmAcyJzLHGoJnuriB8uWRLSzj1Uy3au10zyLjqQodQ5yR9Xd8LbSpG52rDMGXQ2D9P5lcNSil09gBVNhwlrOCeapYl__" alt="System" className="w-full h-full object-cover opacity-90" />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-xs text-white/50 ml-1">Sistema</span>
                <div className="bg-white/5 backdrop-blur-md border border-white/5 p-4 rounded-2xl rounded-bl-sm text-sm leading-relaxed text-gray-200 shadow-sm">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="text-green-400 mt-0.5 w-5 h-5" />
                        <div>
                            <p className="font-medium text-white mb-1">Confirmado</p>
                            <p className="text-white/80">Estoque de <span className="text-primary font-semibold">Essência Blueberry</span> atualizado: <span className="text-green-400">+10 un</span>.</p>
                            <p className="mt-2 pt-2 border-t border-white/10 text-xs font-mono text-white/60">Novo total: 45 un.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 w-full z-40 flex flex-col pointer-events-none mb-[80px]">
        <div className="w-full px-4 pb-4 pointer-events-auto">
             {/* Quick Actions */}
             <div className="flex gap-2 mb-3 overflow-x-auto pb-2 hide-scrollbar">
                {['Ver Estoque', 'Relatório Diário', 'Nova Venda'].map(action => (
                    <button key={action} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition active:scale-95 whitespace-nowrap">
                        <span className="text-xs font-medium text-white">{action}</span>
                    </button>
                ))}
             </div>
             
             {/* Input */}
             <div className="glass-panel rounded-2xl p-2 flex items-center gap-2 shadow-2xl bg-black/40">
                <button className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                    <Plus className="w-5 h-5" />
                </button>
                <input 
                    type="text" 
                    placeholder="Digite um comando..." 
                    className="flex-1 bg-transparent border-none text-white placeholder-white/40 focus:ring-0 text-base font-normal h-10 outline-none"
                />
                <button className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                    <Mic className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95">
                    <Send className="w-5 h-5" />
                </button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;