import React, { useState, useEffect } from 'react';
import { PresetCharacter, Character } from '../types';
import { supabase } from '../services/supabase';
import { translations, classTranslations, raceTranslations, skillTranslations } from '../translations';
import { INITIAL_PRESETS } from '../data/presets';
import { Axe, Guitar, ShieldPlus, Leaf, Sword, Hand, Shield, Target, Drama, Flame, Skull, UserRound, Settings, LayoutGrid, Users, Zap, Scroll } from 'lucide-react';
import { CLASS_ICONS, CLASSES_PHB } from '../constants';

interface Props {
  onUsePreset: (preset: PresetCharacter) => void;
  onClose: () => void;
  language?: 'pt' | 'en';
}

const Library: React.FC<Props> = ({ onUsePreset, onClose, language = 'pt' }) => {
  const [presets, setPresets] = useState<PresetCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterClass, setFilterClass] = useState('');
  const [filterRace, setFilterRace] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewPreset, setPreviewPreset] = useState<PresetCharacter | null>(null);
  const [confirmPreset, setConfirmPreset] = useState<PresetCharacter | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsSearchActive(false);
  };

  const openSidebarForSearch = () => {
    setIsSidebarOpen(true);
    setIsSearchActive(true);
  };

  const t = translations[language];

  // Helper para traduzir valores técnicos
  const translateValue = (val: string | null | undefined, dictionary: Record<string, { pt: string, en: string }>) => {
    if (!val) return null;
    return dictionary[val] ? dictionary[val][language] : val;
  };

  useEffect(() => {
    const fetchPresets = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('preset_characters')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error || !data || data.length === 0) {
          console.error("Error fetching presets or empty:", error);
          // Fallback to initial presets if table doesn't exist yet or is empty
          setPresets(INITIAL_PRESETS);
        } else {
          setPresets(data);
        }
      } catch (err) {
        console.error("Error fetching presets:", err);
        setPresets(INITIAL_PRESETS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPresets();
  }, []);

  const filteredPresets = presets.filter(p => {
    if (filterClass && p.class_id !== filterClass) return false;
    if (filterRace && p.race !== filterRace) return false;
    if (filterLevel && p.level.toString() !== filterLevel) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const uniqueClasses = Object.keys(CLASSES_PHB);
  const uniqueRaces = Object.keys(raceTranslations);
  const uniqueLevels = ['1', '3', '5', '10', '15', '20'];

  return (
    <div className="h-screen bg-[#F3EDE3] text-[#2c1e16] font-sans relative flex overflow-hidden">
      {/* Texturas de Fundo */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>

      {/* Menu Lateral Retrátil (Dashboard Sidebar) */}
      <aside 
        className={`fixed md:relative z-50 h-full bg-[#FDFBF7] border-r-2 border-[#C89B3C] shadow-2xl transition-all duration-300 ease-in-out flex flex-col overflow-hidden ${
          isSidebarOpen ? 'w-72 translate-x-0' : 'w-20 -translate-x-0'
        }`}
      >
        {/* Header do Sidebar */}
        <div className="p-6 bg-[#F3EDE3] border-b-2 border-[#C89B3C]/30 flex-shrink-0 flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 w-full">
            {/* Botão para alternar sidebar */}
            <button 
              onClick={toggleSidebar}
              className="p-2 text-[#5c3a21] hover:bg-[#C89B3C]/20 rounded-xl transition-all"
              title="Alternar Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M11 19l-7-7m0 0l7-7m-7 7h18" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {isSidebarOpen && (
            <div className="mt-6 w-full space-y-6">
              <button 
                onClick={onClose}
                className="w-full p-3.5 bg-gradient-to-b from-[#d4af37] to-[#aa7c11] text-[#1a0f00] border-2 border-[#5c3a21] rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-md cinzel text-sm font-bold uppercase tracking-widest"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
              </button>

              {/* Busca */}
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus={isSearchActive}
                  className="w-full bg-[#FDFBF7] border-2 border-[#C89B3C]/50 rounded-xl px-4 py-3 pl-10 cinzel text-xs text-[#5c3a21] focus:outline-none focus:ring-2 focus:ring-[#C89B3C] placeholder-[#5c3a21]/50 font-bold"
                />
                <svg className="w-5 h-5 text-[#C89B3C] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          )}
          
          {!isSidebarOpen && (
            <div className="mt-8 flex flex-col gap-4 items-center">
              <button onClick={onClose} className="p-3 text-[#5c3a21] hover:bg-[#C89B3C]/20 rounded-xl transition-all" title="Voltar">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              </button>
              <button onClick={openSidebarForSearch} className="p-3 text-[#5c3a21] hover:bg-[#C89B3C]/20 rounded-xl transition-all" title="Buscar">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          )}
        </div>

        <div className="p-6 space-y-10 overflow-y-auto custom-scrollbar flex-grow">
            {/* Classes */}
            <div className="space-y-5">
              {isSidebarOpen && (
                <div className="flex items-center gap-2 text-[#5c3a21]">
                  <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  <h3 className="cinzel text-xs uppercase tracking-widest font-bold">Classes</h3>
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <button 
                  onClick={() => setFilterClass('')}
                  className={`flex items-center ${isSidebarOpen ? 'justify-between px-4' : 'justify-center px-2'} py-2.5 rounded-xl cinzel text-[11px] uppercase transition-all font-bold group ${filterClass === '' ? 'bg-[#5c3a21] text-[#d4af37] shadow-lg scale-[1.02]' : 'text-[#5c3a21] hover:bg-[#C89B3C]/15'}`}
                  title="Todas"
                >
                  <div className="flex items-center gap-3">
                    <LayoutGrid className={`w-4 h-4 ${filterClass === '' ? 'text-[#d4af37]' : 'text-[#C89B3C]'}`} />
                    {isSidebarOpen && <span>Todas</span>}
                  </div>
                  {isSidebarOpen && filterClass === '' && <div className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]"></div>}
                </button>
                {uniqueClasses.map(c => {
                  const Icon = CLASS_ICONS[c] || LayoutGrid;
                  return (
                    <button 
                      key={c}
                      onClick={() => setFilterClass(c)}
                      className={`flex items-center ${isSidebarOpen ? 'justify-between px-4' : 'justify-center px-2'} py-2.5 rounded-xl cinzel text-[11px] uppercase transition-all font-bold group ${filterClass === c ? 'bg-[#5c3a21] text-[#d4af37] shadow-lg scale-[1.02]' : 'text-[#5c3a21] hover:bg-[#C89B3C]/15'}`}
                      title={translateValue(c, classTranslations) || ''}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${filterClass === c ? 'text-[#d4af37]' : 'text-[#C89B3C]'}`} />
                        {isSidebarOpen && <span>{translateValue(c, classTranslations)}</span>}
                      </div>
                      {isSidebarOpen && filterClass === c && <div className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]"></div>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Raças e Nível */}
            {isSidebarOpen && (
              <div className="space-y-8 pt-8 border-t-2 border-[#C89B3C]/20">
                {/* Raças */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#5c3a21]">
                    <Users className="w-5 h-5 opacity-70" />
                    <h3 className="cinzel text-xs uppercase tracking-widest font-bold">Linhagens</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setFilterRace('')}
                      className={`px-3 py-2 rounded-xl cinzel text-[10px] uppercase transition-all font-bold border-2 ${filterRace === '' ? 'bg-[#5c3a21] text-[#d4af37] border-[#5c3a21] shadow-md' : 'text-[#5c3a21] border-[#C89B3C]/30 hover:bg-[#C89B3C]/10'}`}
                    >
                      Todas
                    </button>
                    {uniqueRaces.map(r => (
                      <button 
                        key={r}
                        onClick={() => setFilterRace(r)}
                        className={`px-3 py-2 rounded-xl cinzel text-[10px] uppercase transition-all font-bold border-2 ${filterRace === r ? 'bg-[#5c3a21] text-[#d4af37] border-[#5c3a21] shadow-md' : 'text-[#5c3a21] border-[#C89B3C]/30 hover:bg-[#C89B3C]/10'}`}
                      >
                        {translateValue(r, raceTranslations)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experiência */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#5c3a21]">
                    <Zap className="w-5 h-5 opacity-70" />
                    <h3 className="cinzel text-xs uppercase tracking-widest font-bold">Experiência</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <button 
                      onClick={() => setFilterLevel('')}
                      className={`col-span-2 py-2.5 rounded-xl cinzel text-[10px] uppercase transition-all font-bold border-2 ${filterLevel === '' ? 'bg-[#5c3a21] text-[#d4af37] border-[#5c3a21] shadow-md' : 'text-[#5c3a21] border-[#C89B3C]/30 hover:bg-[#C89B3C]/10'}`}
                    >
                      Todos
                    </button>
                    {uniqueLevels.sort((a, b) => parseInt(a) - parseInt(b)).map(l => (
                      <button 
                        key={l}
                        onClick={() => setFilterLevel(l)}
                        className={`py-2.5 rounded-xl cinzel text-[10px] uppercase transition-all font-bold border-2 ${filterLevel === l ? 'bg-[#5c3a21] text-[#d4af37] border-[#5c3a21] shadow-md' : 'text-[#5c3a21] border-[#C89B3C]/30 hover:bg-[#C89B3C]/10'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        
        {/* Rodapé do Sidebar */}
        {isSidebarOpen && (
          <div className="p-6 bg-[#F3EDE3] border-t-2 border-[#C89B3C]/30 mt-auto">
            <button 
              onClick={() => {
                setFilterClass('');
                setFilterRace('');
                setFilterLevel('');
                setSearchQuery('');
              }}
              className="w-full py-3 border-2 border-[#5c3a21]/30 text-[#5c3a21] rounded-xl cinzel text-[10px] uppercase font-bold tracking-widest hover:bg-[#5c3a21]/10 hover:border-[#5c3a21] transition-all"
            >
              Limpar Todos os Filtros
            </button>
          </div>
        )}
      </aside>

      {/* Overlay para mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar relative z-10">
        <div className="w-full max-w-7xl mx-auto p-4 py-8 md:py-12 flex flex-col items-center">
          <header className="text-center mb-12 px-4 w-full relative">
            <h1 className="fantasy-title text-[33px] text-[#5c3a21] drop-shadow-sm mb-2 uppercase tracking-[0.1em] leading-tight text-center">
              ⚜ Biblioteca de Pergaminhos ⚜
            </h1>
            <p className="cinzel text-[#5c3a21]/80 text-[10px] md:text-sm tracking-[0.2em] uppercase italic font-bold">
              Escolha um modelo pronto e crie uma cópia na sua conta.
            </p>
          </header>

          {/* Grid de Fichas */}
          <main className="w-full pb-24">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <svg className="w-12 h-12 text-[#d4af37] animate-spin mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <p className="cinzel text-[#d4af37] tracking-widest uppercase text-sm">Buscando pergaminhos...</p>
              </div>
            ) : filteredPresets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 opacity-50">
                <svg className="w-16 h-16 text-[#8b4513] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="cinzel text-[#5c3a21] tracking-widest uppercase text-sm">Nenhum pergaminho encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {filteredPresets.map(preset => (
                  <div key={preset.id} className="bg-[#FDFBF7] border-2 border-[#C89B3C] rounded-2xl flex flex-col transition-all hover:shadow-[0_12px_40px_rgba(200,155,60,0.3)] hover:-translate-y-1 shadow-md relative overflow-hidden group h-full">
                    {/* Portrait Area */}
                    <div className="h-48 bg-[#F3EDE3] relative overflow-hidden border-b-2 border-[#C89B3C]/30">
                      {/* Decorative corner accents in portrait */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#5c3a21] opacity-20 m-2"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#5c3a21] opacity-20 m-2"></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-32 h-32 text-[#5c3a21]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>

                      {/* Level Badge Overlay */}
                      <div className="absolute top-3 right-3 z-20">
                        <span className="cinzel text-[10px] text-[#FDFBF7] bg-[#5c3a21] font-bold px-3 py-1 rounded-full shadow-md uppercase border border-[#C89B3C]/50">
                          Nvl {preset.level}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow relative z-10">
                      <h3 className="fantasy-title text-2xl text-[#5c3a21] mb-2 text-center leading-tight">{preset.name}</h3>
                      
                      <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                        <span className="cinzel text-[9px] text-[#5c3a21] border border-[#C89B3C]/50 bg-[#F3EDE3] px-2 py-0.5 rounded uppercase font-bold flex items-center gap-1.5">
                          {(() => {
                            const Icon = CLASS_ICONS[preset.class_id] || LayoutGrid;
                            return <Icon className="w-4 h-4 text-[#C89B3C]" />;
                          })()}
                          {translateValue(preset.class_id, classTranslations)}
                        </span>
                        {preset.subclass_id && (
                          <span className="cinzel text-[9px] text-[#5c3a21] border border-[#C89B3C]/50 bg-[#F3EDE3] px-2 py-0.5 rounded uppercase font-bold">
                            {preset.subclass_id}
                          </span>
                        )}
                        <span className="cinzel text-[9px] text-[#5c3a21] border border-[#C89B3C]/50 bg-[#F3EDE3] px-2 py-0.5 rounded uppercase font-bold">
                          {translateValue(preset.race, raceTranslations)}
                        </span>
                      </div>

                      <p className="parchment-text text-xs text-[#5c3a21]/80 mb-6 italic text-center line-clamp-2 h-8">
                        "{preset.description}"
                      </p>

                      <div className="mt-auto flex flex-col gap-2">
                        <button 
                          onClick={() => setConfirmPreset(preset)}
                          className="w-full py-2.5 bg-gradient-to-b from-[#d4af37] to-[#aa7c11] border-2 border-[#5c3a21] text-[#1a0f00] rounded-xl cinzel font-bold uppercase tracking-widest text-[11px] hover:brightness-110 transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                          </svg>
                          Abrir Pergaminho
                        </button>

                        <button 
                          onClick={() => setPreviewPreset(preset)}
                          className="w-full py-1.5 text-[#5c3a21]/60 cinzel font-bold uppercase tracking-widest text-[9px] hover:text-[#5c3a21] transition-all flex items-center justify-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Visualizar Detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Modal de Preview */}
        {previewPreset && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#F3EDE3] border-4 border-[#C89B3C] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
              {/* Decorative background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
              
              <header className="p-6 border-b-2 border-[#C89B3C]/30 flex justify-between items-center bg-[#FDFBF7] relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#C89B3C] bg-[#F3EDE3] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#5c3a21]/40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="fantasy-title text-3xl text-[#5c3a21] leading-tight">{previewPreset.name}</h2>
                    <p className="cinzel text-[10px] text-[#5c3a21]/60 uppercase tracking-widest font-bold flex items-center gap-2">
                      {translateValue(previewPreset.race, raceTranslations)} • 
                      <span className="flex items-center gap-1">
                        {(() => {
                          const Icon = CLASS_ICONS[previewPreset.class_id] || LayoutGrid;
                          return <Icon className="w-4 h-4 text-[#C89B3C]" />;
                        })()}
                        {translateValue(previewPreset.class_id, classTranslations)}
                      </span> • Nvl {previewPreset.level}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setPreviewPreset(null)}
                  className="p-2 text-[#5c3a21] hover:bg-[#C89B3C]/10 rounded-full transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10">
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h3 className="cinzel text-[#5c3a21] text-sm font-bold uppercase border-b border-[#C89B3C]/30 pb-2">Atributos</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(previewPreset.data.stats).map(([attr, val]) => (
                        <div key={attr} className="bg-[#FDFBF7] border border-[#C89B3C]/30 p-2 rounded-lg text-center">
                          <p className="cinzel text-[8px] text-[#5c3a21]/60 uppercase font-bold">{attr}</p>
                          <p className="cinzel text-lg text-[#5c3a21] font-bold">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="cinzel text-[#5c3a21] text-sm font-bold uppercase border-b border-[#C89B3C]/30 pb-2">Informações</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="cinzel text-[#5c3a21]/60 uppercase font-bold">Pontos de Vida</span>
                        <span className="cinzel text-[#5c3a21] font-bold">{previewPreset.data.hp.max}</span>
                      </div>
                      <div className="flex flex-col gap-2 text-xs">
                        <span className="cinzel text-[#5c3a21]/60 uppercase font-bold border-b border-[#C89B3C]/20 pb-1">Perícias</span>
                        <div className="flex flex-wrap gap-1">
                          {previewPreset.data.proficiencies.skills.map(skill => (
                            <span key={skill} className="bg-[#5c3a21]/5 text-[#5c3a21] px-2 py-0.5 rounded border border-[#C89B3C]/30 cinzel text-[9px] font-bold">
                              {translateValue(skill, skillTranslations)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="cinzel text-[#5c3a21] text-sm font-bold uppercase border-b border-[#C89B3C]/30 pb-2">Descrição do Personagem</h3>
                  <p className="parchment-text text-[#5c3a21]/80 italic leading-relaxed">
                    {previewPreset.description}
                  </p>
                </div>
              </div>

              <footer className="p-6 bg-[#FDFBF7] border-t-2 border-[#C89B3C]/30 flex gap-4 relative z-10">
                <button 
                  onClick={() => setPreviewPreset(null)}
                  className="flex-1 py-3 border-2 border-[#5c3a21] text-[#5c3a21] rounded-xl cinzel font-bold uppercase tracking-widest text-xs hover:bg-[#5c3a21]/5 transition-all"
                >
                  Fechar
                </button>
                <button 
                  onClick={() => {
                    setConfirmPreset(previewPreset);
                    setPreviewPreset(null);
                  }}
                  className="flex-[2] py-3 bg-gradient-to-b from-[#d4af37] to-[#aa7c11] border-2 border-[#5c3a21] text-[#1a0f00] rounded-xl cinzel font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all shadow-md"
                >
                  Abrir este Pergaminho
                </button>
              </footer>
            </div>
          </div>
        )}

        {/* Modal de Confirmação */}
        {confirmPreset && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#FDFBF7] border-4 border-[#d4af37] rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(212,175,55,0.3)] relative overflow-hidden text-center">
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
              <div className="w-20 h-20 bg-[#5c3a21] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#d4af37] shadow-lg">
                <Scroll className="w-10 h-10 text-[#d4af37]" />
              </div>
              <h2 className="fantasy-title text-2xl text-[#5c3a21] mb-4 uppercase tracking-widest">Invocação de Pergaminho</h2>
              <p className="parchment-text text-[#5c3a21] text-lg mb-8 italic">
                "Tem certeza que desejas invocar esse pergaminho?"
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setConfirmPreset(null)}
                  className="flex-1 py-3 border-2 border-[#5c3a21] text-[#5c3a21] rounded-xl cinzel font-bold uppercase tracking-widest text-xs hover:bg-[#5c3a21]/5 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => {
                    onUsePreset(confirmPreset);
                    setConfirmPreset(null);
                  }}
                  className="flex-1 py-3 bg-gradient-to-b from-[#d4af37] to-[#aa7c11] border-2 border-[#5c3a21] text-[#1a0f00] rounded-xl cinzel font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all shadow-md"
                >
                  Invocar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
