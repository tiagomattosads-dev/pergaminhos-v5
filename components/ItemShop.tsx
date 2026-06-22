import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Backpack, Sword, Shield, Sparkles, Info, Coins } from 'lucide-react';
import { translations } from '../translations';
import { Item, Weapon, Character } from '../types';

export interface ShopItem {
  id: string;
  name: string;
  category: 'Armas' | 'Armaduras' | 'Itens Mágicos' | 'Equipamento';
  rarity?: 'Comum' | 'Incomum' | 'Raro' | 'Muito Raro' | 'Lendário' | 'Artefato';
  price: string;
  weight: number;
  description: string;
  properties?: string[];
  // Detalhes de Armas
  weaponCategory?: 'Simples' | 'Marcial';
  weaponType?: 'Corpo a corpo' | 'À distância';
  damage?: string;
  damageType?: 'cortante' | 'perfurante' | 'contundente' | 'especial';
  range?: string;
  // Detalhes de Armaduras
  armorCategory?: 'Leve' | 'Média' | 'Pesada' | 'Escudo';
  ac?: string;
  strengthRequirement?: number;
  stealthDisadvantage?: boolean;
}

interface Props {
  character: Character;
  onClose: () => void;
  onPurchase?: (item: ShopItem) => void;
  language?: 'pt' | 'en';
  theme?: 'light' | 'dark';
}

const CoinIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="9" cy="12" r="4" />
    <circle cx="15" cy="12" r="4" />
  </svg>
);

const ItemShop: React.FC<Props> = ({ character, onClose, onPurchase, language = 'pt', theme = 'light' }) => {
  const t = translations[language];
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState<'Armas' | 'Armaduras' | 'Itens Mágicos' | 'Equipamento'>('Armas');
  const [activeRarity, setActiveRarity] = useState<ShopItem['rarity'] | null>('Incomum');
  const [error, setError] = useState<string | null>(null);
  const [activeWeaponType, setActiveWeaponType] = useState<ShopItem['weaponType'] | null>(null);
  const [activeDamageDie, setActiveDamageDie] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Reset filters when category changes
  React.useEffect(() => {
    setActiveRarity(activeCategory === 'Itens Mágicos' ? 'Incomum' : null);
    setActiveWeaponType(null);
    setActiveDamageDie(null);
  }, [activeCategory]);

  const getTotalGold = () => {
    const { pp, gp, sp, cp } = character.currency;
    return (pp * 10) + gp + (sp / 10) + (cp / 100);
  };

  const parsePrice = (priceStr: string): number => {
    if (priceStr === 'Inestimável') return Infinity;
    const match = priceStr.match(/(\d+)\s*(po|pp|pc|pl)/i);
    if (!match) return 0;
    const val = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    switch (unit) {
      case 'pl': return val * 10;
      case 'po': return val;
      case 'pp': return val / 10; // Prata
      case 'pc': return val / 100; // Cobre
      default: return val;
    }
  };

  const handlePurchase = (item: ShopItem) => {
    const price = parsePrice(item.price);
    const totalGold = getTotalGold();

    if (totalGold < price) {
      setError(language === 'pt' ? 'Recursos insuficientes para esta compra!' : 'Insufficient resources for this purchase!');
      setTimeout(() => setError(null), 3000);
      return;
    }

    onPurchase?.(item);
  };

  const shopItems: ShopItem[] = [
    // Armas Simples - Corpo a Corpo
    { id: 'w_clava', name: 'Clava', category: 'Armas', price: '1 pp', weight: 1, description: 'Uma clava de madeira simples.', properties: ['Leve'], weaponCategory: 'Simples', weaponType: 'Corpo a corpo', damage: '1d4', damageType: 'contundente' },
    { id: 'w_adaga', name: 'Adaga', category: 'Armas', price: '2 po', weight: 0.5, description: 'Uma pequena lâmina afiada.', properties: ['Acuidade', 'Leve', 'Arremesso (6/18)'], weaponCategory: 'Simples', weaponType: 'Corpo a corpo', damage: '1d4', damageType: 'perfurante', range: '6/18' },
    { id: 'w_grande_clava', name: 'Grande clava', category: 'Armas', price: '2 pp', weight: 5, description: 'Uma clava grande e pesada.', properties: ['Duas Mãos'], weaponCategory: 'Simples', weaponType: 'Corpo a corpo', damage: '1d8', damageType: 'contundente' },
    { id: 'w_machadinha', name: 'Machadinha', category: 'Armas', price: '5 po', weight: 1, description: 'Um pequeno machado para arremesso ou combate.', properties: ['Leve', 'Arremesso (6/18)'], weaponCategory: 'Simples', weaponType: 'Corpo a corpo', damage: '1d6', damageType: 'cortante', range: '6/18' },
    { id: 'w_azagaia', name: 'Azagaia', category: 'Armas', price: '5 pp', weight: 1, description: 'Uma lança leve projetada para ser arremessada.', properties: ['Arremesso (9/36)'], weaponCategory: 'Simples', weaponType: 'Corpo a corpo', damage: '1d6', damageType: 'perfurante', range: '9/36' },
    { id: 'w_martelo_leve', name: 'Martelo leve', category: 'Armas', price: '2 po', weight: 1, description: 'Um martelo pequeno e versátil.', properties: ['Leve', 'Arremesso (6/18)'], weaponCategory: 'Simples', weaponType: 'Corpo a corpo', damage: '1d4', damageType: 'contundente', range: '6/18' },
    { id: 'w_maca', name: 'Maça', category: 'Armas', price: '5 po', weight: 2, description: 'Uma arma de impacto sólida.', properties: [], weaponCategory: 'Simples', weaponType: 'Corpo a corpo', damage: '1d6', damageType: 'contundente' },
    { id: 'w_bordao', name: 'Bordão', category: 'Armas', price: '2 pp', weight: 2, description: 'Um cajado de madeira resistente.', properties: ['Versátil (1d8)'], weaponCategory: 'Simples', weaponType: 'Corpo a corpo', damage: '1d6', damageType: 'contundente' },
    { id: 'w_foice_curta', name: 'Foice curta', category: 'Armas', price: '1 po', weight: 1, description: 'Uma pequena lâmina curva.', properties: ['Leve'], weaponCategory: 'Simples', weaponType: 'Corpo a corpo', damage: '1d4', damageType: 'cortante' },
    
    // Armas Simples - À Distância
    { id: 'w_besta_leve', name: 'Besta leve', category: 'Armas', price: '25 po', weight: 2.5, description: 'Uma besta mecânica simples.', properties: ['Munição (24/96)', 'Recarga', 'Duas Mãos'], weaponCategory: 'Simples', weaponType: 'À distância', damage: '1d8', damageType: 'perfurante', range: '24/96' },
    { id: 'w_dardo', name: 'Dardo', category: 'Armas', price: '5 pc', weight: 0.25, description: 'Um pequeno projétil pontiagudo.', properties: ['Acuidade', 'Arremesso (6/18)'], weaponCategory: 'Simples', weaponType: 'À distância', damage: '1d4', damageType: 'perfurante', range: '6/18' },
    { id: 'w_arco_curto', name: 'Arco curto', category: 'Armas', price: '25 po', weight: 1, description: 'Um arco compacto e ágil.', properties: ['Munição (24/96)', 'Duas Mãos'], weaponCategory: 'Simples', weaponType: 'À distância', damage: '1d6', damageType: 'perfurante', range: '24/96' },
    { id: 'w_funda', name: 'Funda', category: 'Armas', price: '1 pp', weight: 0, description: 'Uma tira de couro para lançar pedras.', properties: ['Munição (9/36)'], weaponCategory: 'Simples', weaponType: 'À distância', damage: '1d4', damageType: 'contundente', range: '9/36' },

    // Armas Marciais - Corpo a Corpo
    { id: 'w_machado_batalha', name: 'Machado de batalha', category: 'Armas', price: '10 po', weight: 2, description: 'Um machado versátil de combate.', properties: ['Versátil (1d10)'], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '1d8', damageType: 'cortante' },
    { id: 'w_mangual', name: 'Mangual', category: 'Armas', price: '10 po', weight: 2, description: 'Uma esfera de metal cravada presa a uma corrente.', properties: [], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '1d8', damageType: 'contundente' },
    { id: 'w_glaive', name: 'Glaive', category: 'Armas', price: '20 po', weight: 3, description: 'Uma lâmina longa presa a uma haste.', properties: ['Pesada', 'Alcance', 'Duas Mãos'], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '1d10', damageType: 'cortante' },
    { id: 'w_espadao', name: 'Espadão', category: 'Armas', price: '50 po', weight: 3, description: 'Uma espada massiva que requer as duas mãos.', properties: ['Pesada', 'Duas Mãos'], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '2d6', damageType: 'cortante' },
    { id: 'w_alabarda', name: 'Alabarda', category: 'Armas', price: '20 po', weight: 3, description: 'Uma haste com lâmina de machado e ponta de lança.', properties: ['Pesada', 'Alcance', 'Duas Mãos'], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '1d10', damageType: 'cortante' },
    { id: 'w_lanca_longa', name: 'Lança longa', category: 'Armas', price: '10 po', weight: 9, description: 'Uma lança extremamente longa para combate montado ou alcance.', properties: ['Alcance', 'Pesada', 'Duas Mãos'], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '1d12', damageType: 'perfurante' },
    { id: 'w_espada_longa', name: 'Espada longa', category: 'Armas', price: '15 po', weight: 1.5, description: 'Uma espada versátil de gume duplo.', properties: ['Versátil (1d10)'], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '1d8', damageType: 'cortante' },
    { id: 'w_maul', name: 'Maul (martelo grande)', category: 'Armas', price: '10 po', weight: 5, description: 'Um martelo de guerra massivo.', properties: ['Pesada', 'Duas Mãos'], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '2d6', damageType: 'contundente' },
    { id: 'w_mangual_guerra', name: 'Mangual de guerra', category: 'Armas', price: '15 po', weight: 2, description: 'Uma versão reforçada do mangual.', properties: [], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '1d8', damageType: 'contundente' },
    { id: 'w_picareta_guerra', name: 'Picareta de guerra', category: 'Armas', price: '5 po', weight: 1, description: 'Uma picareta projetada para perfurar armaduras.', properties: [], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '1d8', damageType: 'perfurante' },
    { id: 'w_rapier', name: 'Rapier (Florete)', category: 'Armas', price: '25 po', weight: 1, description: 'Uma espada fina e elegante para estocadas precisas.', properties: ['Acuidade'], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '1d8', damageType: 'perfurante' },
    { id: 'w_cimitarra', name: 'Cimitarra', category: 'Armas', price: '25 po', weight: 1.5, description: 'Uma lâmina curva e veloz.', properties: ['Acuidade', 'Leve'], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '1d6', damageType: 'cortante' },
    { id: 'w_espada_curta', name: 'Espada curta', category: 'Armas', price: '10 po', weight: 1, description: 'Uma espada ágil para combate próximo.', properties: ['Acuidade', 'Leve'], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '1d6', damageType: 'perfurante' },
    { id: 'w_tridente', name: 'Tridente', category: 'Armas', price: '5 po', weight: 2, description: 'Uma lança de três pontas.', properties: ['Arremesso (6/18)', 'Versátil (1d8)'], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '1d6', damageType: 'perfurante', range: '6/18' },
    { id: 'w_picareta_pesada', name: 'Picareta pesada', category: 'Armas', price: '5 po', weight: 9, description: 'Uma picareta pesada que requer força.', properties: ['Pesada', 'Duas Mãos'], weaponCategory: 'Marcial', weaponType: 'Corpo a corpo', damage: '1d8', damageType: 'perfurante' },

    // Armas Marciais - À Distância
    { id: 'w_besta_mao', name: 'Besta de mão', category: 'Armas', price: '75 po', weight: 1.5, description: 'Uma besta pequena que pode ser usada com uma mão.', properties: ['Munição (9/36)', 'Leve', 'Recarga'], weaponCategory: 'Marcial', weaponType: 'À distância', damage: '1d6', damageType: 'perfurante', range: '9/36' },
    { id: 'w_besta_pesada', name: 'Besta pesada', category: 'Armas', price: '50 po', weight: 9, description: 'Uma besta poderosa e lenta.', properties: ['Munição (30/120)', 'Pesada', 'Recarga', 'Duas Mãos'], weaponCategory: 'Marcial', weaponType: 'À distância', damage: '1d10', damageType: 'perfurante', range: '30/120' },
    { id: 'w_arco_longo', name: 'Arco longo', category: 'Armas', price: '50 po', weight: 1, description: 'Um arco grande com grande alcance e poder.', properties: ['Munição (45/180)', 'Pesada', 'Duas Mãos'], weaponCategory: 'Marcial', weaponType: 'À distância', damage: '1d8', damageType: 'perfurante', range: '45/180' },
    { id: 'w_rede', name: 'Rede', category: 'Armas', price: '1 po', weight: 1.5, description: 'Uma rede para imobilizar inimigos.', properties: ['Especial', 'Arremesso (1.5/4.5)'], weaponCategory: 'Marcial', weaponType: 'À distância', damage: '-', damageType: 'especial', range: '1.5/4.5' },
    
    // Armaduras - Leves
    { id: 'a_acolchoada', name: 'Acolchoada', category: 'Armaduras', price: '5 po', weight: 4, description: 'Feita de camadas de tecido acolchoado e reforçado.', properties: ['CA 11 + Modificador de DES', 'Desvantagem em Furtividade'], armorCategory: 'Leve', ac: '11 + Mod. DES', stealthDisadvantage: true },
    { id: 'a_couro', name: 'Couro', category: 'Armaduras', price: '10 po', weight: 5, description: 'Feita de couro endurecido e flexível.', properties: ['CA 11 + Modificador de DES'], armorCategory: 'Leve', ac: '11 + Mod. DES' },
    { id: 'a_couro_batido', name: 'Couro Batido', category: 'Armaduras', price: '45 po', weight: 6.5, description: 'Couro reforçado com rebites ou tachas de metal.', properties: ['CA 12 + Modificador de DES'], armorCategory: 'Leve', ac: '12 + Mod. DES' },

    // Armaduras - Médias
    { id: 'a_peles', name: 'Peles', category: 'Armaduras', price: '10 po', weight: 6, description: 'Peles de animais rústicas e pesadas.', properties: ['CA 12 + Modificador de DES (max 2)'], armorCategory: 'Média', ac: '12 + Mod. DES (max 2)' },
    { id: 'a_camisao_malha', name: 'Camisão de Malha', category: 'Armaduras', price: '50 po', weight: 10, description: 'Uma túnica de anéis de metal entrelaçados.', properties: ['CA 13 + Modificador de DES (max 2)'], armorCategory: 'Média', ac: '13 + Mod. DES (max 2)' },
    { id: 'a_cota_escamas', name: 'Cota de Escamas', category: 'Armaduras', price: '50 po', weight: 22.5, description: 'Escamas de metal sobrepostas presas a couro.', properties: ['CA 14 + Modificador de DES (max 2)', 'Desvantagem em Furtividade'], armorCategory: 'Média', ac: '14 + Mod. DES (max 2)', stealthDisadvantage: true },
    { id: 'a_peitoral', name: 'Peitoral', category: 'Armaduras', price: '400 po', weight: 10, description: 'Uma placa de metal que protege o tronco.', properties: ['CA 14 + Modificador de DES (max 2)'], armorCategory: 'Média', ac: '14 + Mod. DES (max 2)' },
    { id: 'a_meia_armadura', name: 'Meia-Armadura', category: 'Armaduras', price: '750 po', weight: 20, description: 'Placas de metal cobrindo a maior parte do corpo.', properties: ['CA 15 + Modificador de DES (max 2)', 'Desvantagem em Furtividade'], armorCategory: 'Média', ac: '15 + Mod. DES (max 2)', stealthDisadvantage: true },

    // Armaduras - Pesadas
    { id: 'a_cota_aneis', name: 'Cota de Anéis', category: 'Armaduras', price: '30 po', weight: 20, description: 'Anéis de metal costurados sobre couro pesado.', properties: ['CA 14', 'Desvantagem em Furtividade'], armorCategory: 'Pesada', ac: '14', stealthDisadvantage: true },
    { id: 'a_cota_malha', name: 'Cota de Malha', category: 'Armaduras', price: '75 po', weight: 27.5, description: 'Feita de anéis de metal entrelaçados.', properties: ['CA 16', 'Força 13', 'Desvantagem em Furtividade'], armorCategory: 'Pesada', ac: '16', strengthRequirement: 13, stealthDisadvantage: true },
    { id: 'a_cota_talas', name: 'Cota de Talas', category: 'Armaduras', price: '200 po', weight: 30, description: 'Tiras de metal rebitadas sobre couro.', properties: ['CA 17', 'Força 15', 'Desvantagem em Furtividade'], armorCategory: 'Pesada', ac: '17', strengthRequirement: 15, stealthDisadvantage: true },
    { id: 'a_placas', name: 'Placas (Full Plate)', category: 'Armaduras', price: '1500 po', weight: 32.5, description: 'A proteção máxima para um guerreiro.', properties: ['CA 18', 'Força 15', 'Desvantagem em Furtividade'], armorCategory: 'Pesada', ac: '18', strengthRequirement: 15, stealthDisadvantage: true },

    // Escudo
    { id: 'a_escudo', name: 'Escudo', category: 'Armaduras', price: '10 po', weight: 3, description: 'Um escudo de madeira ou metal.', properties: ['CA +2'], armorCategory: 'Escudo', ac: '+2' },

    // Equipamento de Aventura
    { id: 'e_abaco', name: 'Ábaco', category: 'Equipamento', price: '2 po', weight: 1, description: 'Uma ferramenta para cálculos rápidos.' },
    { id: 'e_acido', name: 'Ácido (frasco)', category: 'Equipamento', price: '25 po', weight: 0.5, description: 'Um frasco de ácido corrosivo.' },
    { id: 'e_fogo_alquimico', name: 'Fogo Alquímico', category: 'Equipamento', price: '50 po', weight: 0.5, description: 'Um líquido que entra em combustão ao contato com o ar.' },
    { id: 'e_antitoxina', name: 'Antitoxina', category: 'Equipamento', price: '50 po', weight: 0, description: 'Um antídoto para venenos comuns.' },
    { id: 'e_mochila', name: 'Mochila', category: 'Equipamento', price: '2 po', weight: 2.5, description: 'Uma mochila de couro resistente.' },
    { id: 'e_saco_dormir', name: 'Saco de Dormir', category: 'Equipamento', price: '1 po', weight: 3.5, description: 'Um saco de dormir acolchoado.' },
    { id: 'e_cobertor', name: 'Cobertor', category: 'Equipamento', price: '5 pp', weight: 1.5, description: 'Um cobertor de lã quente.' },
    { id: 'e_livro', name: 'Livro', category: 'Equipamento', price: '25 po', weight: 2.5, description: 'Um livro com páginas em branco ou texto.' },
    { id: 'e_abrolhos', name: 'Abrolhos (bolsa de 20)', category: 'Equipamento', price: '1 po', weight: 1, description: 'Pequenos espinhos de metal para atrasar perseguidores.' },
    { id: 'e_vela', name: 'Vela', category: 'Equipamento', price: '1 pc', weight: 0, description: 'Uma vela de cera que dura 1 hora.' },
    { id: 'e_corrente', name: 'Corrente (3 metros)', category: 'Equipamento', price: '5 po', weight: 5, description: 'Uma corrente de ferro resistente.' },
    { id: 'e_giz', name: 'Giz (1 pedaço)', category: 'Equipamento', price: '1 pc', weight: 0, description: 'Um pedaço de giz para marcações.' },
    { id: 'e_bau', name: 'Baú', category: 'Equipamento', price: '5 po', weight: 12.5, description: 'Um baú de madeira reforçado com ferro.' },
    { id: 'e_kit_escalada', name: 'Kit de Escalada', category: 'Equipamento', price: '25 po', weight: 6, description: 'Inclui pítons, luvas, botas e cordas.' },
    { id: 'e_roupas_comuns', name: 'Roupas Comuns', category: 'Equipamento', price: '5 pp', weight: 1.5, description: 'Roupas simples para o dia a dia.' },
    { id: 'e_roupas_finas', name: 'Roupas Finas', category: 'Equipamento', price: '15 po', weight: 3, description: 'Roupas elegantes para ocasiões especiais.' },
    { id: 'e_bolsa_componentes', name: 'Bolsa de Componentes', category: 'Equipamento', price: '25 po', weight: 1, description: 'Contém os componentes materiais para magias.' },
    { id: 'e_pe_de_cabra', name: 'Pé de Cabra', category: 'Equipamento', price: '2 po', weight: 2.5, description: 'Uma ferramenta para forçar portas e baús.' },
    { id: 'e_agua_benta', name: 'Água Benta (frasco)', category: 'Equipamento', price: '25 po', weight: 0.5, description: 'Água abençoada por um clérigo.' },
    { id: 'e_ampulheta', name: 'Ampulheta', category: 'Equipamento', price: '25 po', weight: 0.5, description: 'Um dispositivo para medir o tempo.' },
    { id: 'e_armadilha_caca', name: 'Armadilha de Caça', category: 'Equipamento', price: '5 po', weight: 12.5, description: 'Uma armadilha de metal para animais.' },
    { id: 'e_tinta', name: 'Tinta (frasco)', category: 'Equipamento', price: '10 po', weight: 0, description: 'Um frasco de tinta preta.' },
    { id: 'e_lanterna_foco', name: 'Lanterna de Foco', category: 'Equipamento', price: '10 po', weight: 1, description: 'Uma lanterna que projeta um feixe de luz.' },
    { id: 'e_cadeado', name: 'Cadeado', category: 'Equipamento', price: '10 po', weight: 0.5, description: 'Um cadeado de ferro com chave.' },
    { id: 'e_lupa', name: 'Lupa', category: 'Equipamento', price: '100 po', weight: 0, description: 'Uma lente para examinar pequenos detalhes.' },
    { id: 'e_algemas', name: 'Algemas', category: 'Equipamento', price: '2 po', weight: 3, description: 'Grilhões de metal para prender criaturas.' },
    { id: 'e_espelho_aco', name: 'Espelho de Aço', category: 'Equipamento', price: '5 po', weight: 0.25, description: 'Um pequeno espelho de metal polido.' },
    { id: 'e_oleo', name: 'Óleo (frasco)', category: 'Equipamento', price: '1 pp', weight: 0.5, description: 'Óleo para lanternas ou combustão.' },
    { id: 'e_papel', name: 'Papel (folha)', category: 'Equipamento', price: '2 pp', weight: 0, description: 'Uma folha de papel de alta qualidade.' },
    { id: 'e_pergaminho', name: 'Pergaminho (folha)', category: 'Equipamento', price: '1 pp', weight: 0, description: 'Uma folha de pergaminho resistente.' },
    { id: 'e_picareta_minerador', name: 'Picareta de Minerador', category: 'Equipamento', price: '2 po', weight: 5, description: 'Uma ferramenta para escavação.' },
    { id: 'e_piton', name: 'Píton', category: 'Equipamento', price: '5 pc', weight: 0.25, description: 'Um pino de metal para escalada.' },
    { id: 'e_veneno_basico', name: 'Veneno Básico', category: 'Equipamento', price: '100 po', weight: 0, description: 'Um veneno simples para armas.' },
    { id: 'e_vara', name: 'Vara (3 metros)', category: 'Equipamento', price: '5 pc', weight: 3.5, description: 'Uma vara longa de madeira.' },
    { id: 'e_pote_ferro', name: 'Pote de Ferro', category: 'Equipamento', price: '2 po', weight: 5, description: 'Um pote resistente para cozinhar.' },
    { id: 'e_pocao_cura', name: 'Poção de Cura', category: 'Equipamento', price: '50 po', weight: 0.5, description: 'Uma poção mágica que restaura pontos de vida.' },
    { id: 'e_algibeira', name: 'Algibeira', category: 'Equipamento', price: '5 pp', weight: 0.5, description: 'Uma pequena bolsa de couro.' },
    { id: 'e_aljava', name: 'Aljava', category: 'Equipamento', price: '1 po', weight: 0.5, description: 'Um estojo para flechas ou virotes.' },
    { id: 'e_ariete_portatil', name: 'Aríete Portátil', category: 'Equipamento', price: '4 po', weight: 17.5, description: 'Uma ferramenta para derrubar portas.' },
    { id: 'e_racoes', name: 'Rações (1 dia)', category: 'Equipamento', price: '5 pp', weight: 1, description: 'Comida seca e durável para viagens.' },
    { id: 'e_corda_canhamo', name: 'Corda de Cânhamo (15m)', category: 'Equipamento', price: '1 po', weight: 5, description: 'Uma corda resistente de fibra natural.' },
    { id: 'e_corda_seda', name: 'Corda de Seda (15m)', category: 'Equipamento', price: '10 po', weight: 2.5, description: 'Uma corda leve e muito forte.' },
    { id: 'e_saco', name: 'Saco', category: 'Equipamento', price: '1 pc', weight: 0.25, description: 'Um saco de pano simples.' },
    { id: 'e_balanca_mercador', name: 'Balança de Mercador', category: 'Equipamento', price: '5 po', weight: 1.5, description: 'Uma balança de precisão.' },
    { id: 'e_pa', name: 'Pá', category: 'Equipamento', price: '2 po', weight: 2.5, description: 'Uma ferramenta para cavar.' },
    { id: 'e_apito', name: 'Apito de Sinalização', category: 'Equipamento', price: '5 pc', weight: 0, description: 'Um apito para comunicação à distância.' },
    { id: 'e_anel_sinete', name: 'Anel de Sinete', category: 'Equipamento', price: '5 po', weight: 0, description: 'Um anel usado para lacrar documentos.' },
    { id: 'e_sabao', name: 'Sabão', category: 'Equipamento', price: '2 pc', weight: 0, description: 'Uma barra de sabão simples.' },
    { id: 'e_grimorio', name: 'Grimório', category: 'Equipamento', price: '50 po', weight: 1.5, description: 'Um livro para registrar magias.' },
    { id: 'e_tenda', name: 'Tenda (2 pessoas)', category: 'Equipamento', price: '2 po', weight: 10, description: 'Uma tenda de lona para acampamento.' },
    { id: 'e_isqueiro', name: 'Isqueiro (Tinderbox)', category: 'Equipamento', price: '5 pp', weight: 0.5, description: 'Ferramentas para iniciar uma fogueira.' },
    { id: 'e_tocha', name: 'Tocha', category: 'Equipamento', price: '1 pc', weight: 0.5, description: 'Uma tocha que dura 1 hora.' },
    { id: 'e_cantil', name: 'Cantil', category: 'Equipamento', price: '2 pp', weight: 2.5, description: 'Um recipiente para água.' },
    { id: 'e_pedra_amolar', name: 'Pedra de Amolar', category: 'Equipamento', price: '1 pc', weight: 0.5, description: 'Uma pedra para afiar lâminas.' },

    // Pacotes de Equipamento
    { id: 'p_assaltante', name: 'Pacote de Assaltante', category: 'Equipamento', price: '16 po', weight: 20, description: 'Inclui mochila, 1000 esferas de metal, 15m de corda, sino, velas, pé de cabra, martelo, pítons, lanterna, óleo, rações e isqueiro.' },
    { id: 'p_diplomata', name: 'Pacote de Diplomata', category: 'Equipamento', price: '39 po', weight: 15, description: 'Inclui baú, estojos de mapas, roupas finas, tinta, caneta, lâmpada, óleo, papel, perfume, cera e sabão.' },
    { id: 'p_explorador_masmorras', name: 'Pacote de Explorador de Masmorras', category: 'Equipamento', price: '12 po', weight: 25, description: 'Inclui mochila, pé de cabra, martelo, pítons, tochas, isqueiro, rações, cantil e 15m de corda.' },
    { id: 'p_artista', name: 'Pacote de Artista', category: 'Equipamento', price: '40 po', weight: 18, description: 'Inclui mochila, saco de dormir, roupas de fantasia, velas, rações, cantil e kit de disfarce.' },
    { id: 'p_explorador', name: 'Pacote de Explorador', category: 'Equipamento', price: '10 po', weight: 25, description: 'Inclui mochila, saco de dormir, kit de refeição, isqueiro, tochas, rações, cantil e 15m de corda.' },
    { id: 'p_sacerdote', name: 'Pacote de Sacerdote', category: 'Equipamento', price: '19 po', weight: 12, description: 'Inclui mochila, cobertor, velas, isqueiro, caixa de esmolas, incenso, censor, roupas, rações e cantil.' },
    { id: 'p_estudioso', name: 'Pacote de Estudioso', category: 'Equipamento', price: '40 po', weight: 5, description: 'Inclui mochila, livro, tinta, caneta, papel e uma pequena faca.' },

    // Munição
    { id: 'e_flechas', name: 'Flechas (20)', category: 'Equipamento', price: '1 po', weight: 0.5, description: 'Vinte flechas de madeira com ponta de metal.' },
    { id: 'e_virotes', name: 'Virotes de Besta (20)', category: 'Equipamento', price: '1 po', weight: 0.75, description: 'Vinte virotes curtos para bestas.' },
    { id: 'e_balas_funda', name: 'Balas de Funda (20)', category: 'Equipamento', price: '4 pc', weight: 0.75, description: 'Vinte pedras polidas para fundas.' },
    { id: 'e_agulhas_zarabatana', name: 'Agulhas de Zarabatana (50)', category: 'Equipamento', price: '1 po', weight: 0.5, description: 'Cinquenta agulhas finas para zarabatanas.' },

    // Ferramentas
    { id: 't_alquimista', name: 'Suprimentos de Alquimista', category: 'Equipamento', price: '50 po', weight: 4, description: 'Equipamento para criar poções e compostos.' },
    { id: 't_ferreiro', name: 'Ferramentas de Ferreiro', category: 'Equipamento', price: '20 po', weight: 4, description: 'Martelos, tenazes e ferramentas de forja.' },
    { id: 't_ladrao', name: 'Ferramentas de Ladrão', category: 'Equipamento', price: '25 po', weight: 0.5, description: 'Ganzuas, limas e espelhos para abrir fechaduras.' },
    { id: 't_herbalismo', name: 'Kit de Herbalismo', category: 'Equipamento', price: '5 po', weight: 1.5, description: 'Ferramentas para coletar e preparar ervas.' },
    { id: 't_disfarce', name: 'Kit de Disfarce', category: 'Equipamento', price: '25 po', weight: 1.5, description: 'Maquiagem, perucas e adereços para mudar a aparência.' },
    { id: 't_falsificacao', name: 'Kit de Falsificação', category: 'Equipamento', price: '15 po', weight: 2.5, description: 'Tintas e papéis para criar documentos falsos.' },
    { id: 't_navegador', name: 'Ferramentas de Navegador', category: 'Equipamento', price: '25 po', weight: 1, description: 'Instrumentos para navegação marítima ou terrestre.' },
    { id: 't_veneno', name: 'Kit de Envenenador', category: 'Equipamento', price: '50 po', weight: 1, description: 'Equipamento para criar e aplicar venenos.' },

    // Itens Mágicos - Incomum
    { id: 'm1', name: 'Botas de Caminhar e Saltar', category: 'Itens Mágicos', rarity: 'Incomum', price: '500 po', weight: 0.5, description: 'Enquanto estiver usando estas botas, seu deslocamento de caminhada aumenta em 3 metros.' },
    { id: 'm_bolsa_sem_fundo', name: 'Bolsa Sem Fundo', category: 'Itens Mágicos', rarity: 'Incomum', price: '500 po', weight: 7.5, description: 'Esta bolsa tem um espaço interior consideravelmente maior que suas dimensões externas.' },
    { id: 'm_oculos_noite', name: 'Óculos da Noite', category: 'Itens Mágicos', rarity: 'Incomum', price: '500 po', weight: 0, description: 'Enquanto estiver usando estes óculos, você tem visão no escuro em um raio de 18 metros.' },
    { id: 'm_bastao_imovel', name: 'Bastão Imóvel', category: 'Itens Mágicos', rarity: 'Incomum', price: '500 po', weight: 1, description: 'Este bastão de metal pode ser fixado no ar ao apertar um botão.' },
    { id: 'm_pedra_sorte', name: 'Pedra da Sorte', category: 'Itens Mágicos', rarity: 'Incomum', price: '500 po', weight: 0, description: 'Enquanto esta pedra estiver com você, você ganha +1 de bônus em testes de habilidade e salvaguardas.' },
    { id: 'm_perola_poder', name: 'Pérola do Poder', category: 'Itens Mágicos', rarity: 'Incomum', price: '500 po', weight: 0, description: 'Você pode usar uma ação para recuperar um espaço de magia gasto de até 3º nível.' },
    { id: 'm_varinha_misseis', name: 'Varinha de Mísseis Mágicos', category: 'Itens Mágicos', rarity: 'Incomum', price: '500 po', weight: 0.5, description: 'Esta varinha tem 7 cargas e pode ser usada para conjurar a magia Mísseis Mágicos.' },
    { id: 'm2', name: 'Manto de Proteção', category: 'Itens Mágicos', rarity: 'Incomum', price: '500 po', weight: 0.5, description: 'Você ganha +1 de bônus na CA e em salvaguardas enquanto usar este manto.' },
    
    // Itens Mágicos - Raro
    { id: 'm3', name: 'Anel de Proteção', category: 'Itens Mágicos', rarity: 'Raro', price: '5000 po', weight: 0, description: 'Você ganha +1 de bônus na CA e em salvaguardas enquanto usar este anel.' },
    { id: 'm4', name: 'Arma +2', category: 'Itens Mágicos', rarity: 'Raro', price: '4000 po', weight: 1, description: 'Você recebe um bônus de +2 nas jogadas de ataque e dano feitas com esta arma mágica.' },

    // Itens Mágicos - Muito Raro
    { id: 'm5', name: 'Cajado do Poder', category: 'Itens Mágicos', rarity: 'Muito Raro', price: '20000 po', weight: 2, description: 'Um cajado poderoso que concede bônus em ataques mágicos, CA e salvaguardas.' },
    
    // Itens Mágicos - Lendário
    { id: 'm6', name: 'Vingadora Sagrada', category: 'Itens Mágicos', rarity: 'Lendário', price: '50000 po', weight: 3, description: 'Uma espada lendária que brilha com luz divina.' },

    // Itens Mágicos - Artefato
    { id: 'm7', name: 'O Olho de Vecna', category: 'Itens Mágicos', rarity: 'Artefato', price: 'Inestimável', weight: 0, description: 'Um artefato maligno de poder inimaginável.' },
  ];

  const rarities: ShopItem['rarity'][] = ['Incomum', 'Raro', 'Muito Raro', 'Lendário', 'Artefato'];
  const damageDice = ['1d4', '1d6', '1d8', '1d10', '1d12', '2d6'];

  const filteredItems = shopItems.filter(item => {
    const matchesCategory = item.category === activeCategory;
    
    let matchesFilters = true;
    if (activeCategory === 'Itens Mágicos') {
      matchesFilters = activeRarity ? item.rarity === activeRarity : true;
    } else if (activeCategory === 'Armas') {
      const matchesType = activeWeaponType ? item.weaponType === activeWeaponType : true;
      const matchesDie = activeDamageDie ? item.damage === activeDamageDie : true;
      matchesFilters = matchesType && matchesDie;
    }

    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesFilters && matchesSearch;
  });

  const getRarityColor = (rarity?: ShopItem['rarity']) => {
    switch (rarity) {
      case 'Incomum': return isDark ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5' : 'text-emerald-700 border-emerald-500/30 bg-emerald-50';
      case 'Raro': return isDark ? 'text-blue-400 border-blue-500/30 bg-blue-500/5' : 'text-blue-700 border-blue-500/30 bg-blue-50';
      case 'Muito Raro': return isDark ? 'text-purple-400 border-purple-500/30 bg-purple-500/5' : 'text-purple-700 border-purple-500/30 bg-purple-50';
      case 'Lendário': return isDark ? 'text-amber-400 border-amber-500/30 bg-amber-500/5' : 'text-amber-700 border-amber-500/30 bg-amber-50';
      case 'Artefato': return isDark ? 'text-red-400 border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'text-red-700 border-red-500/50 bg-red-50 shadow-[0_0_10px_rgba(239,68,68,0.1)]';
      default: return isDark ? 'text-stone-400 border-stone-500/20 bg-stone-500/5' : 'text-stone-600 border-stone-500/20 bg-stone-100';
    }
  };

  const getRarityGlow = (rarity?: ShopItem['rarity']) => {
    if (!isDark) return 'shadow-sm';
    switch (rarity) {
      case 'Raro': return 'shadow-[0_0_15px_rgba(59,130,246,0.1)]';
      case 'Muito Raro': return 'shadow-[0_0_20px_rgba(168,85,247,0.15)]';
      case 'Lendário': return 'shadow-[0_0_25px_rgba(245,158,11,0.2)]';
      case 'Artefato': return 'shadow-[0_0_30px_rgba(239,68,68,0.3)]';
      default: return 'shadow-md';
    }
  };

  const getCurrencyStyles = (priceStr: string) => {
    const match = priceStr.match(/(po|pp|pc|pl)/i);
    const unit = match ? match[1].toLowerCase() : 'po';
    
    if (isDark) {
      switch (unit) {
        case 'po': return 'bg-amber-600 text-white hover:bg-amber-500 active:translate-y-1 active:border-b-0';
        case 'pp': return 'bg-stone-500 text-white hover:bg-stone-400 active:translate-y-1 active:border-b-0';
        case 'pc': return 'bg-orange-800 text-white hover:bg-orange-700 active:translate-y-1 active:border-b-0';
        case 'pl': return 'bg-slate-400 text-white hover:bg-slate-300 active:translate-y-1 active:border-b-0';
        default: return 'bg-amber-600 text-white hover:bg-amber-500 active:translate-y-1 active:border-b-0';
      }
    } else {
      switch (unit) {
        case 'po': return 'bg-[#b8860b] text-white hover:bg-[#daa520] active:translate-y-1 active:border-b-0';
        case 'pp': return 'bg-stone-400 text-white hover:bg-stone-500 active:translate-y-1 active:border-b-0';
        case 'pc': return 'bg-[#a0522d] text-white hover:bg-[#cd853f] active:translate-y-1 active:border-b-0';
        case 'pl': return 'bg-slate-300 text-stone-800 hover:bg-slate-400 active:translate-y-1 active:border-b-0';
        default: return 'bg-[#8b4513] text-white hover:bg-[#a0522d] active:translate-y-1 active:border-b-0';
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 md:p-8"
    >
      <div className={`relative w-full max-w-7xl h-full max-h-[95vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${isDark ? 'bg-stone-950 border-stone-800' : 'bg-[#fdf5e6] border-[#8b4513]/30'}`}>
        {/* Header */}
        <header className={`relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 border-b gap-6 ${isDark ? 'border-stone-800 bg-stone-900/60' : 'border-[#8b4513]/20 bg-[#2d1b0d] text-[#e8d5b5]'}`}>
          <div className="flex items-center gap-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg ${isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-[#8b4513]/20 border-[#8b4513]/30'}`}>
              <Backpack className={`w-7 h-7 ${isDark ? 'text-amber-400' : 'text-[#e8d5b5]'}`} />
            </div>
            <div className="text-center lg:text-left">
              <h2 className={`text-4xl font-bold tracking-tight cinzel ${isDark ? 'text-white' : 'text-[#e8d5b5]'}`}>Mercado de Itens</h2>
              <p className={`text-xs uppercase tracking-[0.2em] mt-1 font-medium ${isDark ? 'text-stone-400' : 'text-[#e8d5b5]/70'}`}>Equipe seu personagem com o melhor arsenal</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className={`flex items-center gap-4 px-6 py-3 rounded-2xl border shadow-inner ${isDark ? 'bg-stone-900/80 border-stone-800' : 'bg-[#fdf5e6]/10 border-[#e8d5b5]/20'}`}>
              <div className={`flex items-center gap-2 border-r pr-4 ${isDark ? 'border-stone-800' : 'border-[#e8d5b5]/20'}`}>
                <span className={`text-2xl font-bold tracking-tighter ${isDark ? 'text-amber-400' : 'text-amber-400'}`}>{character.currency.gp}</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-stone-500' : 'text-[#e8d5b5]/60'}`}>PO</span>
                <CoinIcon className="w-5 h-5 text-amber-500/60" />
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold tracking-tighter ${isDark ? 'text-stone-400' : 'text-stone-300'}`}>{character.currency.sp}</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-stone-500' : 'text-[#e8d5b5]/60'}`}>PP</span>
                <CoinIcon className="w-5 h-5 text-stone-500" />
              </div>
            </div>
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-stone-500' : 'text-[#e8d5b5]/50'}`} />
              <input 
                type="text"
                placeholder="Buscar no catálogo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none transition-all w-full md:w-80 shadow-inner border ${isDark ? 'bg-stone-900/40 border-stone-800 text-white focus:border-amber-500/50 placeholder-stone-600' : 'bg-[#fdf5e6]/10 border-[#e8d5b5]/20 text-white focus:border-[#e8d5b5]/50 placeholder-[#e8d5b5]/40'}`}
              />
            </div>
            <button 
              onClick={onClose}
              className={`p-3 rounded-2xl transition-all hover:scale-105 active:scale-95 ${isDark ? 'hover:bg-stone-800 text-stone-500 hover:text-white' : 'hover:bg-[#fdf5e6]/10 text-[#e8d5b5] hover:text-white'}`}
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">
          {/* Sidebar Categorias */}
          <aside className={`w-full md:w-72 border-b md:border-b-0 md:border-r p-6 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto custom-scrollbar ${isDark ? 'bg-stone-900/20 border-stone-800' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
            <h3 className={`hidden md:block text-[10px] uppercase tracking-[0.4em] mb-4 px-4 font-bold ${isDark ? 'text-stone-500' : 'text-[#8b4513]/60'}`}>Departamentos</h3>
            {[
              { id: 'Armas', icon: Sword },
              { id: 'Armaduras', icon: Shield },
              { id: 'Equipamento', icon: Backpack },
              { id: 'Itens Mágicos', icon: Sparkles }
            ].map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${activeCategory === cat.id ? (isDark ? 'bg-amber-600 text-white border-amber-500 shadow-xl scale-105' : 'bg-[#8b4513] text-white border-[#8b4513] shadow-lg scale-105') : (isDark ? 'text-stone-400 border-transparent hover:bg-stone-800 hover:text-white' : 'text-[#8b4513]/70 border-transparent hover:bg-[#8b4513]/10 hover:text-[#8b4513]')}`}
              >
                <cat.icon className={`w-5 h-5 ${activeCategory === cat.id ? 'text-white' : ''}`} />
                {cat.id}
              </button>
            ))}

            <div className={`hidden md:flex flex-col gap-2 mt-8 pt-8 border-t ${isDark ? 'border-stone-800' : 'border-[#8b4513]/10'}`}>
              {activeCategory === 'Armas' ? (
                <>
                  <p className={`text-[9px] uppercase tracking-[0.4em] mb-4 px-4 font-bold ${isDark ? 'text-stone-500' : 'text-[#8b4513]/60'}`}>Filtrar Armas</p>
                  {['Corpo a corpo', 'À distância'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setActiveWeaponType(activeWeaponType === type ? null : type as any)}
                      className={`px-6 py-3 rounded-xl text-[11px] uppercase tracking-widest text-left transition-all border-l-4 ${activeWeaponType === type ? (isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500 font-bold' : 'bg-[#8b4513]/10 text-[#8b4513] border-[#8b4513] font-bold') : (isDark ? 'text-stone-500 border-transparent hover:text-stone-300 hover:bg-stone-800/50' : 'text-[#8b4513]/50 border-transparent hover:text-[#8b4513] hover:bg-[#8b4513]/5')}`}
                    >
                      {type}
                    </button>
                  ))}
                  <p className={`text-[9px] uppercase tracking-[0.4em] mt-6 mb-4 px-4 font-bold ${isDark ? 'text-stone-500' : 'text-[#8b4513]/60'}`}>Dano do Dado</p>
                  <div className="grid grid-cols-2 gap-2 px-2">
                    {damageDice.map(die => (
                      <button 
                        key={die}
                        onClick={() => setActiveDamageDie(activeDamageDie === die ? null : die)}
                        className={`px-2 py-2 rounded-xl text-[10px] uppercase tracking-widest text-center transition-all border ${activeDamageDie === die ? (isDark ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#8b4513] text-white border-[#8b4513]') : (isDark ? 'text-stone-500 border-stone-800 hover:text-stone-300 hover:bg-stone-800/50' : 'text-[#8b4513]/50 border-[#8b4513]/10 hover:text-[#8b4513] hover:bg-[#8b4513]/5')}`}
                      >
                        {die}
                      </button>
                    ))}
                  </div>
                </>
              ) : activeCategory === 'Itens Mágicos' ? (
                <>
                  <p className={`text-[9px] uppercase tracking-[0.4em] mb-4 px-4 font-bold ${isDark ? 'text-stone-500' : 'text-[#8b4513]/60'}`}>Filtrar por Raridade</p>
                  {rarities.map(rarity => (
                    <button 
                      key={rarity}
                      onClick={() => setActiveRarity(activeRarity === rarity ? null : rarity)}
                      className={`px-6 py-3 rounded-xl text-[11px] uppercase tracking-widest text-left transition-all border-l-4 ${activeRarity === rarity ? (isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500 font-bold' : 'bg-[#8b4513]/10 text-[#8b4513] border-[#8b4513] font-bold') : (isDark ? 'text-stone-500 border-transparent hover:text-stone-300 hover:bg-stone-800/50' : 'text-[#8b4513]/50 border-transparent hover:text-[#8b4513] hover:bg-[#8b4513]/5')}`}
                    >
                      {rarity}
                    </button>
                  ))}
                </>
              ) : null}
            </div>
          </aside>

          {/* Grid de Itens */}
          <main className={`flex-1 overflow-y-auto p-8 custom-scrollbar ${isDark ? 'bg-stone-900/10' : 'bg-[#fdf5e6]/30'}`}>
            {/* Mobile Rarity Selector */}
            <div className={`md:hidden flex gap-3 overflow-x-auto pb-6 mb-6 border-b ${isDark ? 'border-stone-800' : 'border-[#8b4513]/10'}`}>
              {activeCategory === 'Armas' ? (
                <>
                  {['Corpo a corpo', 'À distância'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setActiveWeaponType(activeWeaponType === type ? null : type as any)}
                      className={`px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border ${activeWeaponType === type ? (isDark ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#8b4513] text-white border-[#8b4513]') : (isDark ? 'bg-stone-900/40 text-stone-500 border-transparent' : 'bg-[#8b4513]/5 text-[#8b4513]/60 border-transparent')}`}
                    >
                      {type}
                    </button>
                  ))}
                  {damageDice.map(die => (
                    <button 
                      key={die}
                      onClick={() => setActiveDamageDie(activeDamageDie === die ? null : die)}
                      className={`px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border ${activeDamageDie === die ? (isDark ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#8b4513] text-white border-[#8b4513]') : (isDark ? 'bg-stone-900/40 text-stone-500 border-transparent' : 'bg-[#8b4513]/5 text-[#8b4513]/60 border-transparent')}`}
                    >
                      {die}
                    </button>
                  ))}
                </>
              ) : activeCategory === 'Itens Mágicos' ? (
                rarities.map(rarity => (
                  <button 
                    key={rarity}
                    onClick={() => setActiveRarity(activeRarity === rarity ? null : rarity)}
                    className={`px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border ${activeRarity === rarity ? (isDark ? 'bg-amber-600 text-white border-amber-500' : 'bg-[#8b4513] text-white border-[#8b4513]') : (isDark ? 'bg-stone-900/40 text-stone-500 border-transparent' : 'bg-[#8b4513]/5 text-[#8b4513]/60 border-transparent')}`}
                  >
                    {rarity}
                  </button>
                ))
              ) : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredItems.map(item => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id}
                    className={`group relative border rounded-3xl p-6 transition-all flex flex-col gap-4 overflow-hidden ${isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white/60 border-[#8b4513]/20 shadow-sm hover:shadow-md'} ${getRarityGlow(item.rarity)}`}
                  >
                    {/* Decorative Card Background */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/5 to-transparent -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700`}></div>

                    <div className="flex justify-between items-start relative z-10">
                      <div className="flex flex-col gap-1">
                        <h3 className={`text-xl font-bold leading-tight tracking-tight cinzel transition-colors ${isDark ? 'text-white group-hover:text-amber-400' : 'text-stone-900 group-hover:text-[#8b4513]'}`}>{item.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-[8px] uppercase tracking-widest font-bold ${isDark ? 'text-stone-500' : 'text-[#8b4513]/50'}`}>{item.category}</span>
                          {item.rarity && (
                            <>
                              <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-stone-800' : 'bg-stone-200'}`}></span>
                              <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${getRarityColor(item.rarity)}`}>
                                {item.rarity}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-2xl font-bold flex items-center gap-1 tracking-tighter ${isDark ? 'text-stone-800' : 'text-stone-300'}`}>
                          {item.weight}
                          <span className="text-[10px] font-bold mt-1 opacity-40">KG</span>
                        </span>
                      </div>
                    </div>
                    
                    <p className={`text-sm italic leading-relaxed relative z-10 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                      {item.description}
                    </p>

                    {/* Detalhes Técnicos no Card */}
                    {item.category === 'Armas' && (
                      <div className={`grid grid-cols-1 gap-3 py-4 border-y relative z-10 ${isDark ? 'border-stone-800' : 'border-[#8b4513]/10'}`}>
                        <div className="flex justify-between items-center">
                          <p className={`text-[9px] uppercase font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-[#8b4513]/40'}`}>Dano</p>
                          <p className={`text-sm font-bold ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>{item.damage}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className={`text-[9px] uppercase font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-[#8b4513]/40'}`}>Categoria</p>
                          <p className={`text-sm font-bold ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>{item.weaponCategory}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className={`text-[9px] uppercase font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-[#8b4513]/40'}`}>Tipo</p>
                          <p className={`text-sm font-bold ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>{item.weaponType}</p>
                        </div>
                        {item.range && (
                          <div className="flex justify-between items-center">
                            <p className={`text-[9px] uppercase font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-[#8b4513]/40'}`}>Alcance</p>
                            <p className={`text-sm font-bold ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>{item.range}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {item.category === 'Armaduras' && (
                      <div className={`grid grid-cols-1 gap-3 py-4 border-y relative z-10 ${isDark ? 'border-stone-800' : 'border-[#8b4513]/10'}`}>
                        <div className="flex justify-between items-center">
                          <p className={`text-[9px] uppercase font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-[#8b4513]/40'}`}>CA</p>
                          <p className={`text-sm font-bold ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>{item.ac}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className={`text-[9px] uppercase font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-[#8b4513]/40'}`}>Cat.</p>
                          <p className={`text-sm font-bold ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>{item.armorCategory}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className={`text-[9px] uppercase font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-[#8b4513]/40'}`}>Força</p>
                          <p className={`text-sm font-bold ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>{item.strengthRequirement || '-'}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className={`text-[9px] uppercase font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-[#8b4513]/40'}`}>Furtiv.</p>
                          <p className={`text-sm font-bold ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>{item.stealthDisadvantage ? 'Desv.' : 'Normal'}</p>
                        </div>
                      </div>
                    )}

                    {((item.properties && item.properties.length > 0) || item.damageType) && (
                      <div className="flex flex-wrap gap-1.5 relative z-10">
                        {item.damageType && item.damageType !== 'especial' && (
                          <span className={`px-2.5 py-1 rounded-md border text-[8px] font-bold uppercase tracking-wider ${isDark ? 'bg-stone-800/50 border-stone-700 text-stone-300' : 'bg-stone-100 border-stone-200 text-stone-600'}`}>
                            {item.damageType}
                          </span>
                        )}
                        {item.properties?.map(prop => (
                          <span key={prop} className={`px-2.5 py-1 rounded-md border text-[8px] font-bold uppercase tracking-wider ${isDark ? 'bg-stone-800/50 border-stone-700 text-stone-300' : 'bg-stone-100 border-stone-200 text-stone-600'}`}>
                            {prop}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-4 flex flex-col gap-4 relative z-10">
                      <button 
                        disabled={parsePrice(item.price) > getTotalGold()}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePurchase(item);
                        }}
                        className={`w-full font-bold py-3 rounded-xl uppercase tracking-widest text-[10px] shadow-md transition-all border-b-4 border-black/20 flex items-center justify-center gap-2 group/btn ${
                          parsePrice(item.price) > getTotalGold()
                            ? (isDark ? 'bg-stone-800 text-stone-600 cursor-not-allowed grayscale border-none' : 'bg-stone-200 text-stone-400 cursor-not-allowed border-none')
                            : getCurrencyStyles(item.price)
                        }`}
                      >
                        {parsePrice(item.price) > getTotalGold() ? (
                          language === 'pt' ? 'Recursos Insuficientes' : 'Insufficient Funds'
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>{language === 'pt' ? 'COMPRAR POR' : 'BUY FOR'}</span>
                            <span className="text-lg">{item.price.split(' ')[0]}</span>
                            <CoinIcon className={`w-4 h-4 ${
                              item.price.toLowerCase().includes('po') ? 'text-amber-200/60' : 
                              item.price.toLowerCase().includes('pp') ? 'text-stone-200/60' : 
                              item.price.toLowerCase().includes('pc') ? 'text-orange-200/60' : 
                              'text-slate-200/60'
                            }`} />
                          </div>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredItems.length === 0 && (
              <div className={`h-full flex flex-col items-center justify-center text-center py-32 ${isDark ? 'opacity-20' : 'opacity-40'}`}>
                <div className={`w-32 h-32 rounded-full border border-dashed flex items-center justify-center mb-8 ${isDark ? 'border-stone-700' : 'border-stone-300'}`}>
                  <Search className={`w-16 h-16 ${isDark ? 'text-stone-500' : 'text-stone-400'}`} />
                </div>
                <p className={`text-4xl font-bold uppercase tracking-widest cinzel ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>Catálogo Vazio</p>
                <p className={`text-sm mt-4 uppercase font-bold tracking-widest ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>"Nenhum tesouro encontrado nestas coordenadas"</p>
              </div>
            )}
          </main>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-red-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold text-sm uppercase tracking-widest flex items-center gap-3 border border-red-600"
            >
              <span className="text-lg">⚠️</span>
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ItemShop;
