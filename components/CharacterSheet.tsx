
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Character, Attribute, Skill, Weapon, OtherAttack, Companion, CompanionAttack } from '../types';
import { SKILLS, CLASSES_PHB, getLevelFromXP, getProficiencyFromLevel, SUBCLASSES_PHB } from '../constants';
import { translations, attributeTranslations, attributeAbbreviations, skillTranslations, classTranslations, raceTranslations, alignmentTranslations } from '../translations';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  onImageUpload: (file: File) => void;
  theme?: 'light' | 'dark';
  abbreviateAttributes?: boolean;
  showClassFeaturesTab?: boolean;
}

const DEFAULT_COMPANION: Companion = {
  enabled: true,
  name: "Companheiro",
  species: "Lobo",
  stats: {
    [Attribute.FOR]: 12, [Attribute.DES]: 15, [Attribute.CON]: 12,
    [Attribute.INT]: 3, [Attribute.SAB]: 12, [Attribute.CAR]: 6
  },
  ac: 13,
  hp: { current: 11, max: 11 },
  hitDice: "2d8",
  speed: "12m",
  initiative: 0,
  skillsProficient: [],
  attacks: [],
  personalityTrait: "",
  flaw: ""
};

const CharacterSheet: React.FC<Props> = ({ character, updateCharacter, onImageUpload, theme = 'light', abbreviateAttributes = false, showClassFeaturesTab = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [combatTab, setCombatTab] = useState<'weapons' | 'attacks'>('weapons');
  const [hpTab, setHpTab] = useState<'hp' | 'death'>('hp');
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [portraitError, setPortraitError] = useState(false);
  const [isCompanionExpanded, setIsCompanionExpanded] = useState(true);
  const [languagesInput, setLanguagesInput] = useState(character.proficiencies.languages.join(', '));
  
  const lang = character.language || 'pt';
  const t = translations[lang];
  const attrT = attributeTranslations;
  const attrAbbrT = attributeAbbreviations;
  
  const getModifier = (score: number) => Math.floor((score - 10) / 2);
  const isDark = theme === 'dark';

  const translateValue = (val: string, dictionary: Record<string, { pt: string, en: string }>) => {
    return dictionary[val] ? dictionary[val][lang] : val;
  };

  useEffect(() => {
    setPortraitError(false);
  }, [character.id, character.portrait]);

  useEffect(() => {
    setLanguagesInput(character.proficiencies.languages.join(', '));
  }, [character.proficiencies.languages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsClassDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profBonus = useMemo(() => {
    if (character.proficiencyBonusOverride !== undefined) {
      return character.proficiencyBonusOverride;
    }
    const currentLevel = getLevelFromXP(character.exp);
    return getProficiencyFromLevel(currentLevel);
  }, [character.exp, character.proficiencyBonusOverride]);

  const passivePerception = useMemo(() => {
    const wisMod = getModifier(character.stats[Attribute.SAB]);
    const isProficient = character.proficiencies.skills.includes('Percepção');
    return 10 + wisMod + (isProficient ? profBonus : 0);
  }, [character.stats, character.proficiencies.skills, profBonus]);

  const StatBoxMedallion: React.FC<{ attr: Attribute, score: number }> = ({ attr, score }) => {
    const mod = getModifier(score);
    const modDisplay = mod >= 0 ? `+${mod}` : mod;
    const displayName = abbreviateAttributes ? attrAbbrT[attr][lang] : attrT[attr][lang];
    
    return (
      <div className="flex flex-col items-center group relative w-full max-w-[110px] mx-auto">
        <div className={`relative w-full aspect-square border-2 rounded-lg shadow-md flex flex-col items-center justify-center transition-all bg-[url('https://www.transparenttextures.com/patterns/p6.png')] ${
          isDark 
            ? 'bg-[#1a1a1a] border-[#333] group-hover:border-[#d4af37] shadow-black/50' 
            : 'bg-[#fdf5e6] border-[#8b4513] group-hover:border-[#d4af37]'
        }`}>
          <span className={`absolute -top-3 text-[10px] px-2.5 py-0.5 rounded-sm font-bold cinzel tracking-widest border z-30 shadow-sm uppercase ${
            isDark 
              ? 'bg-[#d4af37] text-[#1a1a1a] border-[#fffacd]/20' 
              : 'bg-[#8b4513] text-[#fdf5e6] border-[#d4af37]/40'
          }`}>
            {displayName}
          </span>
          <div className="flex items-center justify-center w-full h-full px-1">
            <input 
              type="number"
              max={30}
              min="0"
              value={score}
              onChange={(e) => {
                let val = parseInt(e.target.value) || 0;
                if (val > 30) val = 30;
                updateCharacter({ stats: { ...character.stats, [attr]: val } });
              }}
              className={`text-4xl sm:text-5xl font-bold fantasy-title bg-transparent w-full text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'
              }`}
            />
          </div>
          <div className={`absolute -bottom-4 w-10 h-10 border-2 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-20 ${
            isDark 
              ? 'bg-[#222] border-[#444] text-[#d4af37]' 
              : 'bg-[#fdf5e6] border-[#8b4513] text-[#8b4513] bg-[radial-gradient(#fff_0%,#fdf5e6_100%)]'
          }`}>
             <span className="text-xl font-bold cinzel relative z-10">{modDisplay}</span>
          </div>
        </div>
      </div>
    );
  };

  const toggleSkill = (skillName: string) => {
    const currentSkills = [...character.proficiencies.skills];
    const index = currentSkills.indexOf(skillName);
    if (index > -1) currentSkills.splice(index, 1);
    else currentSkills.push(skillName);
    updateCharacter({ proficiencies: { ...character.proficiencies, skills: currentSkills } });
  };

  const toggleSave = (attr: Attribute) => {
    const currentSaves = [...character.proficiencies.saves];
    const index = currentSaves.indexOf(attr);
    if (index > -1) currentSaves.splice(index, 1);
    else currentSaves.push(attr);
    updateCharacter({ proficiencies: { ...character.proficiencies, saves: currentSaves } });
  };

  const toggleDeathSave = (type: 'successes' | 'failures', index: number) => {
    const currentVal = character.deathSaves[type];
    const newVal = index === currentVal ? index - 1 : index;
    updateCharacter({ deathSaves: { ...character.deathSaves, [type]: Math.max(0, newVal) } });
  };

  const handleClassChange = (selectedClass: string) => {
    const allowedSubclasses = SUBCLASSES_PHB[selectedClass] || [];
    const currentSubclass = character.subclass;
    
    const updates: Partial<Character> = { 
      class: selectedClass, 
      classMetadata: CLASSES_PHB[selectedClass] 
    };

    if (selectedClass !== "Guerreiro") {
      updates.fightingStyles = [];
    }

    if (selectedClass !== "Bárbaro") {
      updates.totemAnimal = null;
    }

    if (currentSubclass && !allowedSubclasses.includes(currentSubclass)) {
      updates.subclass = null;
    }

    updateCharacter(updates);
    setIsClassDropdownOpen(false);
  };

  const isCompanionVisible = character.class === "Patrulheiro" && 
                             character.subclass === "Mestre das Bestas" && 
                             character.level >= 3;

  const updateCompanion = (updates: Partial<Companion>) => {
    updateCharacter({ companion: { ...(character.companion || DEFAULT_COMPANION), ...updates } });
  };

  const toggleCompanionSkill = (skillName: string) => {
    const current = character.companion?.skillsProficient || [];
    const idx = current.indexOf(skillName);
    let next = [...current];
    if (idx > -1) next.splice(idx, 1);
    else if (current.length < 2) next.push(skillName);
    updateCompanion({ skillsProficient: next });
  };

  const addCompanionAttack = () => {
    const next = [...(character.companion?.attacks || []), { name: "Mordida", type: "Corpo a Corpo", reach: "1.5m", bonus: "+0", damage: "1d6" }];
    updateCompanion({ attacks: next });
  };

  return (
    <div className="flex flex-col p-2 sm:p-4 lg:p-6 pb-12 gap-6">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && onImageUpload(e.target.files[0])} />

      <section className={`grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl border shadow-inner ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-[#8b4513]/5 border-[#8b4513]/20'
      }`}>
        <div className="flex flex-col relative" ref={dropdownRef}>
          <label className={`cinzel text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{t.class}</label>
          {showClassFeaturesTab ? (
            <>
              <button 
                onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                className={`flex items-center justify-between w-full bg-transparent border-b outline-none fantasy-title text-base sm:text-lg px-1 transition-colors h-[28px] sm:h-[32px] text-left group ${
                  isDark ? 'border-white/10 focus:border-[#d4af37] text-[#e8d5b5]' : 'border-[#8b4513]/20 focus:border-[#8b4513] text-[#3e2723]'
                }`}
              >
                <span className="truncate">{translateValue(character.class, classTranslations)}</span>
                <svg 
                  className={`w-3 h-3 transition-transform duration-300 opacity-40 group-hover:opacity-100 ${isClassDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isClassDropdownOpen && (
                <div className={`absolute top-full left-0 right-0 mt-2 z-[200] border-2 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 ${
                  isDark ? 'bg-[#1a1a1a] border-[#333]' : 'bg-[#fdf5e6] border-[#8b4513]'
                }`}>
                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                    {Object.keys(CLASSES_PHB).map(cls => (
                      <button
                        key={cls}
                        onClick={() => handleClassChange(cls)}
                        className={`w-full text-left px-4 py-3 fantasy-title text-base sm:text-lg transition-all border-b last:border-b-0 ${
                          character.class === cls 
                            ? (isDark ? 'bg-[#d4af37] text-black' : 'bg-[#8b4513] text-[#fdf5e6]')
                            : (isDark ? 'text-[#e8d5b5] border-white/5 hover:bg-white/5' : 'text-[#3e2723] border-[#8b4513]/10 hover:bg-[#8b4513]/5')
                        }`}
                      >
                        {translateValue(cls, classTranslations)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <input 
              value={character.class}
              onChange={(e) => updateCharacter({ class: e.target.value })}
              className={`bg-transparent border-b outline-none fantasy-title text-base sm:text-lg px-1 transition-colors h-[28px] sm:h-[32px] ${
                isDark ? 'border-white/10 focus:border-[#d4af37] text-[#e8d5b5]' : 'border-[#8b4513]/20 focus:border-[#8b4513] text-[#3e2723]'
              }`}
            />
          )}
        </div>

        {[
          { label: t.race, value: character.race, key: 'race', dict: raceTranslations },
          { label: t.background, value: character.background, key: 'background', dict: null },
          { label: t.alignment, value: character.alignment, key: 'alignment', dict: alignmentTranslations }
        ].map((field) => (
          <div key={field.key} className="flex flex-col">
            <label className={`cinzel text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{field.label}</label>
            <input 
              value={field.dict ? translateValue(field.value, field.dict as Record<string, {pt:string, en:string}>) : field.value} 
              onChange={(e) => updateCharacter({ [field.key]: e.target.value })}
              className={`bg-transparent border-b outline-none fantasy-title text-base sm:text-lg px-1 transition-colors h-[28px] sm:h-[32px] ${
                isDark ? 'border-white/10 focus:border-[#d4af37] text-[#e8d5b5]' : 'border-[#8b4513]/20 focus:border-[#8b4513] text-[#3e2723]'
              }`}
            />
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <section className="lg:col-span-2 flex flex-col gap-6 order-2 lg:order-1">
           <div className={`border-2 p-4 rounded-2xl shadow-inner ${isDark ? 'bg-black/20 border-white/5' : 'bg-[#fdf5e6]/70 border-[#8b4513]/20'}`}>
              <h3 className={`cinzel text-xs font-bold text-center mb-10 uppercase tracking-[0.2em] border-b pb-2 ${isDark ? 'text-[#d4af37] border-white/5' : 'text-[#8b4513] border-[#8b4513]/10'}`}>{t.attributes}</h3>
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-1 gap-y-12 gap-x-4">
                {(Object.entries(character.stats) as [Attribute, number][]).map(([attr, score]) => (
                  <StatBoxMedallion key={attr} attr={attr} score={score} />
                ))}
              </div>
           </div>
        </section>

        <section className="lg:col-span-6 flex flex-col gap-6 order-1 lg:order-2">
          <div className="flex flex-col md:flex-row lg:flex-col gap-6">
            <div className={`border-2 p-3 rounded-2xl shadow-xl flex flex-col items-center gap-4 relative ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
              <div className="w-full flex justify-between items-center z-10">
                <div className={`flex flex-col items-center backdrop-blur-sm border p-1.5 rounded-lg w-16 shadow-sm ${isDark ? 'bg-black/40 border-white/10' : 'bg-white/70 border-[#8b4513]/20'}`}>
                  <span className={`text-[8px] cinzel font-bold uppercase tracking-wider ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{t.prof_bonus}</span>
                  <div className="flex items-center justify-center w-full">
                    <span className={`text-lg font-bold fantasy-title ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>+</span>
                    <input 
                      type="number" 
                      value={character.proficiencyBonusOverride !== undefined ? character.proficiencyBonusOverride : profBonus} 
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                           updateCharacter({ proficiencyBonusOverride: undefined });
                        } else {
                           updateCharacter({ proficiencyBonusOverride: parseInt(val) });
                        }
                      }} 
                      className={`w-8 text-center bg-transparent focus:outline-none font-bold text-lg fantasy-title [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`} 
                    />
                  </div>
                </div>
                <div className={`flex flex-col items-center backdrop-blur-sm border p-1.5 rounded-lg w-20 shadow-sm ${isDark ? 'bg-black/40 border-white/10' : 'bg-white/70 border-[#8b4513]/20'}`}>
                  <span className={`text-[6px] cinzel font-bold uppercase tracking-wider text-center leading-tight ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{t.passive_perception}</span>
                  <span className={`text-lg font-bold fantasy-title ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>{passivePerception}</span>
                </div>
                <div className={`flex flex-col items-center backdrop-blur-sm border p-1.5 rounded-lg w-16 shadow-sm ${isDark ? 'bg-black/40 border-white/10' : 'bg-white/70 border-[#8b4513]/20'}`}>
                  <span className={`text-[8px] cinzel font-bold uppercase tracking-wider ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{t.inspiration}</span>
                  <input 
                    type="number" 
                    value={character.inspiration} 
                    onChange={(e) => updateCharacter({ inspiration: parseInt(e.target.value) || 0 })} 
                    className={`w-full text-center bg-transparent focus:outline-none font-bold text-lg fantasy-title [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`} 
                  />
                </div>
              </div>

              <div 
                className={`w-full aspect-square rounded-xl border overflow-hidden shadow-2xl relative group cursor-pointer ${isDark ? 'bg-black border-white/10' : 'bg-[#1a0f00] border-[#8b4513]'}`} 
                onClick={() => fileInputRef.current?.click()}
              >
                {character.portrait && !portraitError ? (
                  <img 
                    src={character.portrait} 
                    alt="Portrait" 
                    className="w-full h-full object-cover" 
                    onError={() => setPortraitError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center italic p-6 text-center text-xs cinzel uppercase tracking-widest opacity-20">{t.click_to_upload}</div>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-full space-y-6">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: t.armor, value: character.ac, key: 'ac', type: 'number' },
                  { label: t.initiative, value: character.initiativeBonus, key: 'initiativeBonus', type: 'number' },
                  { label: t.speed, value: character.speed, key: 'speed', type: 'text' }
                ].map((stat) => (
                  <div key={stat.key} className={`border-2 rounded-xl p-3 text-center shadow-lg flex flex-col items-center ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-[#8b4513]'}`}>
                    <span className={`block text-[9px] cinzel font-bold uppercase mb-1 tracking-wider ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{stat.label}</span>
                    <input 
                      type={stat.type}
                      value={stat.value} 
                      onChange={(e) => updateCharacter({ [stat.key]: stat.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value })} 
                      className={`text-2xl font-bold fantasy-title bg-transparent w-full text-center outline-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`} 
                    />
                  </div>
                ))}
              </div>

              <div className={`border-2 p-4 rounded-xl shadow-md ${isDark ? 'bg-black/20 border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]/40'}`}>
                <h3 className={`cinzel text-xs font-bold text-center mb-5 uppercase tracking-[0.2em] border-b pb-1 ${isDark ? 'text-[#d4af37] border-white/10' : 'text-[#8b4513] border-[#8b4513]/10'}`}>{t.saves}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.keys(character.stats).map((key) => {
                    const attr = key as Attribute;
                    const isProf = character.proficiencies.saves.includes(attr);
                    const mod = getModifier(character.stats[attr]) + (isProf ? profBonus : 0);
                    const attrDisplayName = abbreviateAttributes ? attrAbbrT[attr][lang] : attr;
                    return (
                      <div key={attr} className={`flex items-center gap-2 p-2 rounded border transition-colors ${
                        isDark ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-white/60 border-[#8b4513]/10 hover:border-[#8b4513]/40'
                      }`}>
                        <input type="checkbox" checked={isProf} onChange={() => toggleSave(attr)} className={`w-3.5 h-3.5 cursor-pointer ${isDark ? 'accent-[#d4af37]' : 'accent-[#8b4513]'}`} />
                        <span className={`w-6 font-bold text-center text-sm ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{mod >= 0 ? `+${mod}` : mod}</span>
                        <span className={`parchment-text uppercase font-bold text-[10px] truncate tracking-tighter ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>{attrDisplayName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={`border-2 p-5 rounded-2xl shadow-xl flex flex-col relative transition-all duration-700 ${
                  isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'
                }`}>
                
                <div className="flex mb-4 border-b-2 border-black/10 overflow-hidden rounded-t-lg bg-black/5">
                  <button 
                    onClick={() => setHpTab('hp')}
                    className={`flex-1 py-1.5 cinzel text-[9px] font-bold uppercase tracking-widest transition-all ${hpTab === 'hp' ? (isDark ? 'bg-[#d4af37] text-black' : 'bg-[#8b4513] text-[#fdf5e6]') : 'opacity-40 hover:opacity-100'}`}
                  >
                    {t.hp}
                  </button>
                  <button 
                    onClick={() => setHpTab('death')}
                    className={`flex-1 py-1.5 cinzel text-[9px] font-bold uppercase tracking-widest transition-all ${hpTab === 'death' ? (isDark ? 'bg-[#d4af37] text-black' : 'bg-[#8b4513] text-[#fdf5e6]') : 'opacity-40 hover:opacity-100'}`}
                  >
                    {t.death}
                  </button>
                </div>

                {hpTab === 'hp' ? (
                  <>
                    <div className={`flex justify-between items-center mb-4 border-b pb-2 ${isDark ? 'border-white/10' : 'border-[#8b4513]/20'}`}>
                      <h2 className={`cinzel font-bold text-xs tracking-[0.15em] uppercase ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{t.hp}</h2>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] cinzel font-bold opacity-50 uppercase tracking-widest">{t.hp_max}</span>
                        <input type="number" value={character.hp.max} onChange={(e) => updateCharacter({ hp: { ...character.hp, max: parseInt(e.target.value) || 0 } })} className={`bg-transparent font-bold w-12 text-center focus:outline-none border-b text-lg ${isDark ? 'border-white/10' : 'border-[#8b4513]/40'}`} />
                      </div>
                    </div>
                    <input type="number" value={character.hp.current} onChange={(e) => updateCharacter({ hp: { ...character.hp, current: parseInt(e.target.value) || 0 } })} className={`w-full text-center text-6xl font-bold bg-transparent focus:outline-none drop-shadow-md p-0 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`} />
                    <div className={`flex gap-4 text-center mt-6 pt-4 border-t ${isDark ? 'border-white/10' : 'border-[#8b4513]/10'}`}>
                      <div className="flex-1">
                        <span className="block text-[9px] cinzel font-bold uppercase tracking-widest opacity-70">{t.temp_hp}</span>
                        <input type="number" value={character.hp.temp} onChange={(e) => updateCharacter({ hp: { ...character.hp, temp: parseInt(e.target.value) || 0 } })} className="w-full text-center font-bold bg-transparent outline-none text-xl" />
                      </div>
                      <div className="flex-1">
                        <span className="block text-[9px] cinzel font-bold uppercase tracking-widest opacity-70">{t.hit_dice}</span>
                        {!showClassFeaturesTab ? (
                          <input 
                            type="text" 
                            value={character.classMetadata?.hitDie || ''} 
                            onChange={(e) => updateCharacter({ classMetadata: { ...(character.classMetadata as any), hitDie: e.target.value } })} 
                            className={`w-full text-center font-bold bg-transparent outline-none text-xl ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}
                          />
                        ) : (
                          <span className="font-bold text-xl block mt-1 tracking-tighter">{character.classMetadata?.hitDie || '—'}</span>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 space-y-6">
                    <h2 className={`cinzel font-bold text-xs tracking-[0.15em] uppercase border-b w-full text-center pb-2 mb-2 ${isDark ? 'text-[#d4af37] border-white/10' : 'text-[#8b4513] border-[#8b4513]/20'}`}>
                      {t.death_saves_title}
                    </h2>
                    
                    <div className="w-full space-y-4 px-4">
                      <div className="flex flex-col items-center">
                        <span className={`text-[8px] cinzel font-bold uppercase tracking-widest mb-2 opacity-60 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{t.successes}</span>
                        <div className="flex gap-4">
                          {[1, 2, 3].map(i => (
                            <button 
                              key={i}
                              onClick={() => toggleDeathSave('successes', i)}
                              className={`w-8 h-8 rounded-full border-2 transition-all shadow-md flex items-center justify-center ${
                                i <= character.deathSaves.successes ? 'bg-[#d4af37] border-[#fffacd] shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'bg-black/20 border-white/10 opacity-30'
                              }`}
                            >
                              {i <= character.deathSaves.successes && (
                                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className={`text-[8px] cinzel font-bold uppercase tracking-widest mb-2 opacity-60 ${isDark ? 'text-red-400' : 'text-red-700'}`}>{t.failures}</span>
                        <div className="flex gap-4">
                          {[1, 2, 3].map(i => (
                            <button 
                              key={i}
                              onClick={() => toggleDeathSave('failures', i)}
                              className={`w-8 h-8 rounded-full border-2 transition-all shadow-md flex items-center justify-center ${
                                i <= character.deathSaves.failures ? 'bg-red-700 border-red-400 shadow-[0_0_10px_rgba(185,28,28,0.4)]' : 'bg-black/20 border-white/10 opacity-30'
                              }`}
                            >
                              {i <= character.deathSaves.failures && (
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="lg:col-span-4 flex flex-col gap-6 order-3">
          <div className={`border-2 p-5 rounded-xl shadow-xl ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
            <h2 className={`cinzel text-sm font-bold border-b mb-6 pb-2 tracking-[0.2em] uppercase text-center ${isDark ? 'text-[#d4af37] border-white/10' : 'text-[#8b4513] border-[#8b4513]/30'}`}>{t.skills}</h2>
            <div className="flex flex-col gap-2">
              {SKILLS.map(skill => {
                const isProf = character.proficiencies.skills.includes(skill.name);
                const mod = getModifier(character.stats[skill.attribute]) + (isProf ? profBonus : 0);
                const skillName = skillTranslations[skill.name] ? skillTranslations[skill.name][lang] : skill.name;
                const attrDisplayName = abbreviateAttributes ? attrAbbrT[skill.attribute][lang] : skill.attribute;
                return (
                  <div key={skill.name} className={`flex items-center gap-3 text-[13px] p-1.5 border-b group/skill transition-all rounded-sm ${
                    isDark ? 'border-white/5 hover:bg-white/5' : 'border-[#8b4513]/5 hover:bg-[#8b4513]/5'
                  } ${isProf ? (isDark ? 'bg-white/5' : 'bg-[#8b4513]/5') : ''}`}>
                    <input type="checkbox" checked={isProf} onChange={() => toggleSkill(skill.name)} className={`w-4 h-4 cursor-pointer ${isDark ? 'accent-[#d4af37]' : 'accent-[#8b4513]'}`} />
                    <span className={`w-7 font-bold text-center text-base ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{mod >= 0 ? `+${mod}` : mod}</span>
                    <div className="flex items-center flex-grow truncate">
                      <span className={`parchment-text font-bold uppercase tracking-tighter mr-1 transition-colors ${
                        isProf ? (isDark ? 'text-[#d4af37]' : 'text-[#8b4513]') : (isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]')
                      }`}>
                        {skillName}
                      </span>
                      <span className={`text-[9px] cinzel opacity-40 font-bold ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>({attrDisplayName})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`border-2 p-5 rounded-xl shadow-xl ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
            <h2 className={`cinzel text-sm font-bold border-b mb-4 pb-2 tracking-[0.2em] uppercase text-center ${isDark ? 'text-[#d4af37] border-white/10' : 'text-[#8b4513] border-[#8b4513]/30'}`}>{t.languages}</h2>
            <textarea
              value={languagesInput}
              onChange={(e) => setLanguagesInput(e.target.value)}
              onBlur={() => {
                const langs = languagesInput.split(',').map(s => s.trim()).filter(s => s);
                updateCharacter({ proficiencies: { ...character.proficiencies, languages: langs } });
              }}
              placeholder={t.languages_placeholder}
              className={`w-full bg-transparent font-sans text-sm focus:outline-none resize-none min-h-[4rem] ${isDark ? 'text-[#e8d5b5] placeholder:text-white/20' : 'text-[#3e2723] placeholder:text-black/20'}`}
            />
          </div>

          <div className={`border-2 p-5 rounded-xl shadow-xl ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
            <div className="flex mb-5 border-b-2 border-black/10 overflow-hidden rounded-t-lg bg-black/5">
              <button 
                onClick={() => setCombatTab('weapons')}
                className={`flex-1 py-2 cinzel text-[10px] font-bold uppercase tracking-widest transition-all ${combatTab === 'weapons' ? (isDark ? 'bg-[#d4af37] text-black' : 'bg-[#8b4513] text-[#fdf5e6]') : 'opacity-40 hover:opacity-100'}`}
              >
                {t.weapons}
              </button>
              <button 
                onClick={() => setCombatTab('attacks')}
                className={`flex-1 py-2 cinzel text-[10px] font-bold uppercase tracking-widest transition-all ${combatTab === 'attacks' ? (isDark ? 'bg-[#d4af37] text-black' : 'bg-[#8b4513] text-[#fdf5e6]') : 'opacity-40 hover:opacity-100'}`}
              >
                {t.attacks}
              </button>
            </div>

            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {combatTab === 'weapons' ? (
                character.weapons.length === 0 ? (
                  <div className="py-8 text-center opacity-30 italic cinzel text-[10px] uppercase tracking-widest">
                    {lang === 'pt' ? 'Nenhuma arma registrada' : 'No weapons recorded'}
                  </div>
                ) : (
                  character.weapons.map((w, idx) => (
                    <div key={idx} className={`border p-3 rounded-lg relative group ${isDark ? 'bg-black/20 border-white/5' : 'bg-white/40 border-[#8b4513]/10'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <input 
                          value={w.name}
                          onChange={(e) => {
                            const next = [...character.weapons];
                            next[idx].name = e.target.value;
                            updateCharacter({ weapons: next });
                          }}
                          className={`bg-transparent font-bold fantasy-title outline-none focus:border-b border-white/20 w-2/3 ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}
                        />
                        <button 
                          onClick={() => updateCharacter({ weapons: character.weapons.filter((_, i) => i !== idx) })}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-500 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <div className={`col-span-1 text-center p-1 rounded border ${isDark ? 'bg-black/40 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                          <span className={`block text-[8px] cinzel font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-[#d4af37]' : ''}`}>{t.bonus}</span>
                          <input value={w.bonus} onChange={(e) => { const next = [...character.weapons]; next[idx].bonus = e.target.value; updateCharacter({ weapons: next }); }} className={`bg-transparent w-full text-center font-bold outline-none ${isDark ? 'text-[#e8d5b5]' : ''}`} />
                        </div>
                        <div className={`col-span-1 text-center p-1 rounded border ${isDark ? 'bg-black/40 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                          <span className={`block text-[8px] cinzel font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-[#d4af37]' : ''}`}>{lang === 'pt' ? 'Dano' : 'Damage'}</span>
                          <input value={w.damage} onChange={(e) => { const next = [...character.weapons]; next[idx].damage = e.target.value; updateCharacter({ weapons: next }); }} className={`bg-transparent w-full text-center font-bold outline-none ${isDark ? 'text-[#e8d5b5]' : ''}`} />
                        </div>
                        <div className={`col-span-2 text-center p-1 rounded border ${isDark ? 'bg-black/40 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                          <span className={`block text-[8px] cinzel font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-[#d4af37]' : ''}`}>{lang === 'pt' ? 'Tipo' : 'Type'}</span>
                          <input 
                            value={w.type || ''} 
                            onChange={(e) => { 
                              const next = [...character.weapons]; 
                              next[idx].type = e.target.value; 
                              updateCharacter({ weapons: next }); 
                            }} 
                            placeholder={lang === 'pt' ? "Ex: 1 Mão" : "Ex: 1 Hand"}
                            className={`bg-transparent w-full text-center font-bold outline-none cinzel text-[10px] ${isDark ? 'text-[#e8d5b5] placeholder:text-white/10' : 'text-[#3e2723] placeholder:text-black/10'}`}
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <textarea
                          placeholder={lang === 'pt' ? "Propriedades da arma (Acuidade, Versátil...)" : "Weapon properties (Finesse, Versatile...)"}
                          value={w.description || ''}
                          onChange={(e) => {
                            const next = [...character.weapons];
                            next[idx].description = e.target.value;
                            updateCharacter({ weapons: next });
                          }}
                          className={`w-full bg-transparent font-sans text-[12px] focus:outline-none resize-none overflow-hidden min-h-[1.5rem] border-t border-black/5 pt-1 ${isDark ? 'text-[#e8d5b5]/60 placeholder:text-white/5 border-white/5' : 'text-[#3e2723]/60 placeholder:text-black/5'}`}
                          rows={1}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = target.scrollHeight + 'px';
                          }}
                        />
                      </div>
                    </div>
                  ))
                )
              ) : (
                character.otherAttacks.length === 0 ? (
                  <div className="py-8 text-center opacity-30 italic cinzel text-[10px] uppercase tracking-widest">
                    {lang === 'pt' ? 'Nenhum ataque registrado' : 'No attacks recorded'}
                  </div>
                ) : (
                  character.otherAttacks.map((a, idx) => (
                    <div key={idx} className={`border p-3 rounded-lg relative group ${isDark ? 'bg-black/20 border-white/5' : 'bg-white/40 border-[#8b4513]/10'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <input 
                          value={a.name}
                          onChange={(e) => {
                            const next = [...character.otherAttacks];
                            next[idx].name = e.target.value;
                            updateCharacter({ otherAttacks: next });
                          }}
                          className={`bg-transparent font-bold fantasy-title outline-none focus:border-b border-white/20 w-2/3 ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}
                        />
                        <button 
                          onClick={() => updateCharacter({ otherAttacks: character.otherAttacks.filter((_, i) => i !== idx) })}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-500 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <div className={`col-span-1 text-center p-1 rounded border ${isDark ? 'bg-black/40 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                          <span className={`block text-[8px] cinzel font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-[#d4af37]' : ''}`}>Atk</span>
                          <input value={a.bonus} onChange={(e) => { const next = [...character.otherAttacks]; next[idx].bonus = e.target.value; updateCharacter({ otherAttacks: next }); }} className={`bg-transparent w-full text-center font-bold outline-none ${isDark ? 'text-[#e8d5b5]' : ''}`} />
                        </div>
                        <div className={`col-span-1 text-center p-1 rounded border ${isDark ? 'bg-black/40 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                          <span className={`block text-[8px] cinzel font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-[#d4af37]' : ''}`}>{lang === 'pt' ? 'Dano' : 'Damage'}</span>
                          <input value={a.damage} onChange={(e) => { const next = [...character.otherAttacks]; next[idx].damage = e.target.value; updateCharacter({ otherAttacks: next }); }} className={`bg-transparent w-full text-center font-bold outline-none ${isDark ? 'text-[#e8d5b5]' : ''}`} />
                        </div>
                        <div className={`col-span-2 text-center p-1 rounded border ${isDark ? 'bg-black/40 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                          <span className={`block text-[8px] cinzel font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-[#d4af37]' : ''}`}>{lang === 'pt' ? 'Alcance' : 'Range'}</span>
                          <input value={a.range} onChange={(e) => { const next = [...character.otherAttacks]; next[idx].range = e.target.value; updateCharacter({ otherAttacks: next }); }} className={`bg-transparent w-full text-center font-bold outline-none ${isDark ? 'text-[#e8d5b5]' : ''}`} />
                        </div>
                      </div>
                      <div className="mt-2">
                        <textarea
                          placeholder={lang === 'pt' ? "Propriedades ou descrição do ataque..." : "Attack properties or description..."}
                          value={a.description || ''}
                          onChange={(e) => {
                            const next = [...character.otherAttacks];
                            next[idx].description = e.target.value;
                            updateCharacter({ otherAttacks: next });
                          }}
                          className={`w-full bg-transparent font-sans text-[12px] focus:outline-none resize-none overflow-hidden min-h-[1.5rem] border-t border-black/5 pt-1 ${isDark ? 'text-[#e8d5b5]/60 placeholder:text-white/5 border-white/5' : 'text-[#3e2723]/60 placeholder:text-black/5'}`}
                          rows={1}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = target.scrollHeight + 'px';
                          }}
                        />
                      </div>
                    </div>
                  ))
                )
              )}

              <button 
                onClick={() => {
                  if (combatTab === 'weapons') {
                    updateCharacter({ weapons: [...character.weapons, { name: t.new_weapon, bonus: '+0', damage: '1d6', type: '1 Mão', description: '' }] });
                  } else {
                    updateCharacter({ otherAttacks: [...character.otherAttacks, { name: t.new_attack, bonus: '+0', damage: '1d6', range: '1.5m', description: '' }] });
                  }
                }}
                className={`mt-4 w-full py-2.5 rounded-xl border-2 border-dashed cinzel text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                  isDark ? 'border-white/10 text-white/20 hover:text-[#d4af37] hover:border-[#d4af37]/40' : 'border-[#8b4513]/20 text-[#8b4513]/40 hover:text-[#8b4513] hover:border-[#8b4513]/60'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                {combatTab === 'weapons' ? t.new_weapon : t.new_attack}
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* SUBFICHA DO COMPANHEIRO ANIMAL */}
      {isCompanionVisible && (
        <section className={`mt-12 border-4 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all ${
          isDark ? 'bg-[#1a1a1a] border-[#d4af37]/20' : 'bg-[#fdf5e6] border-[#8b4513]/80'
        }`}>
          <button 
            onClick={() => setIsCompanionExpanded(!isCompanionExpanded)}
            className={`w-full p-6 flex justify-between items-center border-b-4 transition-colors ${
              isDark ? 'bg-black/40 border-white/5 hover:bg-black/60' : 'bg-[#8b4513]/10 border-[#8b4513]/20 hover:bg-[#8b4513]/20'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${isDark ? 'border-[#d4af37] text-[#d4af37]' : 'border-[#8b4513] text-[#8b4513]'}`}>
                 <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              </div>
              <h2 className={`fantasy-title text-3xl sm:text-4xl ${isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>{t.companion_title}</h2>
            </div>
            <svg className={`w-8 h-8 transition-transform duration-500 ${isCompanionExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isCompanionExpanded && (
            <div className="p-6 sm:p-10 flex flex-col gap-10">
              
              {/* SEÇÃO A: IDENTIDADE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex flex-col gap-2">
                    <label className="cinzel text-[10px] font-bold uppercase tracking-widest opacity-60">{t.companion_name}</label>
                    <input 
                      value={character.companion?.name || "Companheiro"} 
                      onChange={e => updateCompanion({ name: e.target.value })}
                      className={`bg-transparent border-b-2 fantasy-title text-2xl outline-none py-2 ${isDark ? 'border-white/10 focus:border-[#d4af37] text-[#e8d5b5]' : 'border-[#8b4513]/20 focus:border-[#8b4513] text-[#3e2723]'}`}
                    />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="cinzel text-[10px] font-bold uppercase tracking-widest opacity-60">{t.companion_species}</label>
                    <input 
                      placeholder="Lobo, Pantera, Javali..."
                      value={character.companion?.species || ""} 
                      onChange={e => updateCompanion({ species: e.target.value })}
                      className={`bg-transparent border-b-2 fantasy-title text-2xl outline-none py-2 ${isDark ? 'border-white/10 focus:border-[#d4af37] text-[#e8d5b5]' : 'border-[#8b4513]/20 focus:border-[#8b4513] text-[#3e2723]'}`}
                    />
                    <p className="text-[10px] italic opacity-40 leading-tight mt-1">
                      “Em geral, uma besta pode servir como companheiro se for Média ou menor, tiver 15 ou menos PV e ND 1/4 ou menor.”
                    </p>
                 </div>
              </div>

              {/* SEÇÃO B: DEFESA E VIDA */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                 {[
                   { label: t.armor, value: character.companion?.ac || 10, key: 'ac' },
                   { label: t.hp, value: character.companion?.hp.current || 10, key: 'hp.current' },
                   { label: t.hp_max, value: character.companion?.hp.max || 10, key: 'hp.max' },
                   { label: t.hit_dice, value: character.companion?.hitDice || '1d8', key: 'hitDice', type: 'text' },
                   { label: t.speed, value: character.companion?.speed || '12m', key: 'speed', type: 'text' },
                   { label: t.initiative, value: character.companion?.initiative || 0, key: 'initiative' }
                 ].map(stat => (
                   <div key={stat.key} className={`border-2 rounded-2xl p-3 text-center shadow-lg ${isDark ? 'bg-black/20 border-white/5' : 'bg-white border-[#8b4513]/30'}`}>
                      <span className="block text-[8px] cinzel font-bold uppercase tracking-widest mb-1 opacity-60">{stat.label}</span>
                      <input 
                        type={stat.type === 'text' ? 'text' : 'number'}
                        value={stat.value}
                        onChange={e => {
                          const val = stat.type === 'text' ? e.target.value : parseInt(e.target.value) || 0;
                          if (stat.key.includes('.')) {
                             const [obj, field] = stat.key.split('.');
                             const parent = (character.companion as any)[obj];
                             updateCompanion({ [obj]: { ...parent, [field]: val } });
                          } else {
                             updateCompanion({ [stat.key]: val });
                          }
                        }}
                        className={`bg-transparent w-full text-center fantasy-title text-xl outline-none font-bold ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}
                      />
                   </div>
                 ))}
                 <p className="col-span-full text-[10px] italic opacity-40 text-center mt-2">
                    “O companheiro rola iniciativa como qualquer criatura. Você decide as ações dele.”
                 </p>
              </div>

              {/* SEÇÃO C: ATRIBUTOS DO COMPANHEIRO */}
              <div className={`p-6 rounded-3xl border-2 ${isDark ? 'bg-black/20 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                 <h3 className="cinzel text-xs font-bold text-center mb-6 uppercase tracking-widest">{t.attributes} do Animal</h3>
                 <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {(Object.values(Attribute)).map(attr => {
                      const score = character.companion?.stats[attr] || 10;
                      const mod = getModifier(score);
                      return (
                        <div key={attr} className="flex flex-col items-center gap-1">
                           <span className="text-[10px] cinzel font-bold opacity-60">{abbreviateAttributes ? attrAbbrT[attr][lang] : attr}</span>
                           <div className={`w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center shadow-inner ${isDark ? 'bg-black/40 border-white/10' : 'bg-white border-[#8b4513]/20'}`}>
                              <input 
                                type="number"
                                value={score}
                                onChange={e => {
                                  const stats = { ...(character.companion?.stats || DEFAULT_COMPANION.stats), [attr]: parseInt(e.target.value) || 0 };
                                  updateCompanion({ stats });
                                }}
                                className={`w-full text-center fantasy-title text-lg bg-transparent outline-none focus:text-[#d4af37] ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}
                              />
                              <span className="text-[10px] font-bold opacity-50">{mod >= 0 ? `+${mod}` : mod}</span>
                           </div>
                        </div>
                      );
                    })}
                 </div>
                 <p className="text-[10px] italic opacity-40 text-center mt-6">
                    “Quando o Patrulheiro recebe Incremento no Valor de Habilidade, o companheiro também recebe.”
                 </p>
              </div>

              {/* SEÇÃO D: VÍNCULO (REGRAS) */}
              <div className={`p-8 rounded-[2rem] border-2 border-dashed ${isDark ? 'bg-[#d4af37]/5 border-[#d4af37]/20' : 'bg-orange-50 border-[#8b4513]/30'}`}>
                 <h3 className={`fantasy-title text-2xl mb-4 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{t.companion_bond}</h3>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs italic opacity-80 leading-relaxed">
                    <li className="flex gap-2"><span>•</span> {t.companion_ac_note}</li>
                    <li className="flex gap-2"><span>•</span> Ele usa sua proficiência (+{profBonus}) no lugar da própria.</li>
                    <li className="flex gap-2"><span>•</span> Ele se torna proficiente em todos os testes de resistência.</li>
                    <li className="flex gap-2"><span>•</span> Ele ganha proficiência em duas perícias à sua escolha.</li>
                    <li className="flex gap-2"><span>•</span> Ele ganha 1 HD extra para cada nível seu acima do 3º.</li>
                    <li className="flex gap-2"><span>•</span> Se tiver Ataque Múltiplo no bloco original, ele perde essa ação.</li>
                 </ul>
              </div>

              {/* SEÇÃO E: SALVAGUARDAS E PERÍCIAS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                 <div className={`p-6 rounded-3xl border-2 ${isDark ? 'bg-black/20 border-white/5' : 'bg-white border-[#8b4513]/10'}`}>
                    <h4 className="cinzel text-[10px] font-bold mb-4 uppercase tracking-widest">{t.saves} (Todos Proficientes)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                       {Object.values(Attribute).map(attr => {
                          const mod = getModifier(character.companion?.stats[attr] || 10) + profBonus;
                          return (
                            <div key={attr} className={`flex items-center gap-2 p-2 rounded border ${isDark ? 'bg-white/5 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                               <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-[#d4af37]' : 'bg-[#8b4513] shadow-sm'}`}></div>
                               <span className="font-bold text-sm w-6 text-center">{mod >= 0 ? `+${mod}` : mod}</span>
                               <span className="text-[10px] cinzel font-bold opacity-70">{attr}</span>
                            </div>
                          );
                       })}
                    </div>
                 </div>

                 <div className={`p-6 rounded-3xl border-2 ${isDark ? 'bg-black/20 border-white/5' : 'bg-white border-[#8b4513]/10'}`}>
                    <h4 className="cinzel text-[10px] font-bold mb-4 uppercase tracking-widest">{t.companion_skills}</h4>
                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                       {SKILLS.map(skill => {
                          const isProf = (character.companion?.skillsProficient || []).includes(skill.name);
                          const mod = getModifier(character.companion?.stats[skill.attribute] || 10) + (isProf ? profBonus : 0);
                          return (
                            <button 
                              key={skill.name}
                              onClick={() => toggleCompanionSkill(skill.name)}
                              className={`flex items-center gap-3 p-1.5 rounded transition-all text-left ${isProf ? (isDark ? 'bg-[#d4af37]/20 border border-[#d4af37]/30' : 'bg-[#8b4513]/10 border border-[#8b4513]/20') : 'hover:bg-black/5 opacity-60'}`}
                            >
                               <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center ${isProf ? (isDark ? 'bg-[#d4af37] border-white' : 'bg-[#8b4513] border-[#8b4513]') : 'border-current'}`}>
                                  {isProf && <div className="w-1 h-1 bg-white rounded-full"></div>}
                               </div>
                               <span className="font-bold text-sm w-6 text-center">{mod >= 0 ? `+${mod}` : mod}</span>
                               <span className="text-[11px] cinzel font-bold uppercase truncate">{skillTranslations[skill.name]?.[lang] || skill.name}</span>
                            </button>
                          );
                       })}
                    </div>
                 </div>
              </div>

              {/* SEÇÃO F: ATAQUES DO COMPANHEIRO */}
              <div className={`p-6 rounded-3xl border-2 ${isDark ? 'bg-black/20 border-white/5' : 'bg-white border-[#8b4513]/10'}`}>
                 <div className="flex justify-between items-center mb-6">
                    <h4 className="cinzel text-[10px] font-bold uppercase tracking-widest">{t.companion_attacks}</h4>
                    <button 
                      onClick={addCompanionAttack}
                      className={`px-4 py-1 rounded-lg cinzel text-[9px] font-bold border transition-all ${isDark ? 'border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black' : 'border-[#8b4513] text-[#8b4513] hover:bg-[#8b4513] hover:text-white'}`}
                    >
                      + {t.add}
                    </button>
                 </div>
                 <div className="flex flex-col gap-3">
                    {(character.companion?.attacks || []).map((atk, idx) => (
                      <div key={idx} className={`grid grid-cols-1 md:grid-cols-5 gap-3 p-4 rounded-xl border relative group ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#8b4513]/20'}`}>
                         <div className="md:col-span-2">
                            <label className="text-[8px] cinzel opacity-40 uppercase">{lang === 'pt' ? 'Ataque' : 'Attack'}</label>
                            <input value={atk.name} onChange={e => {
                               const next = [...(character.companion?.attacks || [])];
                               next[idx].name = e.target.value;
                               updateCompanion({ attacks: next });
                            }} className="bg-transparent w-full fantasy-title text-lg outline-none" />
                         </div>
                         <div>
                            <label className="text-[8px] cinzel opacity-40 uppercase">{t.companion_reach}</label>
                            <input value={atk.reach} onChange={e => {
                               const next = [...(character.companion?.attacks || [])];
                               next[idx].reach = e.target.value;
                               updateCompanion({ attacks: next });
                            }} className="bg-transparent w-full cinzel text-xs font-bold outline-none" />
                         </div>
                         <div>
                            <label className="text-[8px] cinzel opacity-40 uppercase">{t.companion_attack_bonus}</label>
                            <input value={atk.bonus} onChange={e => {
                               const next = [...(character.companion?.attacks || [])];
                               next[idx].bonus = e.target.value;
                               updateCompanion({ attacks: next });
                            }} className="bg-transparent w-full text-center font-bold text-lg outline-none" />
                         </div>
                         <div>
                            <label className="text-[8px] cinzel opacity-40 uppercase">{t.companion_damage}</label>
                            <input value={atk.damage} onChange={e => {
                               const next = [...(character.companion?.attacks || [])];
                               next[idx].damage = e.target.value;
                               updateCompanion({ attacks: next });
                            }} className="bg-transparent w-full text-center font-bold text-lg outline-none" />
                         </div>
                         <button 
                            onClick={() => updateCompanion({ attacks: (character.companion?.attacks || []).filter((_, i) => i !== idx) })}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-900 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs shadow-lg"
                         >
                            ×
                         </button>
                      </div>
                    ))}
                 </div>
                 <p className="text-[10px] italic opacity-40 text-center mt-4">
                    “O companheiro não pode usar a ação Ataque Múltiplo, mesmo que conste em seu bloco original.”
                 </p>
              </div>

              {/* SEÇÃO G: TRAÇOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                       <label className="cinzel text-[10px] font-bold uppercase opacity-60">{t.personality}</label>
                       <textarea 
                        value={character.companion?.personalityTrait || ""}
                        onChange={e => updateCompanion({ personalityTrait: e.target.value })}
                        rows={2}
                        className={`p-3 rounded-xl border-2 parchment-text text-sm italic resize-none outline-none ${isDark ? 'bg-black/40 border-white/5 focus:border-[#d4af37]' : 'bg-white border-[#8b4513]/20 focus:border-[#8b4513]'}`}
                       />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="cinzel text-[10px] font-bold uppercase opacity-60">{t.flaws}</label>
                       <textarea 
                        value={character.companion?.flaw || ""}
                        onChange={e => updateCompanion({ flaw: e.target.value })}
                        rows={2}
                        className={`p-3 rounded-xl border-2 parchment-text text-sm italic resize-none outline-none ${isDark ? 'bg-black/40 border-white/5 focus:border-[#d4af37]' : 'bg-white border-[#8b4513]/20 focus:border-[#8b4513]'}`}
                       />
                    </div>
                 </div>
                 <div className={`p-6 rounded-3xl border-2 flex flex-col gap-4 ${isDark ? 'bg-black/20 border-white/5' : 'bg-white border-[#8b4513]/10'}`}>
                    <div className="flex justify-between border-b pb-2">
                       <span className="cinzel text-[10px] font-bold uppercase opacity-40">{t.alignment}</span>
                       <span className="parchment-text text-sm italic">{character.alignment} (Vínculo)</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                       <span className="cinzel text-[10px] font-bold uppercase opacity-40">{t.ideals}</span>
                       <span className="parchment-text text-sm italic">{character.ideals || "Proteção"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                       <span className="cinzel text-[10px] font-bold uppercase opacity-40">{t.bonds}</span>
                       <span className="parchment-text text-sm italic">Ligado a você e ao seu grupo.</span>
                    </div>
                 </div>
              </div>

              {/* SEÇÃO H: MANUTENÇÃO */}
              <div className={`mt-4 p-6 rounded-2xl border-2 border-dashed text-center ${isDark ? 'bg-white/5 border-white/10 opacity-60' : 'bg-black/5 border-black/10 opacity-60'}`}>
                 <h4 className="cinzel text-[10px] font-bold uppercase mb-4 tracking-widest">{t.companion_maintenance}</h4>
                 <div className="flex flex-wrap justify-center gap-6 text-[11px] italic">
                    <p>“Para invocar o companheiro: 8 horas de trabalho e 50 po.”</p>
                    <p>“Se o companheiro morrer: 8 horas e 25 po para restaurar o espírito.”</p>
                 </div>
              </div>

            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default CharacterSheet;
