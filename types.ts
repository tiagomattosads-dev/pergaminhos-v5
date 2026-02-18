
export enum Attribute {
  FOR = 'FOR',
  DES = 'DES',
  CON = 'CON',
  INT = 'INT',
  SAB = 'SAB',
  CAR = 'CAR'
}

export interface Skill {
  name: string;
  attribute: Attribute;
  proficient: boolean;
  expert?: boolean;
}

export interface Item {
  id: string;
  name: string;
  weight: number;
  quantity: number;
  description: string;
  equipped?: boolean;
}

export interface Weapon {
  name: string;
  bonus: string;
  damage: string;
  type: string;
  description?: string;
}

export interface OtherAttack {
  name: string;
  bonus: string;
  damage: string;
  range: string;
  description?: string;
}

export interface Spell {
  name: string;
  level: number;
  prepared: boolean;
  description: string;
}

export interface ClassMetadata {
  isSpellcaster: boolean;
  casterType: "full" | "half" | "third" | "pact" | "none";
  spellAbility: Attribute | null;
  spellsModel: "prepared" | "known" | "none";
  hitDie: string;
}

export interface CompanionAttack {
  name: string;
  type: string;
  reach: string;
  bonus: string;
  damage: string;
}

export interface Companion {
  enabled: boolean;
  name: string;
  species: string;
  stats: Record<Attribute, number>;
  ac: number;
  hp: { current: number; max: number };
  hitDice: string;
  speed: string;
  initiative: number;
  skillsProficient: string[];
  attacks: CompanionAttack[];
  personalityTrait: string;
  flaw: string;
}

export interface Character {
  id: string; 
  name: string;
  level: number;
  class: string;
  subclass?: string | null;
  classMetadata?: ClassMetadata;
  race: string;
  background: string;
  alignment: string;
  exp: number;
  inspiration: number; 
  portrait: string | null;
  hp: {
    current: number;
    max: number;
    temp: number;
  };
  deathSaves: {
    successes: number;
    failures: number;
  };
  ac: number;
  initiativeBonus: number;
  speed: string;
  stats: Record<Attribute, number>;
  proficiencies: {
    skills: string[];
    saves: Attribute[];
    languages: string[];
    tools: string[];
  };
  personality: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;
  inventory: Item[];
  weapons: Weapon[];
  otherAttacks: OtherAttack[];
  spells: Spell[];
  spellSlots: Record<number, { total: number; used: number }>;
  spellcastingAbility?: Attribute;
  spellSaveDC?: number;
  spellAttackBonus?: string;
  language?: 'pt' | 'en';
  totemAnimal?: string | null;
  fightingStyles?: string[];
  hunterChoices?: Record<number, string>;
  favoredEnemies?: string[];
  favoredTerrains?: string[];
  companion?: Companion;
}
