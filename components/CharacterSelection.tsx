import React, { useState, useRef } from 'react';
import { Character } from '../types';
import { translations, classTranslations, raceTranslations } from '../translations';

interface Props {
  characters: Character[];
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onImport: (char: Character) => void;
  onLogout: () => void;
  onOpenSettings: () => void;
  language?: 'pt' | 'en';
}

const CharacterSelection: React.FC<Props> = ({ 
  characters, 
  onSelect, 
  onCreate, 
  onDelete, 
  onImport, 
  onLogout, 
  onOpenSettings,
  language = 'pt' 
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const importInputRef = useRef<HTMLInputElement>(null);
  const t = translations[language];

  // Helper para traduzir valores técnicos
  const translateValue = (val: string, dictionary: Record<string, { pt: string, en: string }>) => {
    return dictionary[val] ? dictionary[val][language] : val;
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (deletingId) {
      onDelete(deletingId);
      setDeletingId(null);
    }
  };

  const cancelDelete = () => {
    setDeletingId(null);
  };

  const processFile = (file: File) => {
    if (!file.name.endsWith('.json')) {
      alert(language === 'pt' ? "Apenas pergaminhos sagrados (.json) são aceitos na biblioteca." : "Only sacred scrolls (.json) are accepted in the library.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const char = JSON.parse(event.target?.result as string);
        if (char && char.name) {
          onImport(char);
        } else {
          alert(language === 'pt' ? "Arquivo inválido. Formato de pergaminho não reconhecido." : "Invalid file. Scroll format not recognized.");
        }
      } catch (err) {
        alert(language === 'pt' ? "Erro ao ler arquivo. Certifique-se de que é um JSON válido." : "Error reading file. Ensure it is a valid JSON.");
      }
    };
    reader.readAsText(file);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    e.target.value = ''; 
  };

  return (
    <div className="fixed inset-0 bg-[#0d0700] overflow-y-auto custom-scrollbar selection:bg-[#d4af37]/30">
      <div className="fixed inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none z-0"></div>
      
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

      <input 
        type="file" 
        ref={importInputRef} 
        onChange={handleImportFile} 
        accept=".json" 
        className="hidden" 
      />

      {/* Conteúdo rolável */}
      <div className="relative z-10 w-full min-h-full flex flex-col items-center p-4 py-8 md:py-20">
        <header className="text-center mb-10 md:mb-16 px-4">
          <h1 className="fantasy-title text-5xl md:text-8xl text-[#d4af37] drop-shadow-[0_4px_25px_rgba(212,175,55,0.4)] mb-4 uppercase tracking-[0.1em] leading-tight">
            {language === 'pt' ? 'O Pergaminho' : 'The Scroll'}
          </h1>
          <div className="flex flex-col items-center gap-3">
            <p className="cinzel text-[#e8d5b5]/60 text-[9px] md:text-sm tracking-[0.4em] uppercase italic">
              {language === 'pt' ? 'Biblioteca de Lendas' : 'Library of Legends'}
            </p>
            <div className="flex justify-center items-center w-full max-w-xs opacity-30">
               <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
               <div className="w-3 h-3 border-2 border-[#d4af37] mx-4 rotate-45 flex-none"></div>
               <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#d4af37] to-transparent"></div>
            </div>
          </div>
        </header>

        {/* GRID DE PERSONAGENS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full max-w-7xl px-2 md:px-6 mb-12">
          
          {/* Listagem de Personagens Existentes - Agora aparecem primeiro */}
          {characters.map((char) => (
            <div 
              key={char.id}
              className="relative h-80 bg-[#fdf5e6] border-2 border-[#8b4513] rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(212,175,55,0.25)] flex flex-col group cursor-pointer"
              onClick={() => onSelect(char.id)}
            >
              <button 
                onClick={(e) => handleDeleteClick(e, char.id)}
                className="absolute top-4 right-4 z-40 p-3 bg-red-900/90 text-white hover:bg-red-600 transition-all duration-300 rounded-2xl shadow-xl border border-white/20 backdrop-blur-md md:opacity-0 md:group-hover:opacity-100"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="h-[75%] w-full bg-[#0d0700] relative overflow-hidden">
                {char.portrait ? (
                  <img 
                    src={char.portrait} 
                    alt={char.name} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center opacity-20">
                    <svg className="w-24 h-24 text-[#fdf5e6] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0700] via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4 z-20">
                   <div className="flex items-center gap-2">
                      <div className="h-[1px] flex-grow bg-[#d4af37]/30"></div>
                      <span className="cinzel text-[8px] font-bold text-[#d4af37] uppercase tracking-[0.2em]">{translateValue(char.race, raceTranslations)}</span>
                      <div className="h-[1px] flex-grow bg-[#d4af37]/30"></div>
                   </div>
                </div>
              </div>

              <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-[#fdf5e6] to-[#f4e4bc] px-4 py-4 relative z-30 border-t-4 border-[#8b4513]/20">
                <h3 className="fantasy-title text-2xl md:text-3xl text-[#3e2723] leading-none truncate w-full text-center drop-shadow-sm group-hover:text-[#8b4513] transition-colors">
                  {char.name}
                </h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="cinzel text-[10px] text-[#8b4513] font-bold uppercase tracking-[0.1em] px-2 py-0.5 border border-[#8b4513]/20 rounded-md">
                    {translateValue(char.class, classTranslations)}
                  </span>
                  <span className="cinzel text-[10px] text-[#d4af37] bg-black/80 font-bold px-2 py-0.5 rounded-md shadow-sm">
                    {language === 'pt' ? 'NVL' : 'LVL'} {char.level}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Botão Nova Ficha - Movido para DEPOIS das fichas criadas */}
          <button 
            onClick={onCreate}
            className="group relative h-80 bg-[#1a0f00]/80 border-2 border-[#8b4513]/40 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 hover:border-[#d4af37] hover:bg-[#2d1b0d] hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2)_0%,transparent_70%)] group-hover:opacity-20 transition-opacity"></div>
            <div className="w-16 h-16 rounded-full border-2 border-[#8b4513]/60 flex items-center justify-center mb-4 group-hover:border-[#d4af37] group-hover:scale-110 group-hover:rotate-90 transition-all duration-500 bg-black/40 shadow-inner">
              <svg className="w-8 h-8 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="cinzel font-bold text-[#d4af37] tracking-[0.2em] text-[12px] uppercase">{t.new_scroll}</span>
            <div className="absolute bottom-4 opacity-20 cinzel text-[8px] uppercase tracking-widest text-[#8b4513] group-hover:text-[#d4af37] transition-colors">v1.5 Arcanum</div>
          </button>

          {/* Botão Importar */}
          <button 
            onClick={() => importInputRef.current?.click()}
            className="group relative h-80 border-2 bg-[#1a0f00]/40 border-dashed border-[#8b4513]/40 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 hover:border-[#d4af37] hover:bg-[#1a0f00] shadow-xl overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl border-2 border-[#8b4513]/40 text-[#8b4513] group-hover:border-[#d4af37] group-hover:text-[#d4af37] flex items-center justify-center mb-4 transition-all duration-500 bg-black/20">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <span className="cinzel font-bold tracking-[0.2em] text-[10px] text-[#8b4513] group-hover:text-[#d4af37] uppercase">{t.import_record}</span>
            <p className="mt-4 px-8 text-center parchment-text text-[11px] opacity-40 leading-tight">Carregue lendas salvas em outros dispositivos.</p>
          </button>
        </div>

        {/* Decoração Final inferior para manter espaço de scroll */}
        <div className="w-full h-24 flex items-center justify-center opacity-20">
           <div className="flex items-center gap-6">
              <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
              <svg className="w-10 h-10 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
              <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
           </div>
        </div>
      </div>

      {/* Modal de Deletar */}
      {deletingId && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative max-w-sm w-full bg-[#fdf5e6] border-4 border-red-900 rounded-[2.5rem] shadow-[0_0_80px_rgba(220,38,38,0.2)] p-10 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-950 rounded-full border-4 border-[#8b4513] flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h2 className="fantasy-title text-3xl text-[#3e2723] mb-6 mt-6 uppercase tracking-wider">{t.burn_scroll}</h2>
            <p className="parchment-text text-base text-[#5d4037] mb-10 leading-relaxed italic opacity-80">
              {t.ashes_no_memory}
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmDelete} 
                className="w-full bg-gradient-to-b from-red-700 to-red-900 text-white cinzel font-bold py-5 rounded-2xl uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:brightness-110 active:scale-95 transition-all border-b-4 border-black/40"
              >
                {t.destroy}
              </button>
              <button 
                onClick={cancelDelete} 
                className="w-full bg-transparent text-[#8b4513] cinzel font-bold py-3 rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:bg-black/5 transition-all"
              >
                {t.preserve}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSelection;