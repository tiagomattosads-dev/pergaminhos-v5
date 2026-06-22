import React from 'react';
import { translations } from '../translations';

interface Props {
  onMyCharacters: () => void;
  onLibrary: () => void;
  onDungeonMasterRoom: () => void;
  onLogout: () => void;
  onOpenSettings: () => void;
  language?: 'pt' | 'en';
}

const Home: React.FC<Props> = ({ onMyCharacters, onLibrary, onDungeonMasterRoom, onLogout, onOpenSettings, language = 'pt' }) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#0d0700] text-[#e8d5b5] font-sans relative flex flex-col items-center justify-center p-4">
      {/* Texturas de Fundo */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>

      {/* Botões de topo - Fixos */}
      <div className="fixed top-4 right-4 z-[100] flex items-center gap-2 md:gap-3">
        <button 
          onClick={onOpenSettings}
          className="p-3 rounded-full border-2 border-[#d4af37]/30 bg-black/60 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a0f00] transition-all shadow-2xl group"
          title={t.settings}
        >
          <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
        </button>

        <button 
          onClick={onLogout}
          className="p-3 rounded-full border-2 border-[#d4af37]/30 bg-black/60 text-[#d4af37] hover:bg-red-900/40 hover:text-white transition-all shadow-2xl group"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center gap-8">
        <header className="flex flex-col items-center gap-4">
          <h1 className="fantasy-title text-[33px] text-[#d4af37] drop-shadow-[0_4px_25px_rgba(212,175,55,0.4)] uppercase tracking-[0.1em] leading-tight text-center">
            {t.home_welcome}
          </h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-8">
          <button
            onClick={onMyCharacters}
            className="flex-1 group relative overflow-hidden rounded-2xl border-2 border-[#8b4513]/50 bg-[#1a0f00]/80 p-8 transition-all duration-500 hover:border-[#d4af37] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/0 via-[#d4af37]/5 to-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay"></div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <svg className="w-16 h-16 text-[#d4af37] group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="fantasy-title text-2xl text-[#d4af37] group-hover:text-[#fff0c2] transition-colors duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t.home_my_characters}</span>
            </div>
          </button>

          <button
            onClick={onLibrary}
            className="flex-1 group relative overflow-hidden rounded-2xl border-2 border-[#8b4513]/50 bg-[#1a0f00]/80 p-8 transition-all duration-500 hover:border-[#d4af37] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/0 via-[#d4af37]/5 to-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay"></div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <svg className="w-16 h-16 text-[#d4af37] group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="fantasy-title text-2xl text-[#d4af37] group-hover:text-[#fff0c2] transition-colors duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t.home_library}</span>
            </div>
          </button>

          <button
            onClick={onDungeonMasterRoom}
            className="flex-1 group relative overflow-hidden rounded-2xl border-2 border-[#8b4513]/50 bg-[#1a0f00]/80 p-8 transition-all duration-500 hover:border-[#d4af37] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/0 via-[#d4af37]/5 to-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay"></div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <svg className="w-16 h-16 text-[#d4af37] group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="fantasy-title text-2xl text-[#d4af37] group-hover:text-[#fff0c2] transition-colors duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Sala do Mestre</span>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Home;
