
import { Attribute, Character, Skill, ClassMetadata } from './types';

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
};

export const SKILLS: Skill[] = [
  { name: 'Acrobacia', attribute: Attribute.DES, proficient: false },
  { name: 'Adestrar Animais', attribute: Attribute.SAB, proficient: false },
  { name: 'Arcanismo', attribute: Attribute.INT, proficient: true },
  { name: 'Atletismo', attribute: Attribute.FOR, proficient: false },
  { name: 'Atuação', attribute: Attribute.CAR, proficient: false },
  { name: 'Enganação', attribute: Attribute.CAR, proficient: false },
  { name: 'Furtividade', attribute: Attribute.DES, proficient: false },
  { name: 'História', attribute: Attribute.INT, proficient: false },
  { name: 'Intimidação', attribute: Attribute.CAR, proficient: false },
  { name: 'Intuição', attribute: Attribute.SAB, proficient: false },
  { name: 'Investigação', attribute: Attribute.INT, proficient: true },
  { name: 'Medicina', attribute: Attribute.SAB, proficient: false },
  { name: 'Natureza', attribute: Attribute.INT, proficient: false },
  { name: 'Percepção', attribute: Attribute.SAB, proficient: true },
  { name: 'Persuasão', attribute: Attribute.CAR, proficient: true },
  { name: 'Prestidigitação', attribute: Attribute.DES, proficient: false },
  { name: 'Religião', attribute: Attribute.INT, proficient: false },
  { name: 'Sobrevivência', attribute: Attribute.SAB, proficient: false },
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
  portrait: "https://res.cloudinary.com/dutufef4s/image/upload/v1770315204/artifice_lwcguq.png",
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
  portrait: "https://res.cloudinary.com/dutufef4s/image/upload/v1770315204/artifice_lwcguq.png",
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
  language: 'pt',
});
