import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { Scroll, Users, NotebookText, Plus, ChevronRight, ChevronLeft, Sparkles, Settings } from 'lucide-react';

interface Props {
  onClose: () => void;
  language?: 'pt' | 'en';
}

interface CampaignData {
  type: 'campaign' | 'oneshot' | null;
  name: string;
  lore: string;
}

const DungeonMasterRoom: React.FC<Props> = ({ onClose, language = 'pt' }) => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'npcs' | 'notes' | 'settings'>('campaigns');
  const [theme, setTheme] = useState<'parchment' | 'dark'>('parchment');
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    type: null,
    name: '',
    lore: ''
  });

  const t = translations[language];

  const isDark = theme === 'dark';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isCreatingCampaign) {
          setIsCreatingCampaign(false);
          setWizardStep(1);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isCreatingCampaign]);

  const tabs = [
    { id: 'campaigns', label: 'Campanhas', icon: Scroll },
    { id: 'npcs', label: 'NPCs', icon: Users },
    { id: 'notes', label: 'Notas', icon: NotebookText },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ] as const;

  const handleNextStep = () => {
    if (wizardStep < 3) setWizardStep(wizardStep + 1);
    else {
      // Finalize creation (logic placeholder)
      console.log('Campaign Created:', campaignData);
      setIsCreatingCampaign(false);
      setWizardStep(1);
    }
  };

  const handlePrevStep = () => {
    if (wizardStep > 1) setWizardStep(wizardStep - 1);
    else setIsCreatingCampaign(false);
  };

  if (isCreatingCampaign) {
    return (
      <div className={`h-screen font-sans relative overflow-hidden flex flex-col items-center justify-center p-6 transition-colors duration-500 ${
        isDark ? 'bg-[#0a0502] text-[#e8d5b5]' : 'bg-[#F3EDE3] text-[#5c3a21]'
      }`}>
        {/* Texturas de Fundo */}
        {!isDark ? (
          <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
        ) : (
          <>
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
            <div className="fixed inset-0 pointer-events-none z-0 opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
            <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
          </>
        )}
        
        <div className={`relative z-10 w-full max-w-2xl border-2 rounded-3xl shadow-2xl p-12 animate-in fade-in zoom-in duration-300 ${
          isDark 
            ? 'bg-black/60 backdrop-blur-xl border-white/10' 
            : 'bg-[#FDFBF7] border-[#C89B3C]'
        }`}>
          {/* Progress Bar */}
          <div className={`absolute top-0 left-0 w-full h-2 rounded-t-3xl overflow-hidden ${isDark ? 'bg-white/5' : 'bg-[#C89B3C]/10'}`}>
            <div 
              className={`h-full transition-all duration-500 ${isDark ? 'bg-[#d4af37]' : 'bg-[#C89B3C]'}`} 
              style={{ width: `${(wizardStep / 3) * 100}%` }}
            ></div>
          </div>

          <button 
            onClick={handlePrevStep}
            className={`absolute top-6 left-6 p-2 rounded-full transition-all ${
              isDark ? 'hover:bg-white/10 text-[#d4af37]' : 'hover:bg-[#C89B3C]/10 text-[#C89B3C]'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="space-y-8">
            {wizardStep === 1 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <span className={`cinzel font-bold text-sm tracking-widest uppercase ${isDark ? 'text-[#d4af37]' : 'text-[#C89B3C]'}`}>Passo 1</span>
                  <h2 className="fantasy-title text-4xl leading-tight">Está criando uma campanha ou One shot?</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => { setCampaignData({ ...campaignData, type: 'campaign' }); handleNextStep(); }}
                    className={`p-8 rounded-2xl border-2 transition-all text-left space-y-3 group ${
                      campaignData.type === 'campaign' 
                        ? (isDark ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-[#C89B3C] bg-[#C89B3C]/5') 
                        : (isDark ? 'border-white/10 hover:border-[#d4af37]/50 hover:bg-white/5' : 'border-[#C89B3C]/20 hover:border-[#C89B3C]/50 hover:bg-[#C89B3C]/5')
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                      isDark ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'bg-[#C89B3C]/10 text-[#C89B3C]'
                    }`}>
                      <Scroll className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="cinzel font-bold text-lg">Campanha</h3>
                      <p className="text-sm opacity-60">Uma jornada épica de longa duração.</p>
                    </div>
                  </button>
                  <button
                    onClick={() => { setCampaignData({ ...campaignData, type: 'oneshot' }); handleNextStep(); }}
                    className={`p-8 rounded-2xl border-2 transition-all text-left space-y-3 group ${
                      campaignData.type === 'oneshot' 
                        ? (isDark ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-[#C89B3C] bg-[#C89B3C]/5') 
                        : (isDark ? 'border-white/10 hover:border-[#d4af37]/50 hover:bg-white/5' : 'border-[#C89B3C]/20 hover:border-[#C89B3C]/50 hover:bg-[#C89B3C]/5')
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                      isDark ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'bg-[#C89B3C]/10 text-[#C89B3C]'
                    }`}>
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="cinzel font-bold text-lg">One Shot</h3>
                      <p className="text-sm opacity-60">Uma aventura rápida de uma única sessão.</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <span className={`cinzel font-bold text-sm tracking-widest uppercase ${isDark ? 'text-[#d4af37]' : 'text-[#C89B3C]'}`}>Passo 2</span>
                  <h2 className="fantasy-title text-4xl leading-tight">
                    Qual o nome {campaignData.type === 'campaign' ? 'da sua campanha' : 'do seu one shot'}?
                  </h2>
                </div>
                <input
                  type="text"
                  autoFocus
                  value={campaignData.name}
                  onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && campaignData.name.trim() && handleNextStep()}
                  placeholder="Ex: A Queda de Neverwinter..."
                  className={`w-full bg-transparent border-b-2 py-4 text-2xl cinzel focus:outline-none transition-colors ${
                    isDark 
                      ? 'border-white/20 focus:border-[#d4af37] placeholder-white/10' 
                      : 'border-[#C89B3C]/30 focus:border-[#C89B3C] placeholder-[#5c3a21]/20'
                  }`}
                />
                <div className="flex justify-end">
                  <button
                    disabled={!campaignData.name.trim()}
                    onClick={handleNextStep}
                    className={`flex items-center gap-2 px-8 py-4 rounded-xl cinzel font-bold uppercase tracking-widest hover:brightness-110 disabled:opacity-30 transition-all ${
                      isDark ? 'bg-[#d4af37] text-black' : 'bg-[#C89B3C] text-[#FDFBF7]'
                    }`}
                  >
                    Continuar <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <span className={`cinzel font-bold text-sm tracking-widest uppercase ${isDark ? 'text-[#d4af37]' : 'text-[#C89B3C]'}`}>Passo 3</span>
                  <h2 className="fantasy-title text-4xl leading-tight">
                    Qual a lore ou história {campaignData.type === 'campaign' ? 'dessa campanha' : 'desse one shot'}?
                  </h2>
                </div>
                <textarea
                  autoFocus
                  rows={4}
                  value={campaignData.lore}
                  onChange={(e) => setCampaignData({ ...campaignData, lore: e.target.value })}
                  placeholder="Descreva brevemente o mundo, os conflitos e o que os jogadores podem esperar..."
                  className={`w-full border-2 rounded-2xl p-6 text-lg cinzel focus:outline-none transition-colors resize-none ${
                    isDark 
                      ? 'bg-white/5 border-white/10 focus:border-[#d4af37] placeholder-white/10' 
                      : 'bg-[#F3EDE3]/50 border-[#C89B3C]/20 focus:border-[#C89B3C] placeholder-[#5c3a21]/20'
                  }`}
                />
                <div className="flex justify-end">
                  <button
                    disabled={!campaignData.lore.trim()}
                    onClick={handleNextStep}
                    className={`flex items-center gap-2 px-8 py-4 rounded-xl cinzel font-bold uppercase tracking-widest hover:brightness-110 disabled:opacity-30 transition-all shadow-lg ${
                      isDark ? 'bg-[#d4af37] text-black' : 'bg-[#C89B3C] text-[#FDFBF7]'
                    }`}
                  >
                    Criar Aventura <Sparkles className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen font-sans relative overflow-hidden flex flex-col transition-colors duration-500 ${
      isDark ? 'bg-[#0a0502] text-[#e8d5b5]' : 'bg-[#F3EDE3] text-[#5c3a21]'
    }`}>
      {/* Texturas de Fundo */}
      {!isDark ? (
        <>
          <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
          <div className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
        </>
      ) : (
        <>
          <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
          <div className="fixed inset-0 pointer-events-none z-0 opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
          <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
        </>
      )}

      {/* Top Navigation Bar */}
      <header className={`relative z-20 w-full backdrop-blur-md border-b-2 px-8 py-4 flex items-center ${
        isDark ? 'bg-black/40 border-white/5' : 'bg-[#FDFBF7]/80 border-[#C89B3C]/30'
      }`}>
        <div className="flex-1"></div>

        {/* Centered Navigation */}
        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-2 cinzel text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeTab === tab.id 
                    ? (isDark ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-[#5c3a21] scale-110') 
                    : (isDark ? 'text-white/40 hover:text-white/70' : 'text-[#5c3a21]/40 hover:text-[#5c3a21]/70')
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all ${
                    isDark ? 'bg-white shadow-[0_0_8px_white]' : 'bg-[#C89B3C] shadow-[0_0_8px_#C89B3C]'
                  }`}></div>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="flex-1 flex justify-end">
          <button 
            onClick={onClose}
            className={`p-2 rounded-full transition-all ${
              isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-[#C89B3C]/10 text-[#C89B3C]'
            }`}
            title="Voltar"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow p-12 overflow-y-auto relative z-10 max-w-7xl mx-auto w-full">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {activeTab === 'campaigns' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className={`group relative rounded-2xl border-2 p-8 transition-all duration-500 hover:shadow-xl ${
                isDark 
                  ? 'bg-white/5 border-white/10 hover:border-white/30' 
                  : 'bg-[#FDFBF7] border-[#C89B3C]/30 hover:border-[#C89B3C]'
              }`}>
                <div className="relative z-10">
                  <h2 className={`fantasy-title text-2xl mb-4 tracking-wider ${isDark ? 'text-[#d4af37]' : 'text-[#5c3a21]'}`}>As Minas Perdidas</h2>
                  <p className={`cinzel text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-[#5c3a21]/60'}`}>
                    Gerencie suas fichas e o progresso da aventura nesta campanha clássica.
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className={`h-1.5 flex-grow rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-[#C89B3C]/10'}`}>
                      <div className={`h-full w-1/3 ${isDark ? 'bg-[#d4af37]' : 'bg-[#C89B3C]'}`}></div>
                    </div>
                    <span className={`text-[10px] cinzel font-bold ${isDark ? 'text-[#d4af37]' : 'text-[#C89B3C]'}`}>33%</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsCreatingCampaign(true)}
                className={`group relative rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center text-center transition-all ${
                  isDark 
                    ? 'border-white/10 hover:border-white/30 hover:bg-white/5' 
                    : 'border-[#C89B3C]/30 hover:border-[#C89B3C] hover:bg-[#FDFBF7]/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-4 transition-all ${
                  isDark 
                    ? 'border-white/10 text-white/20 group-hover:text-[#d4af37] group-hover:border-[#d4af37]' 
                    : 'border-[#C89B3C]/30 text-[#C89B3C]/30 group-hover:text-[#C89B3C] group-hover:border-[#C89B3C]'
                }`}>
                  <Plus className="w-6 h-6" />
                </div>
                <p className={`cinzel text-sm font-bold uppercase tracking-widest ${
                  isDark ? 'text-white/20 group-hover:text-white/60' : 'text-[#5c3a21]/40 group-hover:text-[#5c3a21]/70'
                }`}>Nova Campanha</p>
              </button>
            </div>
          )}
          
          {activeTab === 'npcs' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Users className={`w-16 h-16 mb-6 ${isDark ? 'text-white/10' : 'text-[#C89B3C]/20'}`} />
              <p className={`cinzel text-xl ${isDark ? 'text-white/40' : 'text-[#5c3a21]/40'}`}>Gerenciamento de NPCs em breve...</p>
            </div>
          )}
          
          {activeTab === 'notes' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <NotebookText className={`w-16 h-16 mb-6 ${isDark ? 'text-white/10' : 'text-[#C89B3C]/20'}`} />
              <p className={`cinzel text-xl ${isDark ? 'text-white/40' : 'text-[#5c3a21]/40'}`}>Bloco de notas em breve...</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-6">
                <h2 className={`fantasy-title text-3xl ${isDark ? 'text-[#d4af37]' : 'text-[#5c3a21]'}`}>Configurações da Sala</h2>
                
                <div className="grid gap-4">
                  <div className={`p-6 border-2 rounded-2xl space-y-4 ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-[#FDFBF7] border-[#C89B3C]/20'
                  }`}>
                    <h3 className={`cinzel font-bold uppercase tracking-wider ${isDark ? 'text-white/80' : 'text-[#5c3a21]'}`}>Interface</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm opacity-70">Idioma do Mestre</span>
                        <select className={`border rounded-lg px-3 py-1 text-sm cinzel ${
                          isDark 
                            ? 'bg-black/40 border-white/20 text-white/80' 
                            : 'bg-[#F3EDE3] border-[#C89B3C]/30 text-[#5c3a21]'
                        }`}>
                          <option>Português</option>
                          <option>English</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm opacity-70">Tema Visual</span>
                        <div className={`flex p-1 rounded-xl ${isDark ? 'bg-black/40' : 'bg-[#F3EDE3]'}`}>
                          <button 
                            onClick={() => setTheme('parchment')}
                            className={`px-4 py-1.5 rounded-lg text-[10px] cinzel font-bold transition-all ${
                              theme === 'parchment' 
                                ? 'bg-[#C89B3C] text-white shadow-lg' 
                                : 'text-white/40 hover:text-white/60'
                            }`}
                          >
                            Pergaminho
                          </button>
                          <button 
                            onClick={() => setTheme('dark')}
                            className={`px-4 py-1.5 rounded-lg text-[10px] cinzel font-bold transition-all ${
                              theme === 'dark' 
                                ? 'bg-[#d4af37] text-black shadow-lg' 
                                : 'text-[#5c3a21]/40 hover:text-[#5c3a21]/60'
                            }`}
                          >
                            Escuro
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className={`relative z-20 w-full px-12 py-8 flex items-center justify-center ${
        isDark ? 'bg-gradient-to-t from-black/80 to-transparent' : 'bg-gradient-to-t from-[#F3EDE3] to-transparent'
      }`}>
        <p className={`cinzel text-[10px] font-bold uppercase tracking-[0.3em] ${
          isDark ? 'text-white/20' : 'text-[#5c3a21]/30'
        }`}>
          O Pergaminho • Sala do Mestre
        </p>
      </footer>
    </div>
  );
};

export default DungeonMasterRoom;
