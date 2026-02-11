import React, { useState } from 'react';
import { Character } from '../types';
import { translations, classTranslations, subclassTranslations } from '../translations';
import { SUBCLASS_LEVELS } from '../constants';
import { BARBARIAN_FEATURES, WARRIOR_FEATURES, ROGUE_FEATURES, FeatureInfo } from '../data/classFeaturesData';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  onSelectSubclass: () => void;
  theme?: 'light' | 'dark';
}

const FIGHTING_STYLES_PHB = [
  { 
    name: 'DEFESA', 
    description: 'Enquanto estiver usando armadura, você recebe +1 na Classe de Armadura.' 
  },
  { 
    name: 'ARQUEARIA', 
    description: 'Você recebe +2 nas jogadas de ataque feitas com armas à distância.' 
  },
  { 
    name: 'DUELO', 
    description: 'Quando empunha uma arma corpo a corpo em uma mão e nenhuma outra arma, você recebe +2 nas jogadas de dano com essa arma.' 
  },
  { 
    name: 'COMBATE COM DUAS ARMAS', 
    description: 'Quando estiver lutando com duas armas, você pode adicionar seu modificador de atributo ao dano do ataque feito como ação bônus.' 
  },
  { 
    name: 'PROTEÇÃO', 
    description: 'Quando uma criatura que você possa ver ataca um alvo que não seja você, a até 1,5 metro, você pode usar sua reação para impor desvantagem na jogada de ataque, desde que esteja usando um escudo.' 
  },
  { 
    name: 'GRANDE ARMA', 
    description: 'Quando rolar 1 ou 2 no dado de dano de uma arma corpo a corpo empunhada com duas mãos, você pode rerrolar o dado e deve usar o novo resultado.' 
  },
];

const ClassFeatures: React.FC<Props> = ({ character, updateCharacter, onSelectSubclass, theme = 'light' }) => {
  const isDark = theme === 'dark';
  const lang = character.language || 'pt';
  const t = translations[lang];

  const [showStyleModal, setShowStyleModal] = useState(false);
  const [styleSlotTarget, setStyleSlotTarget] = useState<number>(0);

  const translateValue = (val: string, dictionary: Record<string, { pt: string, en: string }>) => {
    return dictionary[val] ? dictionary[val][lang] : val;
  };

  if (!character.class) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center opacity-40">
        <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        <p className="cinzel text-lg uppercase tracking-widest">{t.select_class_first}</p>
      </div>
    );
  }

  const subclassChoiceLevel = SUBCLASS_LEVELS[character.class] || 3;
  const isLevelForSubclass = character.level >= subclassChoiceLevel;
  const needsSubclass = isLevelForSubclass && !character.subclass;

  const getFeaturesForLevel = (level: number): FeatureInfo[] => {
    let baseFeatures: FeatureInfo[] = [];
    if (character.class === "Bárbaro") baseFeatures = BARBARIAN_FEATURES;
    if (character.class === "Guerreiro") baseFeatures = WARRIOR_FEATURES;
    if (character.class === "Ladino") baseFeatures = ROGUE_FEATURES;

    return baseFeatures.filter(f => {
      if (f.level !== level) return false;
      if (!f.subclass) return true;
      return f.subclass === character.subclass;
    });
  };

  const selectFightingStyle = (styleName: string) => {
    const currentStyles = [...(character.fightingStyles || [])];
    currentStyles[styleSlotTarget] = styleName;
    updateCharacter({ fightingStyles: currentStyles });
    setShowStyleModal(false);
  };

  const CornerOrnament = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={`absolute w-12 h-12 opacity-20 pointer-events-none ${className}`}>
      <path d="M10 10 L40 10 M10 10 L10 40 M10 10 L30 30" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="10" r="3" fill="currentColor" />
    </svg>
  );

  const ActionBadge = ({ type }: { type?: string }) => {
    if (!type) return null;
    
    // Cores baseadas em palavras-chave para suportar os novos tipos compostos
    let bgColor = isDark ? 'bg-slate-800/40' : 'bg-slate-50';
    let textColor = isDark ? 'text-slate-400' : 'text-slate-800';
    let borderColor = isDark ? 'border-slate-700/40' : 'border-slate-200';

    if (type.includes('Ativa')) {
      bgColor = isDark ? 'bg-red-950/40' : 'bg-red-50';
      textColor = isDark ? 'text-red-400' : 'text-red-800';
      borderColor = isDark ? 'border-red-900/40' : 'border-red-200';
    } else if (type.includes('Ação Bônus')) {
      bgColor = isDark ? 'bg-amber-950/40' : 'bg-amber-50';
      textColor = isDark ? 'text-amber-400' : 'text-amber-800';
      borderColor = isDark ? 'border-amber-900/40' : 'border-amber-200';
    } else if (type.includes('Reação')) {
      bgColor = isDark ? 'bg-blue-950/40' : 'bg-blue-400'; 
      textColor = isDark ? 'text-blue-400' : 'text-blue-800';
      borderColor = isDark ? 'border-blue-900/40' : 'border-blue-200';
    } else if (type.includes('Passiva')) {
      bgColor = isDark ? 'bg-emerald-950/40' : 'bg-emerald-50';
      textColor = isDark ? 'text-emerald-400' : 'text-emerald-800';
      borderColor = isDark ? 'border-emerald-900/40' : 'border-emerald-200';
    } else if (type.includes('Upgrade')) {
      bgColor = isDark ? 'bg-amber-400/10' : 'bg-yellow-50';
      textColor = isDark ? 'text-amber-500' : 'text-yellow-800';
      borderColor = isDark ? 'border-amber-500/20' : 'border-yellow-200';
    } else if (type.includes('Estrutural')) {
      bgColor = isDark ? 'bg-slate-800/40' : 'bg-slate-50';
      textColor = isDark ? 'text-slate-400' : 'text-slate-800';
      borderColor = isDark ? 'border-slate-700/40' : 'border-slate-200';
    } else if (type.includes('Condicional')) {
      bgColor = isDark ? 'bg-indigo-950/40' : 'bg-indigo-50';
      textColor = isDark ? 'text-indigo-400' : 'text-indigo-800';
      borderColor = isDark ? 'border-indigo-900/40' : 'border-indigo-200';
    }

    return (
      <span className={`px-2 py-0.5 rounded text-[8px] cinzel font-bold uppercase tracking-widest border ${bgColor} ${textColor} ${borderColor}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="flex flex-col p-4 sm:p-8 max-w-5xl mx-auto gap-10 pb-40">
      
      {needsSubclass && (
        <div className={`p-10 border-4 border-double rounded-[3rem] animate-pulse shadow-[0_0_50px_rgba(212,175,55,0.2)] flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden ${isDark ? 'bg-[#1a0f00] border-[#d4af37]/40' : 'bg-orange-50 border-[#8b4513]/30'}`}>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="flex items-center gap-6 relative z-10">
            <div className={`w-20 h-20 rounded-3xl border-2 flex items-center justify-center rotate-45 flex-none shadow-2xl ${isDark ? 'bg-black border-[#d4af37] text-[#d4af37]' : 'bg-[#2d1b0d] border-[#d4af37] text-[#d4af37]'}`}>
               <svg className="w-10 h-10 -rotate-45" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
            </div>
            <div className="text-center sm:text-left">
              <p className={`fantasy-title text-3xl tracking-widest mb-1 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
                {lang === 'pt' ? 'Seu caminho ainda não foi selado' : 'Your path has yet to be sealed'}
              </p>
              <p className={`parchment-text text-base italic opacity-80 ${isDark ? 'text-[#e8d5b5]' : 'text-[#5d4037]'}`}>
                {lang === 'pt' ? 'Reivindique sua especialização para despertar novos poderes.' : 'Claim your specialization to awaken new powers.'}
              </p>
            </div>
          </div>
          <button 
            onClick={onSelectSubclass}
            className={`px-12 py-5 rounded-2xl cinzel text-sm font-bold uppercase tracking-[0.3em] transition-all border-b-6 hover:scale-105 active:translate-y-1 active:border-b-0 shadow-2xl relative z-10 ${
              isDark ? 'bg-[#d4af37] text-black border-black/40' : 'bg-[#8b4513] text-white border-black/40'
            }`}
          >
            {lang === 'pt' ? 'ESCOLHER CAMINHO' : 'CHOOSE PATH'}
          </button>
        </div>
      )}

      <div className={`border-4 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col items-center sm:items-start sm:flex-row gap-10 ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
        <CornerOrnament className="top-4 left-4" />
        <CornerOrnament className="top-4 right-4 rotate-90" />
        <CornerOrnament className="bottom-4 left-4 -rotate-90" />
        <CornerOrnament className="bottom-4 right-4 rotate-180" />

        <div className={`w-28 h-28 rounded-full flex items-center justify-center border-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex-none relative ${isDark ? 'bg-black border-[#d4af37]/40 text-[#d4af37]' : 'bg-[#2d1b0d] border-[#d4af37]/40 text-[#d4af37]'}`}>
          <div className="absolute inset-2 border border-current rounded-full opacity-20"></div>
          <span className="fantasy-title text-5xl drop-shadow-lg">{character.level}</span>
          <div className="absolute -bottom-2 cinzel text-[8px] font-bold uppercase tracking-[0.3em] bg-current text-black px-2 py-0.5 rounded shadow">LVL</div>
        </div>

        <div className="flex flex-col text-center sm:text-left flex-grow relative z-10">
          <h2 className={`fantasy-title text-4xl sm:text-6xl drop-shadow-md leading-tight ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>
            {translateValue(character.class, classTranslations)}
          </h2>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3">
             {character.subclass ? (
               <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <span className={`fantasy-title text-2xl ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
                  {translateValue(character.subclass, subclassTranslations)}
                </span>
                {character.totemAnimal && (
                  <span className={`cinzel text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${isDark ? 'bg-[#d4af37]/10 border-[#d4af37]/20 text-[#d4af37]' : 'bg-[#8b4513]/10 border-[#8b4513]/20 text-[#8b4513]'}`}>
                    {character.totemAnimal}
                  </span>
                )}
                <button 
                  onClick={onSelectSubclass}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg cinzel text-[8px] font-extrabold uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 ${
                    isDark ? 'bg-white/5 border-white/10 text-[#d4af37]/60 hover:text-[#d4af37]' : 'bg-black/5 border-black/10 text-[#8b4513]/60 hover:text-[#8b4513]'
                  }`}
                  title={t.change_subclass}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  {t.manage}
                </button>
               </div>
             ) : (
               <span className={`cinzel text-xs font-bold uppercase tracking-[0.4em] opacity-40 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
                 {lang === 'pt' ? 'SEM ESPECIALIZAÇÃO' : 'NO SPECIALIZATION'}
               </span>
             )}
          </div>
        </div>

        {!character.subclass && isLevelForSubclass && (
          <button 
            onClick={onSelectSubclass}
            className={`mt-6 sm:mt-0 sm:ml-auto px-8 py-4 rounded-xl cinzel text-[10px] font-bold uppercase tracking-[0.3em] transition-all border-b-6 active:translate-y-1 active:border-b-0 shadow-xl ${
              isDark ? 'bg-[#d4af37] text-black border-black/60' : 'bg-[#8b4513] text-white border-black/60'
            }`}
          >
            {t.choose_subclass}
          </button>
        )}
      </div>

      <div className="space-y-16">
        <div className="flex items-center gap-6 opacity-30">
          <div className="h-px flex-1 bg-current"></div>
          <h3 className={`cinzel text-[10px] font-bold uppercase tracking-[0.5em] text-center`}>
            {t.features_by_level}
          </h3>
          <div className="h-px flex-1 bg-current"></div>
        </div>

        <div className="grid grid-cols-1 gap-12 relative">
          <div className={`absolute left-[19px] sm:left-[23px] top-4 bottom-4 w-1 hidden sm:block opacity-10 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`}></div>

          {[...Array(20)].map((_, i) => {
            const level = i + 1;
            const isUnlocked = level <= character.level;
            const levelFeatures = getFeaturesForLevel(level);
            
            if (!isUnlocked) {
               return (
                <div key={level} className="group relative flex gap-8 items-start opacity-20 grayscale transition-all duration-700">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-none border-2 bg-black/20 border-white/5`}>
                    <span className="fantasy-title text-xl text-white/30">{level}</span>
                  </div>
                  <div className={`flex-grow border-2 border-dashed rounded-3xl p-8 relative overflow-hidden ${isDark ? 'bg-black/10 border-white/5' : 'bg-black/5 border-black/5'}`}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <h4 className="cinzel font-bold text-[10px] tracking-[0.3em] uppercase opacity-40">
                          {lang === 'pt' ? `DESBLOQUEIA NO NÍVEL ${level}` : `UNLOCKS AT LEVEL ${level}`}
                        </h4>
                        <div className="h-0.5 w-16 bg-current opacity-10 rounded-full"></div>
                      </div>
                      <div className="w-10 h-10 flex-none opacity-20">
                         <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
               );
            }

            return (
              <div key={level} className="group relative flex gap-8 items-start transition-all duration-500">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-none border-2 shadow-2xl transition-all group-hover:scale-110 z-20 ${
                  isDark 
                    ? 'bg-[#d4af37] border-white/20 text-black' 
                    : 'bg-[#8b4513] border-[#d4af37] text-[#fdf5e6]'
                }`}>
                  <span className="fantasy-title text-2xl">{level}</span>
                </div>

                <div className="flex-grow flex flex-col gap-6">
                  {levelFeatures.length === 0 ? (
                    <div className={`border-2 rounded-[2rem] p-8 sm:p-10 shadow-xl opacity-40 ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-[#8b4513]/10'}`}>
                       <h4 className={`cinzel font-bold text-sm tracking-[0.3em] uppercase mb-3 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
                         {t.feature} de Nível {level}
                       </h4>
                       <p className="parchment-text italic text-sm leading-relaxed">
                         {lang === 'pt' ? 'Aprimoramento das capacidades naturais e instintos básicos.' : 'Honing of natural capabilities and basic instincts.'}
                       </p>
                    </div>
                  ) : (
                    levelFeatures.map((f, idx) => {
                      const isStyleSlot = f.name === "Estilo de Luta" || f.name === "Estilo de Combate Adicional";
                      const slotIdx = f.name === "Estilo de Luta" ? 0 : 1;
                      const selectedStyleName = character.fightingStyles?.[slotIdx];
                      const styleData = selectedStyleName ? FIGHTING_STYLES_PHB.find(s => s.name === selectedStyleName) : null;

                      return (
                        <div 
                          key={idx} 
                          className={`border-2 rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden transition-all group/card hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] ${
                            f.isKey 
                              ? (isDark ? 'bg-[#1a1a1a] border-[#d4af37]/40 ring-1 ring-[#d4af37]/20' : 'bg-white border-[#8b4513]/40 ring-1 ring-[#8b4513]/10')
                              : (isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-[#8b4513]/10')
                          }`}
                        >
                          {f.isKey && (
                            <div className={`absolute -right-12 -top-12 w-24 h-24 rotate-45 pointer-events-none opacity-20 ${isDark ? 'bg-[#d4af37]' : 'bg-[#8b4513]'}`}></div>
                          )}
                          
                          <div className="flex flex-col gap-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                  <h4 className={`fantasy-title text-3xl tracking-wide group-hover/card:text-[#d4af37] transition-colors ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>
                                    {isStyleSlot && styleData ? `${t.fighting_style} — ${styleData.name}` : f.name}
                                  </h4>
                                  {f.subclass && (
                                    <span className={`px-2 py-0.5 rounded border text-[7px] cinzel font-bold uppercase tracking-widest ${
                                      isDark ? 'bg-[#8b4513]/20 border-[#8b4513]/40 text-[#d4af37]' : 'bg-orange-50 border-[#8b4513]/20 text-[#8b4513]'
                                    }`}>
                                      {lang === 'pt' ? 'VÍNCULO DE CAMINHO' : 'PATH BOND'}
                                    </span>
                                  )}
                                </div>
                                {(f.summary || isStyleSlot) && (
                                  <p className={`cinzel text-[10px] font-bold tracking-widest opacity-60 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
                                    {isStyleSlot ? (styleData ? t.saves : t.fighting_style_modal_desc) : f.summary}
                                  </p>
                                )}
                              </div>
                              <ActionBadge type={isStyleSlot && styleData ? 'Passiva' : f.actionType} />
                            </div>
                            
                            <div className={`relative p-1 border-l-4 rounded-r-xl ${isDark ? 'border-[#d4af37]/20 bg-white/5' : 'border-[#8b4513]/20 bg-black/5'}`}>
                              <p className={`parchment-text text-lg leading-relaxed p-4 italic ${isDark ? 'text-[#e8d5b5]/90' : 'text-[#3e2723]/90'}`}>
                                "{isStyleSlot && styleData ? styleData.description : f.description}"
                              </p>
                            </div>

                            {isStyleSlot && (
                              <div className="mt-4 flex gap-3">
                                {!styleData ? (
                                  <button 
                                    onClick={() => { setStyleSlotTarget(slotIdx); setShowStyleModal(true); }}
                                    className={`px-8 py-3 rounded-xl cinzel text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-b-4 active:translate-y-1 active:border-b-0 shadow-lg ${
                                      isDark ? 'bg-[#d4af37] text-black border-black/40' : 'bg-[#8b4513] text-white border-black/40'
                                    }`}
                                  >
                                    {t.choose_fighting_style}
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => { setStyleSlotTarget(slotIdx); setShowStyleModal(true); }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg cinzel text-[8px] font-bold uppercase tracking-widest transition-all opacity-40 hover:opacity-100 ${
                                      isDark ? 'text-[#d4af37] border border-[#d4af37]/20' : 'text-[#8b4513] border border-[#8b4513]/20'
                                    }`}
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    {t.change_fighting_style}
                                  </button>
                                )}
                              </div>
                            )}

                            {character.subclass === "Caminho do Guerreiro Totêmico" && f.name === "Totem Espiritual" && (
                              <div className={`mt-8 p-6 rounded-2xl border-2 border-dashed ${isDark ? 'bg-[#d4af37]/5 border-[#d4af37]/20' : 'bg-orange-100/30 border-[#8b4513]/20'}`}>
                                 <p className="cinzel text-[10px] font-bold uppercase tracking-[0.3em] mb-6 opacity-60 text-center">{lang === 'pt' ? 'CONVOCAR ESPÍRITO GUARDIÃO' : 'SUMMON GUARDIAN SPIRIT'}</p>
                                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {["Águia", "Lobo", "Urso"].map(totem => (
                                      <button
                                        key={totem}
                                        onClick={() => updateCharacter({ totemAnimal: totem })}
                                        className={`p-4 rounded-xl cinzel text-xs font-bold uppercase transition-all border-2 relative group/totem ${
                                          character.totemAnimal === totem
                                          ? (isDark ? 'bg-[#d4af37] border-white text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105' : 'bg-[#8b4513] border-[#d4af37] text-white shadow-xl scale-105')
                                          : (isDark ? 'bg-black/60 border-white/5 text-white/40 hover:border-[#d4af37]/40' : 'bg-white border-[#8b4513]/10 text-[#8b4513]/40 hover:border-[#8b4513]')
                                        }`}
                                      >
                                        {totem}
                                      </button>
                                    ))}
                                 </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showStyleModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
           <div className={`relative max-w-2xl w-full border-4 rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,1)] overflow-hidden flex flex-col ${isDark ? 'bg-[#1a1a1a] border-[#333]' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
              <div className={`absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]`}></div>
              
              <div className={`p-8 sm:p-10 relative z-10 flex flex-col`}>
                 <button 
                   onClick={() => setShowStyleModal(false)}
                   className="absolute top-8 right-8 text-[#d4af37] opacity-40 hover:opacity-100 transition-opacity"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>

                 <h2 className={`fantasy-title text-4xl mb-2 ${isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>
                   {t.fighting_style}
                 </h2>
                 <p className={`parchment-text text-base italic opacity-70 mb-8 ${isDark ? 'text-[#e8d5b5]' : 'text-[#5d4037]'}`}>
                   {t.fighting_style_modal_desc}
                 </p>

                 <div className="w-full space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                    {FIGHTING_STYLES_PHB.map(style => {
                      const isAlreadyChosen = character.fightingStyles?.some((s, idx) => s === style.name && idx !== styleSlotTarget);
                      
                      return (
                        <div 
                          key={style.name}
                          className={`p-6 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-center gap-6 ${
                            isAlreadyChosen 
                            ? 'opacity-30 grayscale cursor-not-allowed border-black/10' 
                            : (isDark ? 'bg-white/5 border-white/5 hover:border-[#d4af37]/40' : 'bg-white border-[#8b4513]/10 hover:border-[#8b4513]/40')
                          }`}
                        >
                           <div className="flex-grow text-center sm:text-left">
                              <h4 className={`fantasy-title text-xl mb-1 ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>{style.name}</h4>
                              <p className="parchment-text text-sm opacity-80 leading-relaxed italic">"{style.description}"</p>
                           </div>
                           <button 
                             disabled={isAlreadyChosen}
                             onClick={() => selectFightingStyle(style.name)}
                             className={`px-6 py-2 rounded-lg cinzel text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                               isAlreadyChosen
                               ? 'bg-transparent text-gray-500 border border-gray-500/20'
                               : (isDark ? 'bg-[#d4af37] text-black hover:brightness-110 shadow-lg' : 'bg-[#8b4513] text-white hover:brightness-110 shadow-lg')
                             }`}
                           >
                             {isAlreadyChosen ? t.already_selected : t.select_btn}
                           </button>
                        </div>
                      );
                    })}
                 </div>

                 <div className="mt-8 pt-6 border-t border-black/10">
                    <button 
                      onClick={() => setShowStyleModal(false)}
                      className={`w-full py-3 rounded-xl cinzel text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity`}
                    >
                      {t.cancel}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ClassFeatures;