import React from 'react';
import { LayoutDashboard, Box, MessageSquare, Settings } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, setScreen }) => {
  // Sales removed, Chat added instead of "BarChart" icon
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Início' },
    { id: 'inventory', icon: Box, label: 'Estoque' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'settings', icon: Settings, label: 'Config' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 w-full bg-[#131022]/90 backdrop-blur-xl border-t border-white/10 pb-6 pt-3 px-6 z-50">
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => item.id !== 'settings' && setScreen(item.id as Screen)}
              className="flex flex-col items-center gap-1 min-w-[60px] group relative"
            >
              {isActive && (
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary-glow)]" />
              )}
              <div className="relative">
                <item.icon 
                    className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-primary scale-110' : 'text-gray-500 group-hover:text-white'}`} 
                    strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;