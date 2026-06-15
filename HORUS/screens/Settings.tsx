import React, { useState, useEffect } from 'react';
import { Palette, Bell, Volume2, Shield, Smartphone, ChevronRight, Moon, RefreshCcw } from 'lucide-react';
import { Screen } from '../types';

interface SettingsProps {
  setScreen: (screen: Screen) => void;
}

const Settings: React.FC<SettingsProps> = () => {
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  
  const colors = [
    { name: 'Indigo', hex: '#3713ec', hover: '#2a0eb5' },
    { name: 'Purple', hex: '#7c3aed', hover: '#6d28d9' },
    { name: 'Emerald', hex: '#059669', hover: '#047857' },
    { name: 'Rose', hex: '#e11d48', hover: '#be123c' },
    { name: 'Orange', hex: '#ea580c', hover: '#c2410c' },
  ];

  const changeTheme = (color: typeof colors[0]) => {
    document.documentElement.style.setProperty('--color-primary', color.hex);
    document.documentElement.style.setProperty('--color-primary-hover', color.hover);
    document.documentElement.style.setProperty('--color-primary-glow', `${color.hex}66`); 
    localStorage.setItem('themeColor', JSON.stringify(color));
  };

  return (
    <div className="flex flex-col h-full bg-background-dark min-h-screen">
       {/* Background Decoration */}
       <div className="fixed top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

       <header className="px-6 pt-8 pb-4 border-b border-white/5 relative z-10">
         <h1 className="text-2xl font-bold text-white">Configurações</h1>
         <p className="text-gray-400 text-sm mt-1">Personalize sua experiência no Horus.</p>
       </header>

       <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative z-10 pb-24">
         
         {/* Theme Section */}
         <section className="glass-panel rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <Palette className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-white">Aparência</h2>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label className="text-sm text-gray-400 font-medium mb-3 block">Cor de Destaque</label>
                    <div className="flex flex-wrap gap-3">
                        {colors.map(c => (
                            <button
                                key={c.name}
                                onClick={() => changeTheme(c)}
                                className="w-10 h-10 rounded-full border border-white/10 hover:scale-110 transition-transform relative shadow-lg"
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                        <Moon className="text-gray-400 w-5 h-5" />
                        <span className="text-white">Modo Escuro</span>
                    </div>
                    <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer opacity-80">
                        <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                </div>
            </div>
         </section>

         {/* Notifications Section */}
         <section className="glass-panel rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg text-orange-500">
                    <Bell className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-white">Notificações</h2>
            </div>
            
            <div className="space-y-4 divide-y divide-white/5">
                <div className="flex items-center justify-between py-2">
                    <div>
                        <p className="text-white font-medium">Alertas de Estoque</p>
                        <p className="text-xs text-gray-500">Notificar quando produtos estiverem acabando</p>
                    </div>
                    <button 
                        onClick={() => setNotifications(!notifications)}
                        className={`w-11 h-6 rounded-full relative transition-colors ${notifications ? 'bg-primary' : 'bg-white/10'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${notifications ? 'left-6' : 'left-1'}`}></div>
                    </button>
                </div>
                <div className="flex items-center justify-between py-2 pt-4">
                    <div className="flex items-center gap-3">
                        <Volume2 className="text-gray-400 w-5 h-5" />
                        <span className="text-white">Sons do Sistema</span>
                    </div>
                    <button 
                        onClick={() => setSounds(!sounds)}
                        className={`w-11 h-6 rounded-full relative transition-colors ${sounds ? 'bg-primary' : 'bg-white/10'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${sounds ? 'left-6' : 'left-1'}`}></div>
                    </button>
                </div>
            </div>
         </section>

         {/* System Section */}
         <section className="glass-panel rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500">
                    <Smartphone className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-white">Sistema</h2>
            </div>
            
            <div className="space-y-1">
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gray-500 group-hover:text-white" />
                        <span className="text-gray-300 group-hover:text-white">Segurança e Senha</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-3">
                        <RefreshCcw className="w-5 h-5 text-gray-500 group-hover:text-white" />
                        <span className="text-gray-300 group-hover:text-white">Sincronização de Dados</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <span className="text-xs text-green-400">Online</span>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                    </div>
                </button>
            </div>
         </section>

         <div className="text-center text-xs text-gray-600 pt-4">
            Horus System v1.0.4 • Build 202310
         </div>

       </main>
    </div>
  );
};

export default Settings;