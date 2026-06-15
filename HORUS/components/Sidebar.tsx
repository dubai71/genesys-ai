import React from 'react';
import { LayoutDashboard, Box, MessageSquare, Settings, X, ChevronRight, User } from 'lucide-react';
import { Screen } from '../types';

interface SidebarProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentScreen, setScreen, isOpen, setIsOpen }) => {
  
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Início' },
    { id: 'inventory', icon: Box, label: 'Estoque' },
    { id: 'chat', icon: MessageSquare, label: 'Chat Horus' },
    { id: 'settings', icon: Settings, label: 'Configurações' },
  ];

  const handleNavigation = (screen: Screen) => {
    setScreen(screen);
    if(window.innerWidth < 1024) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Container */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#131022]/95 backdrop-blur-xl border-r border-white/10 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
                  <span className="font-bold text-white">H</span>
               </div>
               <span className="font-bold text-xl tracking-tight text-white">Horus</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-white/50 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id as Screen)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-primary text-white shadow-glow' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-primary transition-colors'}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-white/10">
            <div 
                onClick={() => handleNavigation('profile')}
                className={`flex items-center gap-3 p-2 rounded-xl transition-colors cursor-pointer ${currentScreen === 'profile' ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <div className="relative">
                 <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBophT2IwNm9uyyl0Sh8nnARU70OlxaKznzhb3xBkKq6dTMVt-a8nSUY04abAKntuomS71RAdjEF7exZtdTfRWJQQdlomAr3g3i9mQsvFf3bhcJi5PEwD6OjrjI9xstLCbcoZpTTqiTz2mT0s2pnkJSKzjB0pjowj7eaapxGd8NprQmXKPtFwvpL20kTb4Pv9X8FoSHzbQW-HkaoE6hRxjnHRKQXHxskfu02d845NKZly3MIdNiRsV_CqHQuhGGTXS3CU1leAuTnQpR" 
                    alt="Admin" 
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div className="absolute -bottom-1 -right-1 bg-background-lighter p-0.5 rounded-full">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full border border-background-lighter"></div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-white truncate">Admin User</p>
                <p className="text-xs text-white/50 truncate">Gerente</p>
              </div>
              <User className="w-4 h-4 text-white/30" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;