import React, { useState } from 'react';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Inventory from './screens/Inventory';
import Entry from './screens/Entry';
import Sales from './screens/Sales';
import Chat from './screens/Chat';
import Settings from './screens/Settings';
import Profile from './screens/Profile';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import QuickActionsFAB from './components/QuickActionsFAB';
import { Screen } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <Login setScreen={setCurrentScreen} />;
      case 'dashboard':
        return <Dashboard setScreen={setCurrentScreen} toggleSidebar={() => setIsSidebarOpen(true)} />;
      case 'inventory':
        return <Inventory setScreen={setCurrentScreen} />;
      case 'entry':
        return <Entry setScreen={setCurrentScreen} />;
      case 'sales':
        return <Sales setScreen={setCurrentScreen} />;
      case 'chat':
        return <Chat setScreen={setCurrentScreen} />;
      case 'settings':
        return <Settings setScreen={setCurrentScreen} />;
      case 'profile':
        return <Profile setScreen={setCurrentScreen} />;
      default:
        return <Login setScreen={setCurrentScreen} />;
    }
  };

  const showNav = ['dashboard', 'inventory', 'sales', 'chat', 'settings', 'profile'].includes(currentScreen);
  // Hide FAB on Login, Settings, Profile
  const showFAB = ['dashboard', 'inventory', 'chat'].includes(currentScreen);

  return (
    <div className="bg-background-dark min-h-screen text-white font-sans selection:bg-primary selection:text-white flex overflow-hidden">
      
      {/* Sidebar for Desktop & Mobile Drawer */}
      {showNav && (
        <Sidebar 
            currentScreen={currentScreen} 
            setScreen={setCurrentScreen} 
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden transition-all duration-300 ${showNav ? 'lg:pl-64' : ''}`}>
        {renderScreen()}
      </div>

      {/* Floating Action Button */}
      {showFAB && <QuickActionsFAB setScreen={setCurrentScreen} />}

      {/* Mobile Bottom Nav */}
      {showNav && <BottomNav currentScreen={currentScreen} setScreen={setCurrentScreen} />}
    </div>
  );
}

export default App;