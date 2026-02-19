import React from 'react';
import { Character } from '../types';
import { translations } from '../translations';

interface Props {
  character?: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
  appLanguage: 'pt' | 'en';
  setAppLanguage: (lang: 'pt' | 'en') => void;
  showClassFeaturesTab: boolean;
  setShowClassFeaturesTab: (show: boolean) => void;
  abbreviateAttributes: boolean;
  setAbbreviateAttributes: (abbr: boolean) => void;
  showAccumulatedXp: boolean;
  setShowAccumulatedXp: (show: boolean) => void;
}

const Settings: React.FC<Props> = ({ 
  character, 
  updateCharacter, 
  theme, 
  setTheme, 
  onNavigate, 
  onLogout,
  appLanguage,
  setAppLanguage,
  showClassFeaturesTab,
  setShowClassFeaturesTab,
  abbreviateAttributes,
  setAbbreviateAttributes,
  showAccumulatedXp,
  setShowAccumulatedXp
}) => {
  const isDark = theme === 'dark';
  const t = translations[appLanguage];
  
  const handleExport = () => {
    if (!character) return;
    const dataStr = JSON.stringify(character, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${character.name.replace(/\s+/g, '_')}_cronica.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
      <h3 className={`cinzel text-[10px] font-extrabold uppercase tracking-[0.25em] px-4 mb-2 ${isDark ? 'text-[#d4af37]/60' : 'text-[#8b4513]/60'}`}>
        {title}
      </h3>
      <div className={`overflow-hidden border-y sm:border-x sm:rounded-2xl ${
        isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-[#8b4513]/10'
      }`}>
        {children}
      </div>
    </div>
  );

  const SettingsItem: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    description?: string; 
    action?: React.ReactNode;
    onClick?: () => void;
    danger?: boolean;
  }> = ({ icon, title, description, action, onClick, danger }) => (
    <div 
      onClick={onClick}
      className={`flex items-center gap-4 p-4 transition-colors relative group ${
        onClick ? 'cursor-pointer active:bg-black/5' : ''
      } ${!isDark && 'hover:bg-[#8b4513]/5'} ${isDark && 'hover:bg-white/5'}`}
    >
      <div className={`flex-none w-10 h-10 rounded-xl flex items-center justify-center ${
        danger 
          ? 'bg-red-500/10 text-red-500' 
          : (isDark ? 'bg-white/5 text-[#d4af37]' : 'bg-[#8b4513]/5 text-[#8b4513]')
      }`}>
        {icon}
      </div>
      <div className="flex-grow min-w-0">
        <p className={`cinzel text-sm font-bold truncate ${danger ? 'text-red-500' : (isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]')}`}>
          {title}
        </p>
        {description && (
          <p className={`parchment-text text-[11px] truncate opacity-60 ${isDark ? 'text-[#e8d5b5]' : 'text-[#5d4037]'}`}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex-none">{action}</div>}
      <div className={`absolute bottom-0 left-14 right-0 h-px transition-opacity ${
        isDark ? 'bg-white/5' : 'bg-black/5'
      } group-last:opacity-0`}></div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Título do App Style */}
      <div className="text-center mb-10">
        <h2 className={`fantasy-title text-4xl mb-1 ${isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>
          {t.settings}
        </h2>
        <p className={`cinzel text-[9px] uppercase tracking-[0.3em] opacity-40 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
          O Pergaminho v1.5.0
        </p>
      </div>

      {/* SESSÃO: HERÓI */}
      <SettingsSection title={appLanguage === 'pt' ? "Conta & Aventureiro" : "Account & Adventurer"}>
        <SettingsItem 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
          title={t.change_hero}
          description={t.change_record}
          onClick={() => onNavigate('SELECTION')}
        />
        <SettingsItem 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
          title={t.hero_seal}
          description={t.wanderer}
          action={
            <button 
              onClick={(e) => { e.stopPropagation(); onNavigate('SUBSCRIPTION'); }}
              className={`px-3 py-1.5 rounded-lg cinzel text-[9px] font-bold uppercase tracking-widest border transition-all ${
                isDark ? 'bg-[#d4af37] text-black border-black/20 hover:brightness-110' : 'bg-[#8b4513] text-white border-black/20 hover:bg-[#3e2723]'
              }`}
            >
              {t.manage}
            </button>
          }
        />
        <SettingsItem 
          danger
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>}
          title={t.logout}
          description={t.end_session}
          onClick={onLogout}
        />
      </SettingsSection>

      {/* SESSÃO: PREFERÊNCIAS */}
      <SettingsSection title={appLanguage === 'pt' ? "Preferências" : "Preferences"}>
        <SettingsItem 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5a18.022 18.022 0 01-3.827-5.802M13 15.5l5.5 15.5M14.5 21a6.744 6.744 0 11-9.032-9.212M20 19l-3.5-7.333L13 19M14.167 15h5.166" /></svg>}
          title={t.kingdom_language}
          action={
            <select 
              value={appLanguage}
              onChange={(e) => setAppLanguage(e.target.value as 'pt' | 'en')}
              className={`bg-transparent cinzel text-[10px] font-bold uppercase outline-none cursor-pointer p-1 rounded ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}
            >
              <option value="pt" className={isDark ? "bg-[#1a1a1a]" : "bg-white"}>PT-BR</option>
              <option value="en" className={isDark ? "bg-[#1a1a1a]" : "bg-white"}>EN-US</option>
            </select>
          }
        />
        <SettingsItem 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
          title={t.soul_mirror}
          description={theme === 'dark' ? t.night : t.day}
          action={
            <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${isDark ? 'bg-[#d4af37]' : 'bg-gray-300'}`} onClick={() => setTheme(isDark ? 'light' : 'dark')}>
              <div className={`absolute top-1 w-4 h-4 rounded-full transition-all shadow-md bg-white ${isDark ? 'left-7' : 'left-1'}`}></div>
            </div>
          }
        />
        <SettingsItem 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          title={t.show_features_tab}
          description={t.features_tab_desc}
          action={
            <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${showClassFeaturesTab ? 'bg-[#d4af37]' : 'bg-gray-300'}`} onClick={() => setShowClassFeaturesTab(!showClassFeaturesTab)}>
              <div className={`absolute top-1 w-4 h-4 rounded-full transition-all shadow-md bg-white ${showClassFeaturesTab ? 'left-7' : 'left-1'}`}></div>
            </div>
          }
        />
        <SettingsItem 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
          title={t.abbreviate_attributes}
          description={t.abbreviate_attributes_desc}
          action={
            <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${abbreviateAttributes ? 'bg-[#d4af37]' : 'bg-gray-300'}`} onClick={() => setAbbreviateAttributes(!abbreviateAttributes)}>
              <div className={`absolute top-1 w-4 h-4 rounded-full transition-all shadow-md bg-white ${abbreviateAttributes ? 'left-7' : 'left-1'}`}></div>
            </div>
          }
        />
        <SettingsItem 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          title={t.show_accumulated_xp}
          description={t.show_accumulated_xp_desc}
          action={
            <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${showAccumulatedXp ? 'bg-[#d4af37]' : 'bg-gray-300'}`} onClick={() => setShowAccumulatedXp(!showAccumulatedXp)}>
              <div className={`absolute top-1 w-4 h-4 rounded-full transition-all shadow-md bg-white ${showAccumulatedXp ? 'left-7' : 'left-1'}`}></div>
            </div>
          }
        />
      </SettingsSection>

      {/* SESSÃO: DADOS (SÓ SE TIVER PERSONAGEM) */}
      {character && (
        <SettingsSection title={t.manuscript_library}>
          <SettingsItem 
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>}
            title={t.extract_chronicle}
            description={character.name}
            onClick={handleExport}
          />
        </SettingsSection>
      )}

      {/* SESSÃO: SUPORTE */}
      <SettingsSection title={appLanguage === 'pt' ? "Comunidade & Ajuda" : "Community & Help"}>
        <SettingsItem 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>}
          title={t.owl_messages}
          description={t.feedback_suggestions}
          onClick={() => window.open('https://forms.gle/XKueShJSMiuRa3ud7', '_blank')}
        />
        <SettingsItem 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          title={t.digital_chronicle}
          description="Build 1.5.0.24 • Runic Security"
        />
      </SettingsSection>

      {/* Roda-pé sutil */}
      <div className="text-center opacity-20 py-4">
        <svg className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
        <p className="cinzel text-[8px] uppercase tracking-[0.5em]">De aventureiros para aventureiros</p>
      </div>

    </div>
  );
};

export default Settings;
