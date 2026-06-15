import React from 'react';
import { User, Mail, Award, Clock, ArrowLeft, Camera, Edit2 } from 'lucide-react';
import { Screen } from '../types';

interface ProfileProps {
  setScreen: (screen: Screen) => void;
}

const Profile: React.FC<ProfileProps> = ({ setScreen }) => {
  return (
    <div className="flex flex-col h-full bg-background-dark min-h-screen relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/20 to-background-dark z-0"></div>
        
        {/* Header */}
        <div className="relative z-10 p-4 flex items-center">
             <button 
                onClick={() => setScreen('dashboard')}
                className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-colors"
             >
                <ArrowLeft className="w-5 h-5" />
             </button>
             <h1 className="ml-4 text-lg font-bold text-white">Meu Perfil</h1>
        </div>

        <main className="relative z-10 flex-1 px-6 pb-24 overflow-y-auto">
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center mt-4 mb-8">
                <div className="relative group cursor-pointer">
                    <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-br from-primary to-purple-500">
                        <div className="w-full h-full rounded-full bg-background-dark overflow-hidden border-4 border-background-dark">
                            <img 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBophT2IwNm9uyyl0Sh8nnARU70OlxaKznzhb3xBkKq6dTMVt-a8nSUY04abAKntuomS71RAdjEF7exZtdTfRWJQQdlomAr3g3i9mQsvFf3bhcJi5PEwD6OjrjI9xstLCbcoZpTTqiTz2mT0s2pnkJSKzjB0pjowj7eaapxGd8NprQmXKPtFwvpL20kTb4Pv9X8FoSHzbQW-HkaoE6hRxjnHRKQXHxskfu02d845NKZly3MIdNiRsV_CqHQuhGGTXS3CU1leAuTnQpR" 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-1 bg-white text-primary p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                        <Camera className="w-4 h-4" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mt-4">Admin User</h2>
                <span className="text-primary font-medium bg-primary/10 px-3 py-1 rounded-full text-xs mt-1 border border-primary/20">Gerente Geral</span>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
                <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">E-mail</p>
                        <p className="text-white font-medium">admin@horus.co</p>
                    </div>
                    <button className="text-primary hover:text-white transition-colors">
                        <Edit2 className="w-4 h-4" />
                    </button>
                </div>

                <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">ID do Usuário</p>
                        <p className="text-white font-medium">#8921-XJ</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <h3 className="text-white font-bold text-lg mt-8 mb-4">Estatísticas do Mês</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent">
                    <Award className="w-6 h-6 text-yellow-400 mb-2" />
                    <p className="text-2xl font-bold text-white">45</p>
                    <p className="text-xs text-gray-400">Vendas Realizadas</p>
                </div>
                <div className="glass-panel p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent">
                    <Clock className="w-6 h-6 text-blue-400 mb-2" />
                    <p className="text-2xl font-bold text-white">120h</p>
                    <p className="text-xs text-gray-400">Horas no Sistema</p>
                </div>
            </div>

            <button className="w-full mt-8 py-4 rounded-xl border border-red-500/30 text-red-500 font-bold hover:bg-red-500/10 transition-colors">
                Sair da Conta
            </button>

        </main>
    </div>
  );
};

export default Profile;