
import React, { useRef } from 'react';
import { Character } from '../types';
import { translations } from '../translations';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  onImageUpload: (file: File) => void;
  theme?: 'light' | 'dark';
}

const Backstory: React.FC<Props> = ({ character, updateCharacter, onImageUpload, theme = 'light' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lang = character.language || 'pt';
  const t = translations[lang];
  const isDark = theme === 'dark';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-4">
       <input 
         type="file" 
         ref={fileInputRef} 
         className="hidden" 
         accept="image/*" 
         onChange={(e) => e.target.files?.[0] && onImageUpload(e.target.files[0])}
       />

       {/* RETRATO & TRAÇOS */}
       <div className="lg:col-span-4 space-y-6">
          <div 
            className={`border-2 p-2 rounded-lg shadow-xl aspect-square relative overflow-hidden group cursor-pointer ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {character.portrait ? (
              <img src={character.portrait} alt="Portrait" className="w-full h-full object-cover rounded shadow-inner" />
            ) : (
              <div className={`w-full h-full flex flex-col items-center justify-center cinzel text-xs italic text-center p-4 ${isDark ? 'bg-black/40 text-[#e8d5b5]/40' : 'bg-orange-100 text-[#8b4513]/40'}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
                 {t.click_to_upload}
              </div>
            )}
            <button 
                className={`absolute bottom-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110 z-10 ${isDark ? 'bg-[#d4af37] text-black' : 'bg-[#8b4513] text-[#fdf5e6]'}`}
                title={lang === 'pt' ? "Novo Retrato" : "New Portrait"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
          </div>

          <div className="space-y-4">
             <div className={`border p-4 rounded shadow relative ${isDark ? 'bg-white/5 border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
                <span className={`absolute -top-3 left-4 px-2 cinzel text-[10px] font-bold uppercase tracking-wider ${isDark ? 'bg-[#121212] text-[#d4af37]' : 'bg-[#fdf5e6] text-[#8b4513]'}`}>{t.personality}</span>
                <textarea 
                  value={character.personality}
                  onChange={(e) => updateCharacter({ personality: e.target.value })}
                  className={`w-full bg-transparent parchment-text text-sm italic pt-2 leading-relaxed focus:outline-none resize-none custom-scrollbar ${isDark ? 'text-[#e8d5b5]' : 'text-current'}`}
                  rows={3}
                />
             </div>
             <div className={`border p-4 rounded shadow relative ${isDark ? 'bg-white/5 border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
                <span className={`absolute -top-3 left-4 px-2 cinzel text-[10px] font-bold uppercase tracking-wider ${isDark ? 'bg-[#121212] text-[#d4af37]' : 'bg-[#fdf5e6] text-[#8b4513]'}`}>{t.ideals}</span>
                <textarea 
                  value={character.ideals}
                  onChange={(e) => updateCharacter({ ideals: e.target.value })}
                  className={`w-full bg-transparent parchment-text text-sm italic pt-2 leading-relaxed focus:outline-none resize-none custom-scrollbar ${isDark ? 'text-[#e8d5b5]' : 'text-current'}`}
                  rows={2}
                />
             </div>
             <div className={`border p-4 rounded shadow relative ${isDark ? 'bg-white/5 border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
                <span className={`absolute -top-3 left-4 px-2 cinzel text-[10px] font-bold uppercase tracking-wider ${isDark ? 'bg-[#121212] text-[#d4af37]' : 'bg-[#fdf5e6] text-[#8b4513]'}`}>{t.bonds}</span>
                <textarea 
                  value={character.bonds}
                  onChange={(e) => updateCharacter({ bonds: e.target.value })}
                  className={`w-full bg-transparent parchment-text text-sm italic pt-2 leading-relaxed focus:outline-none resize-none custom-scrollbar ${isDark ? 'text-[#e8d5b5]' : 'text-current'}`}
                  rows={2}
                />
             </div>
             <div className={`border p-4 rounded shadow relative ${isDark ? 'bg-white/5 border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
                <span className={`absolute -top-3 left-4 px-2 cinzel text-[10px] font-bold uppercase tracking-wider ${isDark ? 'bg-[#121212] text-[#d4af37]' : 'bg-[#fdf5e6] text-[#8b4513]'}`}>{t.flaws}</span>
                <textarea 
                  value={character.flaws}
                  onChange={(e) => updateCharacter({ flaws: e.target.value })}
                  className={`w-full bg-transparent parchment-text text-sm italic pt-2 leading-relaxed focus:outline-none resize-none custom-scrollbar ${isDark ? 'text-[#e8d5b5]' : 'text-current'}`}
                  rows={2}
                />
             </div>
          </div>
       </div>

       {/* HISTÓRIA */}
       <div className={`lg:col-span-8 border-2 p-8 rounded-lg shadow-xl relative ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
          <h2 className={`fantasy-title text-3xl mb-6 border-b-2 pb-2 flex justify-between items-center relative z-10 ${isDark ? 'text-[#d4af37] border-white/10' : 'text-[#5d4037] border-[#8b4513]/30'}`}>
            {t.history_of} {character.name.split(' ')[0]}
          </h2>
          <textarea 
            value={character.backstory}
            onChange={(e) => updateCharacter({ backstory: e.target.value })}
            className={`w-full bg-transparent parchment-text text-lg leading-relaxed text-justify focus:outline-none resize-none min-h-[500px] relative z-10 custom-scrollbar pr-2 ${isDark ? 'text-[#e8d5b5]' : 'text-current'}`}
            placeholder={t.write_legend}
          />
          <div className={`mt-8 pt-8 border-t-2 relative z-10 ${isDark ? 'border-white/10' : 'border-[#8b4513]/10'}`}>
             <h3 className={`cinzel font-bold mb-4 uppercase text-xs tracking-widest ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{t.master_notes}</h3>
             <div className={`p-4 rounded-lg border-2 border-dashed ${isDark ? 'bg-white/5 border-white/10' : 'bg-orange-100/30 border-[#8b4513]/20'}`}>
                <textarea 
                  placeholder={t.extra_notes}
                  className={`w-full bg-transparent cinzel italic text-sm focus:outline-none resize-none opacity-60 custom-scrollbar ${isDark ? 'text-[#e8d5b5]' : 'text-current'}`}
                  rows={4}
                />
             </div>
          </div>
       </div>
    </div>
  );
};

export default Backstory;
