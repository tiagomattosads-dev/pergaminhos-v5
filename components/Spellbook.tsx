
import React, { useState, useMemo } from 'react';
import { Character, Attribute, Spell } from '../types';
import { getProficiencyFromLevel, getLevelFromXP } from '../constants';
import { translations, attributeTranslations } from '../translations';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  theme?: 'light' | 'dark';
  showClassFeaturesTab?: boolean;
}

interface SpellSealProps {
  label: string;
  sub: string;
  children: React.ReactNode;
  disabled?: boolean;
  isDark: boolean;
}

const SpellSeal: React.FC<SpellSealProps> = ({ label, sub, children, disabled, isDark }) => (
  <div className={`flex flex-col items-center group relative ${disabled ? 'opacity-40 grayscale' : ''}`}>
    <span className={`cinzel text-[7px] sm:text-[9px] font-bold uppercase tracking-[0.2em] mb-3 relative z-10 transition-colors ${
      isDark ? 'text-[#d4af37]/80 group-hover:text-[#d4af37]' : 'text-[#8b4513] group-hover:text-[#d4af37]'
    }`}>
      {label}
    </span>

    <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 shadow-[0_10px_25px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${
      isDark 
        ? 'bg-[#1a1a1a] border-[#333] group-hover:border-[#d4af37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
        : 'bg-[#fdf5e6] border-[#8b4513] group-hover:border-[#d4af37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]'
    }`}>
      
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 rotate-0 group-hover:rotate-45 ${isDark ? 'opacity-[0.1]' : 'opacity-[0.07]'}`}>
        <svg viewBox="0 0 100 100" className={`w-full h-full fill-none stroke-current stroke-[0.5] ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="38" />
          <path d="M50 5 L95 80 L5 80 Z" />
          <path d="M50 95 L5 20 L95 20 Z" />
          <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
        </svg>
      </div>

      <div className={`absolute inset-0 transition-opacity ${isDark ? 'bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.25)_0%,transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]'} opacity-0 group-hover:opacity-100`}></div>
      
      <div className="relative z-20 flex items-center justify-center w-full px-2">
        {children}
      </div>

      <div className={`absolute inset-2 border rounded-full pointer-events-none ${isDark ? 'border-white/5' : 'border-[#8b4513]/10'}`}></div>
    </div>

    <span className="cinzel text-[7px] sm:text-[8px] font-bold opacity-40 mt-3 uppercase tracking-widest relative z-10">
      {sub}
    </span>
  </div>
);

const SpellStatInput = ({ value, onChange, readOnly, isDark, highlight = false }: { 
  value: string | number, 
  onChange: (val: string) => void, 
  readOnly?: boolean, 
  isDark: boolean,
  highlight?: boolean
}) => (
  <input 
    type="text"
    readOnly={readOnly}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`bg-transparent text-3xl sm:text-5xl font-bold fantasy-title text-center outline-none w-full ${
      highlight 
        ? (isDark ? 'text-[#d4af37]' : 'text-[#8b4513]')
        : (isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]')
    } ${readOnly ? '' : '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}`}
  />
);

const Spellbook: React.FC<Props> = ({ character, updateCharacter, theme = 'light', showClassFeaturesTab = true }) => {
  const isDark = theme === 'dark';
  const lang = character.language || 'pt';
  const t = translations[lang];
  const [newSpell, setNewSpell] = useState<Partial<Spell>>({ name: '', level: 0, description: '' });

  const spellcastingConfig = useMemo(() => {
    const ability = character.spellcastingAbility || (Attribute ? Attribute.INT : 'INT' as Attribute);
    const mod = Math.floor(((character.stats[ability] || 10) - 10) / 2);
    const prof = getProficiencyFromLevel(getLevelFromXP(character.xp));
    return {
      enabled: !!character.class && character.class !== 'None',
      ability,
      mod,
      prof,
      dc: 8 + prof + mod,
      attack: mod + prof
    };
  }, [character]);

  const displayDC = character.spellSaveDC || spellcastingConfig.dc;
  const displayAttack = character.spellAttackBonus || (spellcastingConfig.attack >= 0 ? `+${spellcastingConfig.attack}` : spellcastingConfig.attack);
  const displayAbilityName = attributeTranslations[lang][spellcastingConfig.ability];

  const addSpell = () => {
    if (!newSpell.name) return;
    const spells = [...character.spells, { ...newSpell, prepared: false } as Spell];
    updateCharacter({ spells });
    setNewSpell({ name: '', level: 0, description: '' });
  };

  const removeSpell = (name: string) => {
    const spells = character.spells.filter(s => s.name !== name);
    updateCharacter({ spells });
  };

  const togglePrepare = (name: string) => {
    const spells = character.spells.map(s => 
      s.name === name ? { ...s, prepared: !s.prepared } : s
    );
    updateCharacter({ spells });
  };

  const updateSlotTotal = (level: number, total: number) => {
    const slots = { ...character.spellSlots };
    slots[level] = { ...slots[level], total };
    updateCharacter({ spellSlots: slots });
  };

  const toggleSlot = (level: number, used: boolean) => {
    const slots = { ...character.spellSlots };
    const currentUsed = slots[level]?.used || 0;
    slots[level] = { ...slots[level], used: used ? currentUsed + 1 : Math.max(0, currentUsed - 1) };
    updateCharacter({ spellSlots: slots });
  };

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 max-w-6xl mx-auto pb-24">
      
      {/* CABEÇALHO ARCANO (STATS AUTOMÁTICOS/EDITÁVEIS) */}
      <div className="flex flex-wrap justify-center gap-8 sm:gap-20 py-8 relative">
        <div className={`absolute top-1/2 left-20 right-20 h-0.5 -translate-y-1/2 hidden lg:block ${isDark ? 'bg-gradient-to-r from-transparent via-white/5 to-transparent' : 'bg-gradient-to-r from-transparent via-[#8b4513]/10 to-transparent'}`}></div>
        
        <SpellSeal label={t.casting_ability} sub={displayAbilityName} isDark={isDark}>
          {spellcastingConfig.enabled ? (
            <select 
              value={spellcastingConfig.ability}
              onChange={(e) => updateCharacter({ spellcastingAbility: e.target.value as Attribute })}
              className={`bg-transparent text-2xl sm:text-4xl font-bold fantasy-title text-center outline-none cursor-pointer appearance-none w-full relative z-30 ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}
            >
              {Object.values(Attribute).map(attr => (
                <option key={attr} value={attr} className={`cinzel text-sm ${isDark ? 'bg-[#1a1a1a] text-[#e8d5b5]' : 'bg-[#fdf5e6] text-[#3e2723]'}`}>{attr}</option>
              ))}
            </select>
          ) : (
            <span className={`text-2xl sm:text-4xl font-bold fantasy-title ${isDark ? 'text-white/20' : 'text-black/20'}`}>—</span>
          )}
        </SpellSeal>

        <SpellSeal label={t.spell_save_dc} sub={t.difficulty} disabled={!spellcastingConfig.enabled} isDark={isDark}>
          <SpellStatInput 
            readOnly={!spellcastingConfig.enabled}
            value={displayDC}
            onChange={(val) => spellcastingConfig.enabled && updateCharacter({ spellSaveDC: parseInt(val) || 0 })}
            isDark={isDark}
          />
        </SpellSeal>

        <SpellSeal label={t.spell_attack_mod} sub={t.bonus} disabled={!spellcastingConfig.enabled} isDark={isDark}>
          <SpellStatInput 
            readOnly={!spellcastingConfig.enabled}
            value={displayAttack}
            onChange={(val) => spellcastingConfig.enabled && updateCharacter({ spellAttackBonus: val })}
            isDark={isDark}
            highlight={true}
          />
        </SpellSeal>
      </div>

      <div className={!spellcastingConfig.enabled ? 'pointer-events-none opacity-40 grayscale blur-[1px]' : ''}>
        {/* REGISTRO DE NOVA MAGIA */}
        <div className={`border-4 rounded-3xl p-6 shadow-2xl relative overflow-hidden group transition-all ${isDark ? 'bg-[#121212] border-white/10' : 'bg-[#2d1b0d] border-[#8b4513]'}`}>
          
          <div className="relative z-10">
            <h2 className="cinzel text-xs font-bold text-[#d4af37] mb-6 uppercase tracking-[0.3em] border-b border-[#d4af37]/20 pb-2 inline-block">{t.new_spell_title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-6">
                <label className="cinzel text-[8px] font-bold text-[#e8d5b5]/40 uppercase mb-2 block tracking-widest">{t.spell_name}</label>
                <input 
                  className={`w-full border-2 rounded-xl p-3 fantasy-title outline-none focus:border-[#d4af37] transition-all placeholder:italic ${
                    isDark ? 'bg-black/40 border-white/5 text-[#f4e4bc]' : 'bg-black/40 border-[#8b4513]/50 text-[#f4e4bc] placeholder:text-[#8b4513]/40'
                  }`}
                  placeholder={lang === 'pt' ? "Ex: Bola de Fogo, Mãos Flamejantes..." : "Ex: Fireball, Burning Hands..."}
                  value={newSpell.name}
                  onChange={e => setNewSpell({...newSpell, name: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="cinzel text-[8px] font-bold text-[#e8d5b5]/40 uppercase mb-2 block text-center tracking-widest">{t.circle}</label>
                <select 
                  className={`w-full border-2 rounded-xl p-3 cinzel font-bold text-center outline-none focus:border-[#d4af37] transition-all ${
                    isDark ? 'bg-black/40 border-white/5 text-[#f4e4bc]' : 'bg-black/40 border-[#8b4513]/50 text-[#f4e4bc]'
                  }`}
                  value={newSpell.level}
                  onChange={e => setNewSpell({...newSpell, level: parseInt(e.target.value)})}
                >
                  {[0,1,2,3,4,5,6,7,8,9].map(n => <option key={n} value={n} className={isDark ? "bg-[#121212]" : "bg-[#2d1b0d]"}>{n === 0 ? (lang === 'pt' ? 'Truque' : 'Cantrip') : `${n}º`}</option>)}
                </select>
              </div>
              <div className="md:col-span-4">
                <button 
                  onClick={addSpell}
                  className={`w-full h-[52px] rounded-xl cinzel text-[10px] font-bold transition-all shadow-[0_5px_15px_rgba(0,0,0,0.4)] uppercase tracking-[0.2em] border-b-4 active:translate-y-1 active:border-b-0 ${
                    isDark 
                      ? 'bg-[#d4af37] text-[#1a1a1a] border-black/60 hover:bg-[#b8860b]' 
                      : 'bg-gradient-to-b from-[#8b4513] to-[#5d4037] text-[#fdf5e6] hover:from-[#d4af37] hover:to-[#b8860b] hover:text-[#1a0f00] border-black/60'
                  }`}
                >
                  {t.add_to_grimoire}
                </button>
              </div>
              <div className="md:col-span-12">
                 <label className="cinzel text-[8px] font-bold text-[#e8d5b5]/40 uppercase mb-2 block tracking-widest">{t.spell_desc}</label>
                 <textarea 
                   className={`w-full border-2 rounded-xl p-4 parchment-text text-base focus:border-[#d4af37] outline-none resize-none transition-all ${
                     isDark ? 'bg-black/40 border-white/5 text-[#f4e4bc]' : 'bg-black/40 border-[#8b4513]/50 text-[#f4e4bc]'
                   }`}
                   rows={2}
                   placeholder={lang === 'pt' ? "Descreva as propriedades e componentes..." : "Describe properties and components..."}
                   value={newSpell.description}
                   onChange={e => setNewSpell({...newSpell, description: e.target.value})}
                 />
              </div>
            </div>
          </div>
        </div>

        {/* LISTA DE MAGIAS POR CÍRCULO */}
        <div className="flex flex-col gap-12 mt-4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => {
            const circleSpells = character.spells.filter(s => s.level === level);
            if (level > 0 && circleSpells.length === 0 && (!character.spellSlots[level] || character.spellSlots[level].total === 0)) return null;
            if (level === 0 && circleSpells.length === 0) return null;

            return (
              <div key={level} className={`border-2 rounded-3xl shadow-2xl overflow-hidden relative ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
                <div className={`p-5 flex justify-between items-center border-b-2 relative overflow-hidden ${isDark ? 'bg-black/40 border-white/5' : 'bg-[#8b4513] border-[#d4af37]/30'}`}>
                  {/* Textura do Cabeçalho */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leather.png')] mix-blend-overlay"></div>
                  
                  <div className="flex items-center gap-5 relative z-10">
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.5)] ${isDark ? 'bg-black border-[#d4af37]' : 'bg-[#2d1b0d] border-[#d4af37]'}`}>
                      <span className="fantasy-title text-2xl text-[#d4af37]">{level}</span>
                    </div>
                    <h3 className={`cinzel text-sm font-bold tracking-[0.25em] uppercase ${isDark ? 'text-[#d4af37]' : 'text-[#fdf5e6]'}`}>
                      {level === 0 ? t.cantrips : `${level}º ${t.arcane_circle}`}
                    </h3>
                  </div>

                  {level > 0 && (
                    <div className={`relative z-10 flex flex-col sm:flex-row gap-3 items-center px-4 py-2 rounded-xl border shadow-inner ${isDark ? 'bg-black/40 border-white/10' : 'bg-[#fdf5e6]/80 border-[#8b4513]/20'}`}>
                      
                      <div className="flex items-center gap-3">
                        <span className={`cinzel text-[10px] sm:text-xs font-bold uppercase tracking-widest ${isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>{t.spell_slots}</span>
                        
                        <div className={`relative w-10 h-10 flex items-center justify-center rounded-lg border-2 transition-colors shadow-sm ${
                          isDark ? 'bg-[#1a1a1a] border-[#d4af37] hover:bg-[#2d1b0d]' : 'bg-white border-[#8b4513] hover:bg-[#fffacd]'
                        }`}>
                          <select
                            value={character.spellSlots[level]?.total || 0}
                            onChange={(e) => updateSlotTotal(level, parseInt(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          >
                            {[0, 1, 2, 3, 4].map(n => (
                              <option key={n} value={n} className={isDark ? "bg-[#1a1a1a]" : "bg-[#fdf5e6]"}>{n}</option>
                            ))}
                          </select>
                          <span className={`cinzel font-bold text-xl ${isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>
                            {character.spellSlots[level]?.total || 0}
                          </span>
                        </div>
                      </div>

                      {character.spellSlots[level]?.total > 0 && (
                        <>
                          <div className={`hidden sm:block w-px h-6 ${isDark ? 'bg-[#d4af37]/30' : 'bg-[#8b4513]/30'}`}></div>
                          
                          <div className="flex gap-1.5">
                            {[...Array(character.spellSlots[level]?.total || 0)].map((_, i) => (
                              <button
                                key={i}
                                onClick={() => toggleSlot(level, i >= (character.spellSlots[level]?.used || 0))}
                                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all duration-300 shadow-sm ${
                                  i < (character.spellSlots[level]?.used || 0)
                                    ? 'bg-transparent border-current opacity-30 scale-90' 
                                    : (isDark ? 'bg-[#d4af37] border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'bg-[#8b4513] border-[#8b4513] shadow-[0_0_5px_rgba(139,69,19,0.3)]')
                                } ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}
                                title={i < (character.spellSlots[level]?.used || 0) ? (lang === 'pt' ? "Espaço Consumido" : "Slot Consumed") : (lang === 'pt' ? "Disponível" : "Available")}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-0">
                  {circleSpells.length === 0 ? (
                    <div className="p-12 text-center opacity-30 italic cinzel text-xs py-16">
                      {lang === 'pt' ? 'Nenhum feitiço inscrito neste nível de poder.' : 'No spells inscribed at this power level.'}
                    </div>
                  ) : (
                    <div className={`grid grid-cols-1 divide-y-2 ${isDark ? 'divide-white/5' : 'divide-[#8b4513]/5'}`}>
                      {circleSpells.map((spell, idx) => (
                        <div key={idx} className={`p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 group transition-all ${
                          isDark ? 'hover:bg-white/5' : 'hover:bg-[#8b4513]/5'
                        } ${spell.prepared ? (isDark ? 'bg-[#d4af37]/10' : 'bg-[#d4af37]/5') : ''}`}>
                          <div className="flex gap-5 items-start">
                            {level > 0 && (
                              <button 
                                onClick={() => togglePrepare(spell.name)}
                                className={`mt-1 flex-none w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 group/check ${
                                  spell.prepared 
                                  ? (isDark ? 'bg-[#d4af37] border-[#d4af37] text-[#1a1a1a]' : 'bg-[#8b4513] border-[#8b4513] text-[#fdf5e6]') + ' shadow-[0_0_15px_rgba(212,175,55,0.5)] scale-105' 
                                  : (isDark ? 'bg-black/40 border-white/10 text-white/20' : 'bg-[#3d2511]/5 border-[#8b4513]/20 text-[#8b4513]/40') + ' hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10'
                                }`}
                                title={spell.prepared ? (lang === 'pt' ? "Magia Preparada" : "Spell Prepared") : (lang === 'pt' ? "Preparar Magia" : "Prepare Spell")}
                              >
                                {spell.prepared ? (
                                  <svg className="w-7 h-7 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <div className="w-4 h-4 rounded-sm border-2 border-current opacity-50 group-hover/check:opacity-100 transition-opacity" />
                                )}
                              </button>
                            )}
                            <div className="flex flex-col">
                              <span className={`fantasy-title text-2xl ${spell.prepared || level === 0 ? (isDark ? 'text-[#d4af37]' : 'text-[#8b4513]') : (isDark ? 'text-white/20' : 'text-[#8b4513]/30')}`}>
                                {spell.name}
                              </span>
                              <p className={`parchment-text text-sm leading-relaxed mt-2 italic border-l-2 pl-4 ${isDark ? 'text-[#e8d5b5]/70 border-white/10' : 'text-[#5d4037]/80 border-[#8b4513]/10'}`}>
                                {spell.description || (lang === 'pt' ? "Nenhuma anotação rúnica encontrada." : "No runic notes found.")}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                               onClick={() => removeSpell(spell.name)}
                               className={`p-3 transition-all rounded-xl ${isDark ? 'text-red-400 hover:bg-white/5' : 'text-red-900/50 hover:text-red-700 hover:bg-red-100'}`}
                               title={lang === 'pt' ? "Remover do Grimório" : "Remove from Grimoire"}
                             >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                             </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Spellbook;
