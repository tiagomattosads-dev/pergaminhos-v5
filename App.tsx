
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Character, Attribute } from './types';
import { INITIAL_CHARACTER, createNewCharacter, getLevelFromXP, getProficiencyFromLevel, XP_TABLE, SUBCLASS_LEVELS, SUBCLASSES_PHB, CLASSES_PHB } from './constants';
import { translations, classTranslations, subclassTranslations, raceTranslations } from './translations';
import { supabase } from './services/supabase';
import CharacterSheet from './components/CharacterSheet';
import Inventory from './components/Inventory';
import ClassFeatures from './components/ClassFeatures';
import Spellbook from './components/Spellbook';
import Backstory from './components/Backstory';
import Settings from './components/Settings';
import Subscription from './components/Subscription';
import CharacterSelection from './components/CharacterSelection';
import AuthScreen from './components/AuthScreen';

enum Tab {
  Sheet = 'SHEET',
  Inventory = 'INVENTORY',
  ClassFeatures = 'CLASS_FEATURES',
  Magic = 'MAGIC',
  History = 'HISTORY',
  Settings = 'SETTINGS',
  Subscription = 'SUBSCRIPTION'
}

const App: React.FC = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [session, setSession] = useState<any>(null);

  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Sheet);
  const [xpToAdd, setXpToAdd] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('dnd_app_theme') as 'light' | 'dark') || 'light';
  });

  const [appLanguage, setAppLanguage] = useState<'pt' | 'en'>(() => {
    return (localStorage.getItem('dnd_app_language') as 'pt' | 'en') || 'pt';
  });

  const [showClassFeaturesTab, setShowClassFeaturesTab] = useState<boolean>(() => {
    const saved = localStorage.getItem('dnd_app_show_features_tab');
    return saved !== null ? saved === 'true' : false;
  });

  const [abbreviateAttributes, setAbbreviateAttributes] = useState<boolean>(() => {
    const saved = localStorage.getItem('dnd_app_abbreviate_attrs');
    return saved !== null ? saved === 'true' : false;
  });

  const [showAccumulatedXp, setShowAccumulatedXp] = useState<boolean>(() => {
    const saved = localStorage.getItem('dnd_app_show_accumulated_xp');
    return saved !== null ? saved === 'true' : true;
  });

  const [isGlobalSettingsOpen, setIsGlobalSettingsOpen] = useState(false);
  const [showDeathOverlay, setShowDeathOverlay] = useState(true);
  const [showSubclassModal, setShowSubclassModal] = useState(false);
  const [tempSubclass, setTempSubclass] = useState<string | null>(null);
  const [hasAutomaticallyShownSubclassModal, setHasAutomaticallyShownSubclassModal] = useState<Record<string, boolean>>({});

  const character = useMemo(() => {
    return allCharacters.find(c => c.id === selectedCharId) || null;
  }, [allCharacters, selectedCharId]);

  const t = translations[appLanguage];
  const isDark = theme === 'dark';

  // Gerenciamento de Sessão Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch characters from Supabase
  useEffect(() => {
    if (session?.user) {
      setIsLoadingCharacters(true);
      const fetchCharacters = async () => {
        const { data, error } = await supabase
          .from('characters')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          setErrorMessage(error.message);
        } else {
          const loadedChars = data.map((row: any) => ({
            ...row.data,
            id: row.id
          }));
          setAllCharacters(loadedChars);
        }
        setIsLoadingCharacters(false);
      };
      fetchCharacters();
    } else {
      setAllCharacters([]);
    }
  }, [session]);

  // Auto-save current character to Supabase
  useEffect(() => {
    if (!character || !session?.user) return;

    const timer = setTimeout(async () => {
      const { error } = await supabase
        .from('characters')
        .update({ data: character })
        .eq('id', character.id);
      
      if (error) setErrorMessage(error.message);
    }, 1000);

    return () => clearTimeout(timer);
  }, [character, session]);

  // Helper para traduzir valores técnicos (Classe, Raça, etc)
  const translateValue = (val: string | null | undefined, dictionary: Record<string, { pt: string, en: string }>) => {
    if (!val) return null;
    return dictionary[val] ? dictionary[val][appLanguage] : val;
  };

  // Regra de disparo da Subclasse (Auto-disparo uma única vez por personagem/nível atingido)
  useEffect(() => {
    if (character && character.class && showClassFeaturesTab) {
      const choiceLevel = SUBCLASS_LEVELS[character.class] || 3;
      const autoKey = `${character.id}_${character.level}`;
      
      if (character.level >= choiceLevel && !character.subclass && !hasAutomaticallyShownSubclassModal[autoKey]) {
        setShowSubclassModal(true);
        setHasAutomaticallyShownSubclassModal(prev => ({ ...prev, [autoKey]: true }));
      }
    }
  }, [character?.level, character?.class, character?.subclass, character?.id, hasAutomaticallyShownSubclassModal, showClassFeaturesTab]);

  // Sincronizar o idioma do personagem selecionado com o idioma global do app
  useEffect(() => {
    if (character && character.language !== appLanguage) {
      updateCharacter({ language: appLanguage });
    }
  }, [appLanguage, selectedCharId]);

  const levelData = useMemo(() => {
    if (!character) return null;
    const currentLevel = getLevelFromXP(character.exp);
    const profBonus = getProficiencyFromLevel(currentLevel);
    const currentLevelMinXp = XP_TABLE[currentLevel - 1] || 0;
    const nextLevelXp = XP_TABLE[currentLevel] || null;
    
    let progressPercent = 100;
    if (nextLevelXp !== null) {
      const needed = nextLevelXp - currentLevelMinXp;
      const earned = character.exp - currentLevelMinXp;
      progressPercent = Math.min(100, Math.max(0, (earned / needed) * 100));
    }

    return { level: currentLevel, profBonus, nextLevelXp, progressPercent };
  }, [character?.exp]);

  const isNearlyDead = character?.deathSaves.failures === 2;
  const isDead = (character?.deathSaves.failures ?? 0) >= 3;

  useEffect(() => {
    if (!isDead) setShowDeathOverlay(true);
  }, [isDead, selectedCharId]);

  // LocalStorage removed for characters to use Supabase as source of truth

  useEffect(() => {
    localStorage.setItem('dnd_app_theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('dnd_app_language', appLanguage);
  }, [appLanguage]);

  useEffect(() => {
    localStorage.setItem('dnd_app_show_features_tab', String(showClassFeaturesTab));
    if (!showClassFeaturesTab && activeTab === Tab.ClassFeatures) {
      setActiveTab(Tab.Sheet);
    }
  }, [showClassFeaturesTab, activeTab]);

  useEffect(() => {
    localStorage.setItem('dnd_app_abbreviate_attrs', String(abbreviateAttributes));
  }, [abbreviateAttributes]);

  useEffect(() => {
    localStorage.setItem('dnd_app_show_accumulated_xp', String(showAccumulatedXp));
  }, [showAccumulatedXp]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setSelectedCharId(null);
    setIsGlobalSettingsOpen(false);
  };

  const updateCharacter = useCallback((updates: Partial<Character>) => {
    if (!selectedCharId) return;
    setAllCharacters(prev => prev.map(c => {
      if (c.id === selectedCharId) {
        const nextChar = { ...c, ...updates };
        if (updates.exp !== undefined) {
          nextChar.level = getLevelFromXP(updates.exp);
        }
        return nextChar;
      }
      return c;
    }));
  }, [selectedCharId]);

  const handleAddXp = () => {
    if (character && xpToAdd > 0) {
      updateCharacter({ exp: character.exp + xpToAdd });
      setXpToAdd(0);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      updateCharacter({ portrait: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleCreateNew = async () => {
    if (!session?.user) return;
    
    const newChar = createNewCharacter();
    newChar.id = crypto.randomUUID(); // Use UUID for Supabase compatibility
    newChar.language = appLanguage;

    try {
      const { error } = await supabase
        .from('characters')
        .insert([{ 
          id: newChar.id,
          user_id: session.user.id,
          data: newChar 
        }]);

      if (error) throw error;

      setAllCharacters(prev => [newChar, ...prev]);
      setSelectedCharId(newChar.id);
      setIsGlobalSettingsOpen(false);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const handleImport = async (importedChar: Character) => {
    if (!session?.user) return;

    const charWithNewId = { 
      ...importedChar, 
      id: crypto.randomUUID() 
    };

    try {
      const { error } = await supabase
        .from('characters')
        .insert([{ 
          id: charWithNewId.id,
          user_id: session.user.id,
          data: charWithNewId 
        }]);

      if (error) throw error;

      setAllCharacters(prev => [charWithNewId, ...prev]);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('characters')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAllCharacters(prev => prev.filter(c => c.id !== id));
      if (selectedCharId === id) setSelectedCharId(null);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const renderTab = () => {
    if (isGlobalSettingsOpen) {
      if (activeTab === Tab.Subscription) {
        return <Subscription theme={theme} onBack={() => setActiveTab(Tab.Settings)} />;
      }
      return (
        <Settings 
          character={character || undefined} 
          updateCharacter={updateCharacter} 
          theme={theme} 
          setTheme={setTheme} 
          onNavigate={(t) => {
            if (t === 'SELECTION') {
               setIsGlobalSettingsOpen(false);
               setSelectedCharId(null);
            } else if (t === 'SUBSCRIPTION') {
               setActiveTab(Tab.Subscription);
            } else {
               setActiveTab(t as Tab);
               setIsGlobalSettingsOpen(false);
            }
          }} 
          onLogout={handleLogout}
          appLanguage={appLanguage}
          setAppLanguage={setAppLanguage}
          showClassFeaturesTab={showClassFeaturesTab}
          setShowClassFeaturesTab={setShowClassFeaturesTab}
          abbreviateAttributes={abbreviateAttributes}
          setAbbreviateAttributes={setAbbreviateAttributes}
          showAccumulatedXp={showAccumulatedXp}
          setShowAccumulatedXp={setShowAccumulatedXp}
        />
      );
    }

    if (!character) return null;
    switch (activeTab) {
      case Tab.Sheet: 
        return <CharacterSheet character={character} updateCharacter={updateCharacter} onImageUpload={handleImageUpload} theme={theme} abbreviateAttributes={abbreviateAttributes} showClassFeaturesTab={showClassFeaturesTab} />;
      case Tab.Inventory: 
        return <Inventory character={character} updateCharacter={updateCharacter} theme={theme} />;
      case Tab.ClassFeatures:
        return <ClassFeatures character={character} updateCharacter={updateCharacter} onSelectSubclass={() => setShowSubclassModal(true)} theme={theme} />;
      case Tab.Magic: 
        return <Spellbook character={character} updateCharacter={updateCharacter} theme={theme} showClassFeaturesTab={showClassFeaturesTab} />;
      case Tab.History: 
        return <Backstory character={character} updateCharacter={updateCharacter} onImageUpload={handleImageUpload} />;
      case Tab.Settings: 
        return (
          <Settings 
            character={character} 
            updateCharacter={updateCharacter} 
            theme={theme} 
            setTheme={setTheme} 
            onNavigate={(tab: any) => setActiveTab(tab)} 
            onLogout={handleLogout} 
            appLanguage={appLanguage}
            setAppLanguage={setAppLanguage}
            showClassFeaturesTab={showClassFeaturesTab}
            setShowClassFeaturesTab={setShowClassFeaturesTab}
            abbreviateAttributes={abbreviateAttributes}
            setAbbreviateAttributes={setAbbreviateAttributes}
            showAccumulatedXp={showAccumulatedXp}
            setShowAccumulatedXp={setShowAccumulatedXp}
          />
        );
      case Tab.Subscription:
        return <Subscription theme={theme} onBack={() => setActiveTab(Tab.Settings)} />;
      default: 
        return null;
    }
  };

  const NavButton: React.FC<{ tab: Tab; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => {
        setIsGlobalSettingsOpen(false);
        setActiveTab(tab);
      }}
      className={`relative px-4 py-3 cinzel text-sm font-bold transition-all duration-300 flex items-center justify-center whitespace-nowrap ${
        activeTab === tab && !isGlobalSettingsOpen
          ? 'text-[#f4e4bc] bg-[#8b4513] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] scale-105 z-10' 
          : 'text-[#e8d5b5]/60 hover:text-[#e8d5b5] hover:bg-[#3d2511]'
      }`}
    >
      {activeTab === tab && !isGlobalSettingsOpen && <div className="absolute top-0 left-0 w-full h-1 bg-[#d4af37]"></div>}
      {label}
    </button>
  );

  const MobileNavButton: React.FC<{ tab: Tab; label: string; icon: React.ReactNode }> = ({ tab, label, icon }) => (
    <button
      onClick={() => {
        setIsGlobalSettingsOpen(false);
        setActiveTab(tab);
      }}
      className={`flex flex-col items-center justify-center flex-1 py-3 transition-all duration-300 relative ${
        activeTab === tab && !isGlobalSettingsOpen
          ? 'text-[#d4af37] bg-[#3d2511]' 
          : 'text-[#e8d5b5]/40 hover:text-[#e8d5b5]/80'
      }`}
    >
      <div className={`mb-1 transition-transform ${activeTab === tab && !isGlobalSettingsOpen ? 'scale-110' : 'scale-100'}`}>
        {icon}
      </div>
      <span className="text-[10px] cinzel font-bold tracking-tight uppercase">{label}</span>
      {activeTab === tab && !isGlobalSettingsOpen && <div className="absolute bottom-0 w-1/3 h-0.5 bg-[#d4af37]"></div>}
    </button>
  );

  const MagicIconMobile = () => (
    <div 
      className="w-6 h-6 bg-current transition-all duration-300"
      style={{
        maskImage: "url('https://cdn-icons-png.flaticon.com/512/12616/12616964.png')",
        WebkitMaskImage: "url('https://cdn-icons-png.flaticon.com/512/12616/12616964.png')",
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} theme={theme} language={appLanguage} />;
  }

  if (!selectedCharId && !isGlobalSettingsOpen) {
    if (isLoadingCharacters) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0d0700] text-[#d4af37]">
          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
             <p className="cinzel text-xl animate-pulse">Invocando Pergaminhos...</p>
          </div>
        </div>
      );
    }

    return (
      <CharacterSelection 
        characters={allCharacters} 
        onSelect={setSelectedCharId} 
        onCreate={handleCreateNew}
        onDelete={handleDelete}
        onImport={handleImport}
        onLogout={handleLogout}
        onOpenSettings={() => setIsGlobalSettingsOpen(true)}
        language={appLanguage}
      />
    );
  }

  return (
    <div className={`fixed inset-0 flex flex-col overflow-hidden selection:bg-orange-200 ${theme === 'dark' ? 'dark-mode' : ''}`}>
      
      {/* Container que recebe os filtros de morte */}
      <div className={`absolute inset-0 flex flex-col transition-all duration-1000 ${
        isNearlyDead ? 'animate-pulse-gray' : isDead ? 'is-fully-gray no-borders' : ''
      }`}>
        
        <div className={`fixed inset-0 pointer-events-none z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] ${theme === 'dark' ? 'invert opacity-10' : ''}`}></div>
        <div className={`fixed inset-0 pointer-events-none z-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] ${theme === 'dark' ? 'invert' : ''}`}></div>

        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          {/* CABEÇALHO QUE ROLA JUNTO */}
          <header className={`z-[60] bg-[#2d1b0d] text-[#e8d5b5] shadow-2xl ${theme === 'dark' ? 'border-b border-[#1a1a1a]' : 'border-b border-[#8b4513]'}`}>
            <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-stretch py-2 md:py-4 lg:py-6 gap-3 md:gap-6">
                
                {/* Identidade do Personagem */}
                <div className="flex-1 flex items-center gap-3 md:gap-6 bg-[#1a0f00]/60 backdrop-blur-md rounded-xl md:rounded-2xl border-2 border-[#8b4513]/50 p-2 md:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden group/identity">
                  <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
                  
                  <button 
                    onClick={() => {
                      setSelectedCharId(null);
                      setIsGlobalSettingsOpen(false);
                    }}
                    className="flex-none w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-b from-[#3d2511] to-[#1a0f00] border border-[#8b4513]/50 flex items-center justify-center hover:border-[#d4af37] transition-all group/back active:scale-95 shadow-lg"
                    title={t.change_hero}
                  >
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-[#d4af37] group-hover/back:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="flex-grow min-w-0 flex flex-col justify-center">
                    <div className="relative group/name">
                      <input 
                        value={character?.name || (appLanguage === 'pt' ? 'Configurações Globais' : 'Global Settings')}
                        onChange={(e) => character && updateCharacter({ name: e.target.value })}
                        disabled={!character}
                        className={`bg-transparent text-xl md:text-3xl lg:text-4xl fantasy-title leading-none text-[#d4af37] w-full focus:outline-none truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-all focus:text-[#fffacd] ${!character ? 'pointer-events-none' : ''}`}
                      />
                      {character && <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4af37] group-focus-within/name:w-1/2 transition-all duration-500 opacity-50"></div>}
                    </div>
                    
                    <div className="flex items-center mt-1.5 md:mt-2">
                      <div className={`px-2 md:px-3 py-0.5 md:py-1 rounded-md bg-[#3d2511]/80 border border-[#8b4513]/30 flex items-center gap-2 shadow-inner`}>
                        <span className="text-[7px] md:text-[10px] uppercase tracking-[0.2em] cinzel font-bold text-[#e8d5b5] whitespace-nowrap">{translateValue(character?.class, classTranslations) || 'D&D 5e'}</span>
                        {character?.subclass && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-[#d4af37] opacity-40"></span>
                            <span className="text-[7px] md:text-[10px] uppercase tracking-[0.2em] cinzel font-bold text-[#d4af37] whitespace-nowrap">{translateValue(character.subclass, subclassTranslations)}</span>
                          </>
                        )}
                        <span className="w-1 h-1 rounded-full bg-[#d4af37] opacity-40"></span>
                        <span className="text-[7px] md:text-[10px] uppercase tracking-[0.2em] cinzel font-bold text-[#e8d5b5]/70 whitespace-nowrap">{translateValue(character?.race, raceTranslations) || 'APP'}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                       setIsGlobalSettingsOpen(true);
                       setActiveTab(Tab.Settings);
                    }}
                    className={`md:hidden flex-none p-2.5 rounded-xl border-2 transition-all duration-300 shadow-lg ${activeTab === Tab.Settings || activeTab === Tab.Subscription || isGlobalSettingsOpen ? 'bg-[#d4af37] border-[#fffacd] text-[#1a0f00]' : 'bg-[#1a0f00]/50 border-[#8b4513]/40 text-[#d4af37]'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                  </button>
                </div>

                {/* Status e Experiência */}
                <div className={`flex-none w-full md:w-auto flex items-center gap-3 lg:gap-6 ${!character ? 'opacity-20 pointer-events-none' : ''}`}>
                  <div className="flex-grow md:flex-none md:w-[320px] lg:w-[450px] bg-[#1a0f00]/60 backdrop-blur-md rounded-xl md:rounded-2xl border-2 border-[#8b4513]/50 p-2 md:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden group/artifact">
                    <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
                    
                    <div className="flex items-center gap-2 md:gap-5 mb-1.5 md:mb-3 relative z-10">
                      <div className="relative flex-none">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-b from-[#d4af37] via-[#8b4513] to-[#3d2511] p-[2px] shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-[#d4af37]/20">
                          <div className="w-full h-full rounded-full bg-[#2d1b0d] flex flex-col items-center justify-center border border-black/50 shadow-inner">
                            <span className="text-[5px] md:text-[7px] cinzel font-extrabold text-[#d4af37] uppercase tracking-widest leading-none">{t.level_short}</span>
                            <span className="text-lg md:text-2xl font-bold fantasy-title text-[#e8d5b5] leading-none mt-0.5">{levelData?.level || 1}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-grow flex flex-col min-w-0">
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-[7px] md:text-[10px] cinzel font-bold text-[#d4af37] uppercase tracking-[0.2em] truncate opacity-80">{t.journey_hero}</span>
                          <div className="text-right whitespace-nowrap">
                            <span className="text-[8px] md:text-[11px] fantasy-title text-[#f4e4bc] drop-shadow-md">{character?.exp || 0}</span>
                            <span className="text-[7px] md:text-[8px] cinzel text-[#e8d5b5]/30 mx-1">/</span>
                            <span className="text-[8px] md:text-[10px] fantasy-title text-[#e8d5b5]/40">{levelData?.nextLevelXp || t.legendary}</span>
                          </div>
                        </div>
                        
                        <div className="h-1.5 md:h-3 w-full bg-black/60 rounded-full border border-[#8b4513]/40 overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] p-[1.5px] relative">
                          <div 
                            className="h-full bg-gradient-to-r from-[#5d4037] via-[#d4af37] to-[#f4e4bc] transition-all duration-1000 ease-out relative rounded-full"
                            style={{ width: `${levelData?.progressPercent || 0}%` }}
                          >
                            <div className="absolute top-0 right-0 w-4 h-full bg-white/40 blur-sm rounded-full"></div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-20 mix-blend-overlay"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 relative z-10 pt-1.5 border-t border-[#8b4513]/20">
                      <div className="flex-1 flex items-center gap-1.5 md:gap-2">
                        {/* NOVO: BLOCO ACÚMULO (TOTAL XP) */}
                        {showAccumulatedXp && (
                          <div className="relative flex-1">
                            <input 
                              type="number"
                              min="0"
                              value={character?.exp || 0}
                              onChange={(e) => updateCharacter({ exp: Math.max(0, parseInt(e.target.value) || 0) })}
                              className="bg-black/50 border border-[#d4af37]/30 text-[#d4af37] text-center text-[9px] md:text-xs cinzel font-bold py-1.5 md:py-2 px-0 rounded-lg md:rounded-xl focus:outline-none focus:border-[#d4af37] w-full transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="absolute -top-1.5 left-2 px-1 bg-[#2d1b0d] text-[5px] md:text-[6px] cinzel font-bold text-[#d4af37]/50 uppercase tracking-tighter">{t.accumulation}</span>
                          </div>
                        )}

                        {/* BLOCO DÁDIVA (ADD XP) */}
                        <div className="relative flex-1">
                          <input 
                            type="number"
                            min="0"
                            value={xpToAdd || ''}
                            onChange={(e) => setXpToAdd(Math.max(0, parseInt(e.target.value) || 0))}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddXp()}
                            placeholder="+"
                            className="bg-black/50 border border-[#d4af37]/30 text-[#d4af37] text-center text-[9px] md:text-xs cinzel font-bold py-1.5 md:py-2 px-0 rounded-lg md:rounded-xl focus:outline-none focus:border-[#d4af37] w-full transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="absolute -top-1.5 left-2 px-1 bg-[#2d1b0d] text-[5px] md:text-[6px] cinzel font-bold text-[#d4af37]/50 uppercase tracking-tighter">{t.boon}</span>
                        </div>

                        <button 
                          onClick={handleAddXp} 
                          className="flex-none h-7 md:h-9 px-3 md:px-5 bg-gradient-to-b from-[#8b4513] to-[#3d2511] border border-[#d4af37]/50 rounded-lg md:rounded-xl cinzel text-[8px] md:text-[10px] font-bold text-[#d4af37] hover:from-[#d4af37] hover:to-[#8b4513] hover:text-[#1a0f00] transition-all shadow-lg active:scale-95 uppercase whitespace-nowrap border-b-2"
                        >
                          {t.add}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                       setIsGlobalSettingsOpen(true);
                       setActiveTab(Tab.Settings);
                    }}
                    className={`hidden md:flex flex-none p-3.5 rounded-2xl border-2 transition-all duration-300 shadow-xl active:scale-95 ${activeTab === Tab.Settings || activeTab === Tab.Subscription || isGlobalSettingsOpen ? 'bg-[#d4af37] border-[#fffacd] text-[#1a0f00] shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-[#1a0f00] border-[#8b4513]/60 text-[#d4af37] hover:bg-[#2d1b0d] hover:border-[#d4af37]'}`}
                    title={t.settings}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* NAVEGAÇÃO DESKTOP FIXA (STICKY) */}
          <nav className={`hidden xl:flex sticky top-0 z-[70] bg-[#2d1b0d] border-b-4 ${theme === 'dark' ? 'border-[#1a1a1a]' : 'border-[#8b4513]'} shadow-xl`}>
            <div className="max-w-7xl mx-auto px-8 w-full">
              <div className="flex bg-[#1a0f00]/40 overflow-hidden rounded-t-lg mt-4">
                <NavButton tab={Tab.Sheet} label={t.character_sheet_tab} />
                <NavButton tab={Tab.Inventory} label={t.inventory_tab} />
                {showClassFeaturesTab && <NavButton tab={Tab.ClassFeatures} label={t.class_features_tab} />}
                <NavButton tab={Tab.Magic} label={t.magic_tab} />
                <NavButton tab={Tab.History} label={t.history_tab} />
              </div>
            </div>
          </nav>

          {/* CONTEÚDO PRINCIPAL */}
          <main className="relative z-10">
            <div className="max-w-7xl mx-auto p-2 lg:p-8">
               <div className={`transition-all duration-500 rounded-xl shadow-2xl border ${theme === 'dark' ? 'bg-[#121212] border-[#2a2a2a]' : 'bg-[#fdf5e6]/95 border-[#8b4513]/20'}`}>
                  {renderTab()}
               </div>
            </div>
          </main>
        </div>

        {/* Navegação Mobile/Tablet */}
        <nav className="xl:hidden flex-none z-[100] bg-[#2d1b0d] border-t-2 border-[#8b4513] shadow-[0_-5px_20px_rgba(0,0,0,0.7)] flex backdrop-blur-md">
          <MobileNavButton 
            tab={Tab.Sheet} 
            label={t.sheet} 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003+3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" /></svg>} 
          />
          <MobileNavButton 
            tab={Tab.Inventory} 
            label={t.inventory} 
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 7H17V6C17 4.34 15.66 3 14 3H10C8.34 3 7 4.34 7 6V7H6C4.34 7 3 8.34 3 10V20C3 21.66 4.34 23 6 23H18C19.66 23 21 21.66 21 20V10C21 8.34 19.66 7 18 7ZM9 6C9 5.45 9.45 5 10 5H14C14.55 5 15 5.45 15 6V7H9V6ZM15 13H9V11H15V13Z" />
              </svg>
            } 
          />
          {showClassFeaturesTab && (
            <MobileNavButton 
              tab={Tab.ClassFeatures} 
              label={appLanguage === 'pt' ? "Habilidades" : "Features"} 
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>} 
            />
          )}
          <MobileNavButton 
            tab={Tab.Magic} 
            label={t.magic} 
            icon={<MagicIconMobile />} 
          />
          <MobileNavButton 
            tab={Tab.History} 
            label={t.bio} 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" /></svg>} 
          />
        </nav>
      </div>

      {/* MODAL DE ESCOLHA DE SUBCLASSE */}
      {showSubclassModal && character && character.class && showClassFeaturesTab && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
           <div className={`relative max-w-2xl w-full border-4 rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,1)] overflow-hidden flex flex-col ${isDark ? 'bg-[#1a1a1a] border-[#333]' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
              <div className={`absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]`}></div>
              
              <div className={`p-8 sm:p-12 relative z-10 flex flex-col items-center`}>
                 <button 
                   onClick={() => setShowSubclassModal(false)}
                   className="absolute top-8 right-8 text-[#d4af37] opacity-40 hover:opacity-100 transition-opacity"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>

                 <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-6 shadow-lg ${isDark ? 'bg-black border-[#d4af37] text-[#d4af37]' : 'bg-[#2d1b0d] border-[#d4af37] text-[#d4af37]'}`}>
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                 </div>
                 
                 <h2 className={`fantasy-title text-3xl sm:text-5xl mb-4 text-center ${isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>
                   {t.choose_subclass}
                 </h2>
                 <p className={`parchment-text text-lg italic opacity-70 text-center mb-10 max-w-md ${isDark ? 'text-[#e8d5b5]' : 'text-[#5d4037]'}`}>
                   {t.subclass_selection_desc}
                 </p>

                 <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto custom-scrollbar p-2">
                    {(SUBCLASSES_PHB[character.class] || []).map(sub => (
                      <button 
                        key={sub}
                        onClick={() => setTempSubclass(sub)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left group ${
                          tempSubclass === sub
                          ? (isDark ? 'bg-[#d4af37] border-white text-black' : 'bg-[#8b4513] border-[#d4af37] text-[#fdf5e6]')
                          : (isDark ? 'bg-white/5 border-white/10 text-[#e8d5b5] hover:border-[#d4af37]/40' : 'bg-white border-[#8b4513]/20 text-[#3e2723] hover:border-[#8b4513]')
                        }`}
                      >
                         <span className="fantasy-title text-xl sm:text-2xl">{translateValue(sub, subclassTranslations)}</span>
                      </button>
                    ))}
                 </div>

                 <div className="flex gap-4 w-full mt-10">
                    <button 
                      onClick={() => setShowSubclassModal(false)}
                      className={`flex-1 py-4 rounded-2xl cinzel text-xs font-bold uppercase tracking-[0.2em] border-2 transition-all ${
                        isDark ? 'border-white/10 text-white/40 hover:bg-white/5' : 'border-[#8b4513]/20 text-[#8b4513]/60 hover:bg-black/5'
                      }`}
                    >
                      {t.cancel}
                    </button>
                    <button 
                      disabled={!tempSubclass}
                      onClick={() => {
                        if (tempSubclass) {
                           const updates: Partial<Character> = { subclass: tempSubclass };
                           // Reset totem animal if switching subclasses for Barbarian
                           if (tempSubclass !== "Caminho do Guerreiro Totêmico") {
                             updates.totemAnimal = null;
                           }
                           updateCharacter(updates);
                           setShowSubclassModal(false);
                           setTempSubclass(null);
                        }
                      }}
                      className={`flex-[2] py-5 rounded-2xl cinzel text-sm font-bold uppercase tracking-[0.4em] transition-all border-b-8 active:translate-y-2 active:border-b-0 shadow-2xl ${
                        !tempSubclass 
                        ? 'bg-gray-800 text-gray-500 border-black/40 opacity-50' 
                        : (isDark ? 'bg-[#d4af37] text-black border-black/60 hover:brightness-110 shadow-[0_0_30px_rgba(212,175,55,0.4)]' : 'bg-gradient-to-b from-[#8b4513] to-[#5d4037] text-[#fdf5e6] border-black/60 hover:brightness-110')
                      }`}
                    >
                      {t.confirm_selection}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* NOVO AVISO DE MORTE */}
      {character && isDead && showDeathOverlay && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-6 text-center animate-in fade-in duration-1000">
          <div className="flex flex-col items-center max-w-lg">
            <div className="w-24 h-24 mb-6 text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C7.03125 2 3 6.03125 3 11C3 13.9062 4.40625 16.5 6.59375 18.0938L6.28125 21.0312C6.21875 21.5625 6.625 22 7.15625 22H16.8438C17.375 22 17.7812 21.5625 17.7188 21.0312L17.4062 18.0938C19.5938 16.5 21 13.9062 21 11C21 6.03125 16.9688 2 12 2ZM9 12C8.4375 12 8 11.5625 8 11C8 10.4375 8.4375 10 9 10C9.5625 10 10 10.4375 10 11C10 11.5625 9.5625 12 9 12ZM15 12C14.4375 12 14 11.5625 14 11C14 10.4375 14.4375 10 15 10C15.5625 10 16 10.4375 16 11C16 11.5625 15.5625 12 15 12Z"/>
              </svg>
            </div>
            <h3 className="cinzel font-bold text-4xl md:text-5xl text-red-600 mb-2 drop-shadow-md uppercase tracking-wider">
              {character?.name}, {t.died}
            </h3>
            <p className="cinzel text-lg md:text-xl text-[#f4e4bc] mb-12 opacity-80 leading-relaxed italic">
              {t.legend_told}
            </p>
            
            <div className="flex flex-col gap-4 w-full">
              <button 
                onClick={() => updateCharacter({ deathSaves: { successes: 0, failures: 0 }, hp: { ...character!.hp, current: 1 } })}
                className="cinzel text-sm font-bold uppercase tracking-[0.4em] text-[#d4af37] border-2 border-[#d4af37]/60 px-12 py-4 rounded-full hover:bg-[#d4af37] hover:text-black transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95 bg-black/40 backdrop-blur-md"
              >
                {t.back_to_life}
              </button>
              
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => setShowDeathOverlay(false)}
                  className="cinzel text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8d5b5]/60 hover:text-[#e8d5b5] px-6 py-3 transition-all"
                >
                  {t.view_sheet}
                </button>
                <button 
                  onClick={() => {
                    setSelectedCharId(null);
                    setIsGlobalSettingsOpen(false);
                  }}
                  className="cinzel text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8d5b5]/60 hover:text-[#e8d5b5] px-6 py-3 transition-all"
                >
                  {t.another_scroll}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botão flutuante para reabrir o aviso */}
      {character && isDead && !showDeathOverlay && (
        <button 
          onClick={() => setShowDeathOverlay(true)}
          className="fixed bottom-6 right-6 z-[1000] bg-red-900 text-white p-4 rounded-full shadow-2xl animate-pulse flex items-center gap-2 border-2 border-[#d4af37]"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 1 1.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" /></svg>
          <span className="cinzel text-[10px] font-bold uppercase tracking-widest">{t.open_verdict}</span>
        </button>
      )}

      {/* Error Modal */}
      {errorMessage && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-[#2d1b0d] border-2 border-red-500/50 rounded-2xl p-6 max-w-md w-full shadow-2xl text-center">
            <h3 className="text-red-500 cinzel font-bold text-xl mb-2">Erro Arcano</h3>
            <p className="text-[#e8d5b5] mb-6">{errorMessage}</p>
            <button 
              onClick={() => setErrorMessage(null)}
              className="bg-red-900/50 hover:bg-red-900 text-[#e8d5b5] px-6 py-2 rounded-lg cinzel font-bold border border-red-500/30 transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
