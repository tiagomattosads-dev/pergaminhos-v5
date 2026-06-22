
import React from 'react';
import { Attribute, Character, Skill, ClassMetadata } from './types';
import { 
  Axe, 
  Guitar, 
  ShieldPlus, 
  Leaf, 
  Sword, 
  Shield, 
  Flame, 
  Skull, 
  Settings,
  LayoutGrid,
  Zap,
  Sparkles,
  BicepsFlexed,
  Music,
  Ghost,
  Moon,
  Scroll,
  Brain,
  Search,
  PawPrint,
  HeartPulse,
  Eye,
  Users,
  Hand,
  Sun,
  Compass
} from 'lucide-react';

// Mapeamento de ícones por classe
export const HoodIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="m24,12c0-.964-.502-3.481-1.502-5.065-.321-.51-.498-1.074-.498-1.588,0-.354.621-.919.992-1.256.242-.221.456-.422.597-.592.536-.646.647-1.519.292-2.276-.354-.753-1.093-1.221-1.927-1.221h-7.954c-1.033,0-1.954.009-2.603.041C5.345.338.356,5.301.042,11.338c-.196,3.764.558,6.877,2.442,10.096.09.153.038.289,0,.355-.04.069-.135.186-.319.186h-1.165c-.553,0-1,.448-1,1s.447,1,1,1h1.165c.858,0,1.627-.445,2.055-1.191.425-.742.422-1.625-.009-2.361-1.699-2.9-2.349-5.586-2.171-8.981C2.302,6.417,6.455,2.286,11.495,2.039c.625-.031,1.511-.039,2.505-.039h7.954c.027,0,.083,0,.116.072.037.079-.005.13-.021.15-.094.114-.241.242-.403.389-.655.596-1.646,1.498-1.646,2.735,0,.9.279,1.818.807,2.655.729,1.154,1.193,3.275,1.193,3.999,0,3.267-.54,5.323-2.221,8.463-.404.756-.386,1.644.051,2.373.428.714,1.183,1.14,2.018,1.14h1.152c.553,0,1-.448,1-1s-.447-1-1-1h-1.152c-.166,0-.256-.091-.302-.168-.034-.058-.104-.213-.003-.401,1.837-3.432,2.457-5.805,2.457-9.407Z"/><path d="m12,6c-3.859,0-7,3.346-7,7.458,0,3.85,3.099,7.694,4.944,9.643.549.58,1.279.899,2.056.899s1.507-.319,2.055-.898c1.847-1.949,4.945-5.793,4.945-9.644,0-4.112-3.141-7.458-7-7.458Zm.603,15.726c-.334.354-.87.354-1.206,0-1.642-1.732-4.396-5.111-4.396-8.268,0-3.01,2.243-5.458,5-5.458s5,2.448,5,5.458c0,3.157-2.755,6.535-4.397,8.268Z"/>
  </svg>
);

export const BowIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21,0H18a1,1,0,0,0,0,2h2.586L17.361,5.225A13.4,13.4,0,0,0,1.418,4.141a3.1,3.1,0,0,0-1.4,2.294A3.144,3.144,0,0,0,.925,9l6.329,6.33L4.586,18H1a1,1,0,0,0,0,2H2.586L1.293,21.293a1,1,0,1,0,1.414,1.414L4,21.414V23a1,1,0,0,0,2,0V19.414l2.668-2.668L15,23.075A3.146,3.146,0,0,0,17.229,24a2.922,2.922,0,0,0,.336-.018,3.1,3.1,0,0,0,2.294-1.4A13.4,13.4,0,0,0,18.775,6.639L22,3.414V6a1,1,0,0,0,2,0V3A3,3,0,0,0,21,0ZM2.339,7.588a1.158,1.158,0,0,1-.333-.944,1.109,1.109,0,0,1,.5-.826A11.261,11.261,0,0,1,8.645,4.011a11.383,11.383,0,0,1,7.3,2.633L8.668,13.918Zm15.843,13.9a1.109,1.109,0,0,1-.826.5,1.155,1.155,0,0,1-.944-.333l-6.33-6.329,7.275-7.274A11.386,11.386,0,0,1,18.182,21.493Z"/>
  </svg>
);

export const DaggerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="m21.218,8.096l-1.597-1.596,3.939-3.939c.586-.585.586-1.536,0-2.121-.586-.586-1.535-.586-2.121,0l-3.94,3.94-1.597-1.596C14.208,1.087,11.955.102,9.559.007c-.821-.022-1.524.613-1.558,1.44-.032.828.612,1.525,1.44,1.558,1.267.049,2.476.464,3.495,1.185l-5.683,5.683c-2.501,2.5-4.576,5.371-6.168,8.532,0,0-.996,2.014-1.023,2.136-.21.952.076,1.932.766,2.621.54.541,1.26.833,2.004.833.204,0,.411-.022.617-.067.121-.027,2.137-1.023,2.137-1.023,3.159-1.591,6.029-3.666,8.531-6.167l5.684-5.685c.726,1.022,1.143,2.235,1.193,3.507.032.808.696,1.441,1.498,1.441.02,0,.04,0,.06,0,.828-.033,1.473-.73,1.44-1.558-.095-2.396-1.08-4.649-2.775-6.345Zm-9.222,6.52c-2.275,2.275-4.887,4.162-7.76,5.609l-.948.477.478-.947c1.447-2.875,3.335-5.485,5.609-7.76l5.749-5.749,2.621,2.621-5.749,5.75Z"/>
  </svg>
);

export const MonkIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.121,13.627c.623-.623,.94-1.484,.869-2.363-.07-.879-.525-1.681-1.249-2.202-.288-.207-.608-.352-.942-.439,.215-.969-.047-2.022-.799-2.774-.528-.528-1.24-.8-1.964-.835-.031-.725-.313-1.441-.865-1.994-.754-.753-1.81-1.014-2.78-.797-.133-.484-.377-.944-.756-1.324-1.17-1.17-3.072-1.17-4.242,0l-1.582,1.582c-.544,.545-.846,1.262-.87,2.028-.679-.165-1.384-.103-2.017,.208-.721,.352-1.26,.963-1.521,1.721l-2.311,7.005L0,15.536v2.828l3.844-3.844,2.452-7.434h0c.086-.252,.266-.456,.506-.573s.512-.134,.763-.048l3.999,1.381c.521,.179,.801,.75,.622,1.271-.18,.522-.753,.799-1.271,.622l-3.013-1.039-.652,1.891,3.014,1.04c.322,.11,.649,.163,.972,.163,1.246,0,2.414-.783,2.842-2.026,.029-.086,.039-.172,.06-.259,.112,.019,.227,.028,.342,.033,.037,.715,.317,1.42,.861,1.964h0c.546,.546,1.251,.826,1.966,.863,.037,.716,.317,1.421,.863,1.966,.248,.248,.528,.442,.828,.585l-3.644,3.645s-.001,0-.001,0c-.811,.811-1.822,1.397-2.926,1.698l-2.201,.6-3.136,3.136h2.829l1.347-1.346,1.688-.46c1.439-.392,2.758-1.157,3.814-2.213,0,0,0-.001,0-.001l6.352-6.352ZM13.222,3.728s-.714,.717-.719,.721l-.859,.861c-.121,.122-.265,.208-.427,.255l.015,.051-1.045-.361c-.158-.182-.255-.407-.255-.651,0-.268,.104-.52,.293-.709l1.582-1.582c.391-.39,1.023-.39,1.414,0,.389,.39,.389,1.023,0,1.414Zm2.12,3.536c-.376,.376-1.033,.378-1.413,0h0c-.189-.189-.293-.44-.293-.707,0-.265,.103-.513,.289-.701l1.418-1.42c.195-.195,.451-.293,.708-.293s.512,.098,.706,.292c.391,.39,.391,1.025,0,1.415l-1.416,1.415Zm2.83,2.828c-.39,.389-1.023,.39-1.415,0-.39-.39-.389-1.025,0-1.414l1.416-1.415c.376-.376,1.033-.378,1.413,0,.39,.39,.39,1.024,0,1.415l-1.414,1.414Zm3.535,2.121l-.725,.725c-.391,.372-1.012,.366-1.396-.017-.39-.39-.39-1.024,0-1.415l.631-.631c.229-.229,.537-.351,.829-.351,.191,0,.376,.053,.526,.161,.25,.18,.4,.442,.425,.74,.023,.293-.082,.58-.29,.788Zm.333,6006l1.92,.562c-.771,2.631-2.511,4.373-5.171,5.176l-.578-1.914c2-.604,3.252-1.855,3.829-3.824ZM1.96,5.781L.04,5.219C.789,2.662,2.626,.823,5.211,.042l.578,1.915c-1.944,.587-3.269,1.909-3.829,3.824Z"/>
  </svg>
);

export const WarriorIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="m23.414.587a2.02 2.02 0 0 0 -1.941-.513l-3.715 1.218-12.24 12.24a14.58 14.58 0 0 0 -4.376-1.522l-.286 1.979a12.638 12.638 0 0 1 5.354 2.387l-3.71 3.71-1.024-1.024-1.414 1.414 3.5 3.5 1.414-1.414-1.062-1.062 3.71-3.71a12.615 12.615 0 0 1 2.386 5.354l1.98-.286a14.515 14.515 0 0 0 -1.522-4.376l12.24-12.24 1.245-3.81a1.994 1.994 0 0 0 -.539-1.845zm-2.458 4.579-11.593 11.594a11.287 11.287 0 0 0 -.989-1.134 11.36 11.36 0 0 0 -1.133-.988l11.594-11.594 3.157-1.037z"/>
  </svg>
);

export const CLASS_ICONS: Record<string, any> = {
  "Bárbaro": Axe,
  "Bardo": Guitar,
  "Clérigo": ShieldPlus,
  "Druida": Leaf,
  "Guerreiro": WarriorIcon,
  "Monge": MonkIcon,
  "Paladino": Shield,
  "Paladin": Shield,
  "Patrulheiro": BowIcon,
  "Ladino": DaggerIcon,
  "Feiticeiro": Flame,
  "Bruxo": Skull,
  "Mago": HoodIcon,
  "Artífice": Settings,
};

export const XP_TABLE = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000,
  85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

export const getLevelFromXP = (xp: number): number => {
  const level = XP_TABLE.findIndex(req => xp < req);
  if (level === -1) return 20;
  return level === 0 ? 1 : level;
};

export const getProficiencyFromLevel = (level: number): number => {
  return Math.floor((level - 1) / 4) + 2;
};

export const CLASSES_PHB: Record<string, ClassMetadata> = {
  "Bárbaro": { isSpellcaster: false, casterType: "none", spellAbility: null, spellsModel: "none", hitDie: "1d12" },
  "Bardo": { isSpellcaster: true, casterType: "full", spellAbility: Attribute.CAR, spellsModel: "known", hitDie: "1d8" },
  "Clérigo": { isSpellcaster: true, casterType: "full", spellAbility: Attribute.SAB, spellsModel: "prepared", hitDie: "1d8" },
  "Druida": { isSpellcaster: true, casterType: "full", spellAbility: Attribute.SAB, spellsModel: "prepared", hitDie: "1d8" },
  "Guerreiro": { isSpellcaster: false, casterType: "none", spellAbility: null, spellsModel: "none", hitDie: "1d10" },
  "Monge": { isSpellcaster: false, casterType: "none", spellAbility: null, spellsModel: "none", hitDie: "1d8" },
  "Paladino": { isSpellcaster: true, casterType: "half", spellAbility: Attribute.CAR, spellsModel: "prepared", hitDie: "1d10" },
  "Patrulheiro": { isSpellcaster: true, casterType: "half", spellAbility: Attribute.SAB, spellsModel: "known", hitDie: "1d10" },
  "Ladino": { isSpellcaster: false, casterType: "none", spellAbility: null, spellsModel: "none", hitDie: "1d8" },
  "Feiticeiro": { isSpellcaster: true, casterType: "full", spellAbility: Attribute.CAR, spellsModel: "known", hitDie: "1d6" },
  "Bruxo": { isSpellcaster: true, casterType: "pact", spellAbility: Attribute.CAR, spellsModel: "known", hitDie: "1d8" },
  "Mago": { isSpellcaster: true, casterType: "full", spellAbility: Attribute.INT, spellsModel: "prepared", hitDie: "1d6" },
  "Artífice": { isSpellcaster: true, casterType: "half", spellAbility: Attribute.INT, spellsModel: "prepared", hitDie: "1d8" },
};

export const SUBCLASS_LEVELS: Record<string, number> = {
  "Clérigo": 1,
  "Feiticeiro": 1,
  "Bruxo": 1,
  "Mago": 2,
  "Druida": 2,
  "Bárbaro": 3,
  "Bardo": 3,
  "Guerreiro": 3,
  "Monge": 3,
  "Paladino": 3,
  "Patrulheiro": 3,
  "Ladino": 3,
  "Artífice": 3,
};

export const SUBCLASSES_PHB: Record<string, string[]> = {
  "Bárbaro": ["Caminho do Furioso", "Caminho do Guerreiro Totêmico"],
  "Bardo": ["Colégio do Conhecimento", "Colégio da Bravura"],
  "Clérigo": ["Domínio do Conhecimento", "Domínio da Vida", "Domínio da Luz", "Domínio da Natureza", "Domínio da Tempestade", "Domínio da Trapaça", "Domínio da Guerra"],
  "Druida": ["Círculo da Terra", "Círculo da Lua"],
  "Guerreiro": ["Campeão", "Mestre de Batalha", "Cavaleiro Arcano"],
  "Monge": ["Caminho da Mão Aberta", "Caminho da Sombra", "Caminho dos Quatro Elementos"],
  "Paladino": ["Juramento da Devoção", "Juramento dos Anciões", "Juramento de Vingança"],
  "Patrulheiro": ["Caçador", "Mestre das Bestas"],
  "Ladino": ["Ladrão", "Assassino", "Trapaceiro Arcano"],
  "Feiticeiro": ["Linhagem Dracônica", "Magia Selvagem"],
  "Bruxo": ["A Arquifada", "O Corruptor", "O Grande Antigo"],
  "Mago": ["Escola de Abjuração", "Escola de Adivinhação", "Escola de Conjuração", "Escola de Encantamento", "Escola de Evocação", "Escola de Ilusão", "Escola de Necromancia", "Escola de Transmutação"],
  "Artífice": ["Alquimista", "Armeiro", "Artilheiro", "Serralheiro de Batalha"],
};

export const SKILLS: Skill[] = [
  { name: 'Acrobacia', attribute: Attribute.DES, proficient: false, icon: Zap },
  { name: 'Arcanismo', attribute: Attribute.INT, proficient: true, icon: Sparkles },
  { name: 'Atletismo', attribute: Attribute.FOR, proficient: false, icon: BicepsFlexed },
  { name: 'Atuação', attribute: Attribute.CAR, proficient: false, icon: Music },
  { name: 'Enganação', attribute: Attribute.CAR, proficient: false, icon: Ghost },
  { name: 'Furtividade', attribute: Attribute.DES, proficient: false, icon: Moon },
  { name: 'História', attribute: Attribute.INT, proficient: false, icon: Scroll },
  { name: 'Intimidação', attribute: Attribute.CAR, proficient: false, icon: Flame },
  { name: 'Intuição', attribute: Attribute.SAB, proficient: false, icon: Brain },
  { name: 'Investigação', attribute: Attribute.INT, proficient: true, icon: Search },
  { name: 'Lidar com Animais', attribute: Attribute.SAB, proficient: false, icon: PawPrint },
  { name: 'Medicina', attribute: Attribute.SAB, proficient: false, icon: HeartPulse },
  { name: 'Natureza', attribute: Attribute.INT, proficient: false, icon: Leaf },
  { name: 'Percepção', attribute: Attribute.SAB, proficient: true, icon: Eye },
  { name: 'Persuasão', attribute: Attribute.CAR, proficient: true, icon: Users },
  { name: 'Prestidigitação', attribute: Attribute.DES, proficient: false, icon: Hand },
  { name: 'Religião', attribute: Attribute.INT, proficient: false, icon: Sun },
  { name: 'Sobrevivência', attribute: Attribute.SAB, proficient: false, icon: Compass },
];

export const INITIAL_CHARACTER: Character = {
  id: "hero-default",
  name: "Kaiden Arvek",
  level: 1,
  class: "Guerreiro",
  subclass: null,
  classMetadata: CLASSES_PHB["Guerreiro"],
  race: "Humano",
  background: "Soldado",
  alignment: "Leal e Neutro",
  exp: 0,
  inspiration: 0,
  portrait: null,
  hp: { current: 12, max: 12, temp: 0 },
  deathSaves: { successes: 0, failures: 0 },
  ac: 16,
  initiativeBonus: 0,
  speed: "9m",
  stats: {
    [Attribute.FOR]: 15,
    [Attribute.DES]: 12,
    [Attribute.CON]: 14,
    [Attribute.INT]: 10,
    [Attribute.SAB]: 12,
    [Attribute.CAR]: 8,
  },
  proficiencies: {
    skills: ['Atletismo', 'Intimidação', 'Percepção', 'Sobrevivência'],
    saves: [Attribute.FOR, Attribute.CON],
    languages: ['Comum'],
    tools: ['Um jogo de cartas'],
  },
  personality: "Eu sou direto e espero o mesmo dos outros. O campo de batalha não tem lugar para sutilezas.",
  ideals: "Honra. Se eu perder minha honra, eu perco a mim mesmo.",
  bonds: "Aqueles que lutam ao meu lado valem mais do que qualquer tesouro.",
  flaws: "Minha confiança cega em ordens militares às vezes me impede de ver a justiça óbvia.",
  backstory: "Kaiden serviu na guarda royal por anos, até que uma conspiração o forçou ao exílio. Agora ele busca limpar seu nome.",
  inventory: [
    { id: '1', name: 'Cota de Malha', weight: 25, quantity: 1, description: 'Armadura pesada.', equipped: true },
  ],
  weapons: [
    { name: 'Espada Longa', bonus: '+5', damage: '1d8+3', type: '1 Mão', description: 'Uma lâmina de aço bem forjada.' },
  ],
  otherAttacks: [],
  spells: [],
  spellSlots: {},
  currency: { pp: 0, gp: 10, sp: 0, cp: 0 },
  language: 'pt',
};

export const createNewCharacter = (): Character => ({
  ...INITIAL_CHARACTER,
  id: Date.now().toString(),
  name: "Novo Aventureiro",
  level: 1,
  class: "Guerreiro",
  subclass: null,
  classMetadata: CLASSES_PHB["Guerreiro"],
  race: "Humano",
  portrait: null,
  inspiration: 0,
  hp: { current: 10, max: 10, temp: 0 },
  deathSaves: { successes: 0, failures: 0 },
  stats: {
    [Attribute.FOR]: 10, [Attribute.DES]: 10, [Attribute.CON]: 10,
    [Attribute.INT]: 10, [Attribute.SAB]: 10, [Attribute.CAR]: 10,
  },
  proficiencies: { skills: [], saves: [], languages: ['Comum'], tools: [] },
  inventory: [],
  weapons: [],
  otherAttacks: [],
  spells: [],
  backstory: "",
  personality: "",
  ideals: "",
  bonds: "",
  flaws: "",
  currency: { pp: 0, gp: 0, sp: 0, cp: 0 },
  language: 'pt',
});
