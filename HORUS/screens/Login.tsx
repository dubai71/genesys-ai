import React from 'react';
import { Mail, Lock, EyeOff, ArrowRight } from 'lucide-react';
import { Screen } from '../types';

interface LoginProps {
  setScreen: (screen: Screen) => void;
}

const Login: React.FC<LoginProps> = ({ setScreen }) => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed -top-20 -left-20 w-[300px] h-[300px] bg-primary rounded-full blur-[120px] opacity-40 pointer-events-none" />
      <div className="fixed -bottom-10 -right-10 w-[300px] h-[300px] bg-[#5b3aff] rounded-full blur-[120px] opacity-30 pointer-events-none" />

      <main className="relative z-10 w-full max-w-md flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col items-center text-center space-y-6">
          <div className="relative w-24 h-24 rounded-full p-0.5 bg-gradient-to-br from-white/20 to-transparent">
            <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 overflow-hidden">
                <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBfXI6RKix6baRMzeUUkjnxKbCnKRCPgff_C2wFA-jY_EYAYu-eilJ-JtL156J4fkX2lpYIeSQezkalEW2FU5iIsb6bGQajCSFqw8L_6leGrAy1_jBxGMUql17vPCmaBRYs19vLchPDZoBvpXUsrKiSGHFOdJuWphj9oTKHG3cIRro6lt3FBFmdkTGcUr8EVLqG6OM-7snQ9If66VSo9BH4S1Z9fn1gcBU3wDFJBwkvc62XgFTFluPP-qn-Ao9BqqtwzMzcnQgHWJe" 
                    alt="Logo" 
                    className="w-full h-full object-cover opacity-80"
                />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-white">Smoke & Co.</h1>
            <p className="text-gray-400 text-sm font-medium tracking-wide uppercase opacity-80">Gestão Premium</p>
          </div>
        </header>

        {/* Form */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 w-full animate-fade-in-up">
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setScreen('dashboard'); }}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">Bem-vindo de volta</h2>
              <p className="text-sm text-gray-400 mt-1">Acesse sua conta para gerenciar seu estoque.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider ml-1">E-mail</label>
              <div className="bg-black/20 border border-white/10 group flex items-center rounded-xl px-3 transition-colors focus-within:border-primary/50 focus-within:bg-black/40">
                <Mail className="text-gray-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
                <input 
                    type="email" 
                    placeholder="exemplo@loja.com" 
                    className="bg-transparent border-none text-white text-base w-full focus:ring-0 placeholder-gray-600 py-3.5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider ml-1">Senha</label>
              <div className="bg-black/20 border border-white/10 group flex items-center rounded-xl px-3 transition-colors focus-within:border-primary/50 focus-within:bg-black/40 relative">
                <Lock className="text-gray-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
                <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="bg-transparent border-none text-white text-base w-full focus:ring-0 placeholder-gray-600 py-3.5"
                />
                <button type="button" className="text-gray-500 hover:text-white transition-colors">
                    <EyeOff className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-primary/80 hover:text-primary hover:underline transition-all font-medium">
                Esqueceu a senha?
              </a>
            </div>

            <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 rounded-xl shadow-glow transition-all transform active:scale-[0.98] mt-2 flex items-center justify-center gap-2 group"
            >
              <span>ENTRAR</span>
              <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <footer className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Ainda não tem conta? <a href="#" className="text-white font-medium hover:text-primary transition-colors ml-1">Cadastre-se</a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Login;