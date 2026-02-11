export interface FeatureInfo {
  name: string;
  description: string;
  level: number;
  subclass?: string;
  actionType?: string;
  summary?: string;
  isKey?: boolean;
}

export const BARBARIAN_FEATURES: FeatureInfo[] = [
  // Base Class - Level 1
  { 
    name: "Fúria", 
    level: 1, 
    actionType: 'Ativa',
    summary: 'Bônus de dano e resistência física.',
    isKey: true,
    description: "Enquanto estiver em fúria, você recebe bônus nas jogadas de dano corpo a corpo baseadas em Força e resistência a dano contundente, perfurante e cortante. A fúria dura 1 minuto e termina se você não atacar uma criatura hostil ou não sofrer dano desde o seu último turno." 
  },
  { 
    name: "Defesa sem Armadura", 
    level: 1, 
    actionType: 'Passiva',
    summary: 'CA baseada em Destreza e Constituição.',
    description: "Quando não estiver usando armadura, sua Classe de Armadura é igual a 10 + modificador de Destreza + modificador de Constituição. Você ainda pode usar escudo." 
  },
  
  // Level 2
  { 
    name: "Ataque Descuidado", 
    level: 2, 
    actionType: 'Ativa',
    summary: 'Vantagem no ataque por vantagem contra você.',
    isKey: true,
    description: "No primeiro ataque do seu turno, você pode escolher atacar com vantagem usando Força. Até o início do seu próximo turno, ataques contra você também têm vantagem." 
  },
  { 
    name: "Sentido de Perigo", 
    level: 2, 
    actionType: 'Passiva',
    summary: 'Vantagem em testes de resistência de Destreza.',
    description: "Você tem vantagem em testes de resistência de Destreza contra efeitos que possa ver, como armadilhas e magias, desde que não esteja cego, surdo ou incapacitado." 
  },
  
  // Level 3
  { 
    name: "Caminho Primitivo", 
    level: 3, 
    actionType: 'Estrutural',
    summary: 'Escolha de especialização de arquétipo.',
    description: "Você escolhe um caminho que define sua especialização como bárbaro, concedendo habilidades adicionais nos níveis 3, 6, 10 e 14." 
  },
  
  // Level 4
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 4, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você pode aumentar um atributo em +2, ou dois atributos em +1 cada. Alternativamente, pode escolher um talento, se essa regra estiver em uso." 
  },
  
  // Level 5
  { 
    name: "Ataque Extra", 
    level: 5, 
    actionType: 'Passiva',
    summary: 'Dois ataques por ação de Ataque.',
    isKey: true,
    description: "Quando você realiza a ação de Ataque no seu turno, pode atacar duas vezes em vez de uma." 
  },
  { 
    name: "Movimento Rápido", 
    level: 5, 
    actionType: 'Passiva',
    summary: '+3 metros de deslocamento.',
    description: "Seu deslocamento aumenta em +3 metros enquanto você não estiver usando armadura pesada." 
  },
  
  // Level 7
  { 
    name: "Instinto Feral", 
    level: 7, 
    actionType: 'Passiva',
    summary: 'Vantagem em Iniciativa.',
    isKey: true,
    description: "Você tem vantagem nas jogadas de iniciativa. Além disso, se estiver surpreendido no início do combate, pode agir normalmente no primeiro turno se entrar em fúria." 
  },
  
  // Level 8
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 8, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  
  // Level 9
  { 
    name: "Crítico Brutal", 
    level: 9, 
    actionType: 'Upgrade',
    summary: '+1 dado de dano extra em acertos críticos.',
    description: "Ao acertar um acerto crítico com um ataque corpo a corpo, você rola um dado adicional de dano do mesmo tipo da arma. Este valor aumenta conforme o nível." 
  },

  // Level 11
  { 
    name: "Fúria Implacável", 
    level: 11, 
    actionType: 'Passiva',
    summary: 'Resistir à morte enquanto em fúria.',
    description: "Enquanto estiver em fúria, se cair a 0 pontos de vida e não morrer imediatamente, você pode fazer um teste de Constituição (CD 10) para permanecer consciente com 1 ponto de vida. A CD aumenta a cada uso após o primeiro, e é redefinida após um descanso longo." 
  },

  // Level 12
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 12, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 13
  { 
    name: "Crítico Brutal", 
    level: 13, 
    actionType: 'Upgrade',
    summary: '+2 dados de dano extra em acertos críticos.',
    description: "O número de dados extras de dano ao realizar um acerto crítico com ataque corpo a corpo aumenta para dois." 
  },

  // Level 15
  { 
    name: "Fúria Persistente", 
    level: 15, 
    actionType: 'Passiva',
    summary: 'Fúria contínua sem necessidade de bater/sofrer dano.',
    description: "Sua fúria só termina prematuramente se você cair inconsciente ou decidir encerrá-la voluntariamente." 
  },

  // Level 16
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 16, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 17
  { 
    name: "Crítico Brutal", 
    level: 17, 
    actionType: 'Upgrade',
    summary: '+3 dados de dano extra em acertos críticos.',
    description: "O número de dados extras de dano ao realizar um acerto crítico com ataque corpo a corpo aumenta para três." 
  },

  // Level 18
  { 
    name: "Força Indomável", 
    level: 18, 
    actionType: 'Passiva',
    summary: 'Usar valor de Força como mínimo em testes.',
    description: "Se o total de um teste de Força for menor que seu valor de Força, você pode usar esse valor no lugar do resultado." 
  },

  // Level 19
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 19, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 20
  { 
    name: "Campeão Primitivo", 
    level: 20, 
    actionType: 'Passiva',
    summary: '+4 Força e Constituição (Máximo 24).',
    isKey: true,
    description: "Sua Força e Constituição aumentam em +4. O valor máximo desses atributos passa a ser 24." 
  },

  // Subclasses: Path of the Berserker (Furioso)
  { 
    name: "Frenesi", 
    level: 3, 
    subclass: "Caminho do Furioso", 
    actionType: 'Ativa',
    summary: 'Ataque extra como ação bônus por exaustão.',
    description: "Durante a fúria, você pode entrar em frenesi e realizar um ataque corpo a corpo adicional como ação bônus em cada turno. Ao final da fúria, você sofre 1 nível de exaustão." 
  },
  { 
    name: "Fúria Inconsciente", 
    level: 6, 
    subclass: "Caminho do Furioso", 
    actionType: 'Passiva',
    summary: 'Imunidade a Enfeitiçado e Amedrontado.',
    description: "Enquanto estiver em fúria, você não pode ser enfeitiçado ou amedrontado. Se já estiver sob um desses efeitos, eles ficam suspensos enquanto durar a fúria." 
  },
  { 
    name: "Presença Intimidante", 
    level: 10, 
    subclass: "Caminho do Furioso", 
    actionType: 'Ativa',
    summary: 'Amedrontar criatura com ação.',
    description: "Você pode usar sua ação para tentar amedrontar uma criatura que possa ver. O alvo pode resistir conforme as regras do sistema." 
  },
  { 
    name: "Retaliação", 
    level: 14, 
    subclass: "Caminho do Furioso", 
    actionType: 'Reação',
    summary: 'Ataque imediato contra quem te ferir.',
    description: "Quando uma criatura a até 1,5 metro causar dano a você, pode usar sua reação para realizar um ataque corpo a corpo contra ela." 
  },

  // Subclasses: Path of the Totem Warrior (Guerreiro Totêmico)
  { 
    name: "Conselheiro Espiritual", 
    level: 3, 
    subclass: "Caminho do Guerreiro Totêmico", 
    actionType: 'Passiva',
    summary: 'Rituais de natureza e animais.',
    description: "Você pode conjurar Falar com Animais e Sentido Primitivo como rituais, sem gastar espaços de magia." 
  },
  { 
    name: "Totem Espiritual", 
    level: 3, 
    subclass: "Caminho do Guerreiro Totêmico", 
    actionType: 'Estrutural',
    summary: 'Benefício de animal durante a fúria.',
    description: "Você escolhe um espírito animal (Urso, Águia ou Lobo) que concede benefícios específicos enquanto estiver em fúria." 
  },
  { 
    name: "Aspecto da Besta", 
    level: 6, 
    subclass: "Caminho do Guerreiro Totêmico", 
    actionType: 'Estrutural',
    summary: 'Benefício permanente de animal utilitário.',
    description: "Você escolhe um aspecto animal que concede um benefício permanente fora de combate." 
  },
  { 
    name: "Andarilho Espiritual", 
    level: 10, 
    subclass: "Caminho do Guerreiro Totêmico", 
    actionType: 'Passiva',
    summary: 'Comunhão com a Natureza como ritual.',
    description: "Você pode conjurar Comunhão com a Natureza como ritual." 
  },
  { 
    name: "Sintonia Totêmica", 
    level: 14, 
    subclass: "Caminho do Guerreiro Totêmico", 
    actionType: 'Estrutural',
    summary: 'Poder animal supremo durante a fúria.',
    description: "Você escolhe uma sintonia animal que concede um benefício poderoso durante a fúria." 
  },
];

export const WARRIOR_FEATURES: FeatureInfo[] = [
  // Base Class - Level 1
  { 
    name: "Estilo de Luta", 
    level: 1, 
    actionType: 'Estrutural', 
    summary: 'Bônus permanente de combate.',
    description: "Você escolhe um estilo de combate que concede um bônus permanente, como aumento de defesa, precisão ou dano, dependendo da opção escolhida." 
  },
  { 
    name: "Recuperar o Fôlego", 
    level: 1, 
    actionType: 'Ativa', 
    summary: 'Curar 1d10 + nível como ação bônus.',
    description: "Você pode usar uma ação bônus para recuperar pontos de vida iguais a 1d10 + seu nível de guerreiro. Você pode usar esta característica uma vez por descanso curto ou longo." 
  },
  
  // Level 2
  { 
    name: "Surto de Ação", 
    level: 2, 
    actionType: 'Ativa', 
    summary: 'Uma ação adicional no turno.',
    isKey: true,
    description: "No seu turno, você pode realizar uma ação adicional além da sua ação normal e possível ação bônus. Você pode usar esta característica uma vez por descanso curto ou longo." 
  },
  
  // Level 3
  { 
    name: "Arquétipo Marcial", 
    level: 3, 
    actionType: 'Estrutural', 
    summary: 'Escolha de especialização de combate.',
    description: "Você escolhe um arquétipo marcial que define seu estilo de combate especializado, concedendo habilidades adicionais nos níveis 3, 7, 10, 15 e 18." 
  },

  // Level 4
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 4, 
    actionType: 'Estrutural', 
    description: "Você pode aumentar um atributo em +2, ou dois atributos em +1 cada. Alternativamente, pode escolher um talento, se essa regra estiver em uso." 
  },

  // Level 5
  { 
    name: "Ataque Extra", 
    level: 5, 
    actionType: 'Upgrade', 
    summary: 'Dois ataques por ação de Ataque.',
    isKey: true,
    description: "Quando você realiza a ação de Ataque no seu turno, pode atacar duas vezes em vez de uma." 
  },

  // Level 6
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 6, 
    actionType: 'Estrutural', 
    description: "Você pode aumentar um atributo em +2, ou dois atributos em +1 cada. Alternativamente, pode escolher um talento, se essa regra estiver em uso." 
  },

  // Level 8
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 8, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 9
  { 
    name: "Indomável", 
    level: 9, 
    actionType: 'Passiva', 
    summary: 'Rerrolar teste de resistência falho.',
    description: "Quando você falhar em um teste de resistência, pode optar por rerrolar o teste. Você deve usar o novo resultado. Esta característica pode ser usada uma vez por descanso longo." 
  },

  // Level 11
  { 
    name: "Ataque Extra (2)", 
    level: 11, 
    actionType: 'Upgrade', 
    summary: 'Três ataques por ação de Ataque.',
    description: "Quando você realiza a ação de Ataque no seu turno, pode atacar três vezes." 
  },

  // Level 12
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 12, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 13
  { 
    name: "Indomável (2 usos)", 
    level: 13, 
    actionType: 'Upgrade', 
    summary: 'Dois usos de Indomável por descanso.',
    description: "Você pode usar Indomável duas vezes entre descansos longos." 
  },

  // Level 14
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 14, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 16
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 16, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 17
  { 
    name: "Surto de Ação (2 usos)", 
    level: 17, 
    actionType: 'Upgrade', 
    summary: 'Dois usos de Surto de Ação por descanso.',
    description: "Você pode usar Surto de Ação duas vezes entre descansos, mas apenas uma vez no mesmo turno." 
  },

  // Level 19
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 19, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 20
  { 
    name: "Ataque Extra (3)", 
    level: 20, 
    actionType: 'Upgrade Final', 
    summary: 'Quatro ataques por ação de Ataque.',
    isKey: true,
    description: "Quando você realiza a ação de Ataque no seu turno, pode atacar quatro vezes." 
  },

  // --- SUBCLASSES: CAMPEÃO ---
  { 
    name: "Crítico Aprimorado", 
    level: 3, 
    subclass: "Campeão", 
    actionType: 'Passiva', 
    summary: 'Crítico com 19 ou 20.',
    description: "Seus ataques com armas marcam um acerto crítico com um resultado de 19 ou 20 no d20." 
  },
  { 
    name: "Atleta Excepcional", 
    level: 7, 
    subclass: "Campeão", 
    actionType: 'Passiva', 
    summary: 'Bônus em testes físicos e salto.',
    description: "Você adiciona metade do seu bônus de proficiência (arredondado para cima) em testes de Força, Destreza ou Constituição que não usem proficiência. Além disso, seu salto aumenta." 
  },
  { 
    name: "Estilo de Combate Adicional", 
    level: 10, 
    subclass: "Campeão", 
    actionType: 'Estrutural', 
    summary: 'Escolha um segundo estilo de luta.',
    description: "Você escolhe um segundo Estilo de Luta." 
  },
  { 
    name: "Crítico Superior", 
    level: 15, 
    subclass: "Campeão", 
    actionType: 'Upgrade', 
    summary: 'Crítico com 18, 19 ou 20.',
    description: "Seus ataques com armas marcam acerto crítico com um resultado de 18–20 no d20." 
  },
  { 
    name: "Sobrevivente", 
    level: 18, 
    subclass: "Campeão", 
    actionType: 'Passiva', 
    summary: 'Regeneração automática com pouca vida.',
    description: "No início de cada turno, se tiver menos da metade dos seus pontos de vida e não estiver incapacitado, você recupera pontos de vida automaticamente." 
  },

  // --- SUBCLASSES: MESTRE DE BATALHA ---
  { 
    name: "Superioridade de Combate", 
    level: 3, 
    subclass: "Mestre de Batalha", 
    actionType: 'Estrutural', 
    summary: 'Dados de Superioridade (4 x d8).',
    description: "Você aprende manobras que usam Dados de Superioridade para efeitos táticos. Você começa com quatro dados de superioridade (d8), recuperados após descanso curto ou longo." 
  },
  { 
    name: "Manobras", 
    level: 3, 
    subclass: "Mestre de Batalha", 
    actionType: 'Ativa', 
    summary: 'Efeitos táticos em ataques/reações.',
    description: "Você aprende manobras que gastam dados de superioridade para causar efeitos adicionais aos seus ataques ou reações." 
  },
  { 
    name: "Estudante da Guerra", 
    level: 3, 
    subclass: "Mestre de Batalha", 
    actionType: 'Passiva', 
    summary: 'Proficiência em ferramentas de artesão.',
    description: "Você adquire proficiência em uma ferramenta de artesão à sua escolha." 
  },
  { 
    name: "Conhecer o Inimigo", 
    level: 7, 
    subclass: "Mestre de Batalha", 
    actionType: 'Passiva', 
    summary: 'Analisar capacidades de criaturas.',
    description: "Após observar uma criatura por 1 minuto fora de combate, você pode aprender informações comparativas sobre suas capacidades." 
  },
  { 
    name: "Aprimoramento de Superioridade", 
    level: 10, 
    subclass: "Mestre de Batalha", 
    actionType: 'Upgrade', 
    summary: 'Dados de Superioridade tornam-se d10.',
    description: "Seus dados de superioridade aumentam para d10." 
  },
  { 
    name: "Aprender Manobras Adicionais", 
    level: 15, 
    subclass: "Mestre de Batalha", 
    actionType: 'Upgrade', 
    summary: 'Aprende duas manobras extras.',
    description: "Você aprende duas manobras adicionais." 
  },
  { 
    name: "Aprimoramento de Superioridade (Final)", 
    level: 18, 
    subclass: "Mestre de Batalha", 
    actionType: 'Upgrade', 
    summary: 'Dados de Superioridade tornam-se d12.',
    description: "Seus dados de superioridade aumentam para d12." 
  },

  // --- SUBCLASSES: CAVALEIRO ARCANO ---
  { 
    name: "Conjuração", 
    level: 3, 
    subclass: "Cavaleiro Arcano", 
    actionType: 'Estrutural', 
    summary: 'Conjuração arcana baseada em Inteligência.',
    description: "Você aprende a conjurar magias arcanas, usando Inteligência como atributo de conjuração. Seu progresso mágico segue a tabela específica do Cavaleiro Arcano." 
  },
  { 
    name: "Vínculo com Arma", 
    level: 3, 
    subclass: "Cavaleiro Arcano", 
    actionType: 'Passiva', 
    summary: 'Arma inseparável e invocável.',
    description: "Você pode vincular-se a uma arma, não podendo ser desarmado dela, e pode invocá-la para sua mão como ação bônus." 
  },
  { 
    name: "Magia de Guerra", 
    level: 7, 
    subclass: "Cavaleiro Arcano", 
    actionType: 'Passiva', 
    summary: 'Ataque bônus após truque.',
    description: "Ao conjurar um truque, você pode realizar um ataque com arma como ação bônus." 
  },
  { 
    name: "Magia de Guerra Aprimorada", 
    level: 10, 
    subclass: "Cavaleiro Arcano", 
    actionType: 'Passiva', 
    summary: 'Magia durante Surto de Ação.',
    description: "Quando usar Surto de Ação, você pode conjurar uma magia em vez de apenas um ataque." 
  },
  { 
    name: "Golpe Arcano", 
    level: 15, 
    subclass: "Cavaleiro Arcano", 
    actionType: 'Ativa', 
    summary: 'Gastar magia para dano extra/condições.',
    description: "Quando acerta um ataque, você pode gastar um espaço de magia para causar dano adicional e possivelmente aplicar condições ao alvo." 
  },
  { 
    name: "Cavaleiro Arcano Aprimorado", 
    level: 18, 
    subclass: "Cavaleiro Arcano", 
    actionType: 'Passiva', 
    summary: 'Ataque adicional com Magia de Guerra.',
    description: "Ao usar Magia de Guerra, você pode realizar um ataque adicional." 
  },
];

export const ROGUE_FEATURES: FeatureInfo[] = [
  // Base Class - Level 1
  { 
    name: "Especialização", 
    level: 1, 
    actionType: 'Passiva', 
    summary: 'Proficiência dobrada em duas perícias.',
    description: "Você recebe proficiência em duas perícias adicionais à sua escolha." 
  },
  { 
    name: "Ataque Furtivo", 
    level: 1, 
    actionType: 'Passiva – Upgrade', 
    summary: 'Dano extra com vantagem ou aliado próximo.',
    isKey: true,
    description: "Uma vez por turno, quando acerta um ataque com uma arma de finesse ou à distância e tem vantagem na jogada de ataque, ou quando um aliado estiver a até 1,5 metro do alvo e você não tiver desvantagem, você causa dano extra. O dano aumenta conforme o nível de Ladino." 
  },
  { 
    name: "Linguagem dos Ladrões", 
    level: 1, 
    actionType: 'Passiva', 
    description: "Você conhece um código secreto usado por ladrões para transmitir mensagens ocultas por meio de sinais, marcas e símbolos discretos." 
  },
  
  // Level 2
  { 
    name: "Ação Ardilosa", 
    level: 2, 
    actionType: 'Passiva', 
    summary: 'Ações bônus utilitárias.',
    description: "Você pode usar as ações Correr, Desengajar ou Esconder como ação bônus em cada turno." 
  },
  
  // Level 3
  { 
    name: "Arquétipo Ladino", 
    level: 3, 
    actionType: 'Estrutural', 
    summary: 'Escolha de especialização de ladinagem.',
    description: "Você escolhe um arquétipo que define sua especialização, concedendo habilidades adicionais nos níveis 3, 9, 13 e 17." 
  },

  // Level 4
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 4, 
    actionType: 'Estrutural', 
    description: "Você pode aumentar um atributo em +2, ou dois atributos em +1 cada. Alternativamente, pode escolher um talento, se essa regra estiver em uso." 
  },

  // Level 5
  { 
    name: "Esquiva Sobrenatural", 
    level: 5, 
    actionType: 'Reação', 
    summary: 'Reduzir dano de ataque pela metade.',
    isKey: true,
    description: "Quando uma criatura que você possa ver o atinge com um ataque, você pode usar sua reação para reduzir o dano sofrido pela metade." 
  },

  // Level 6
  { 
    name: "Especialização", 
    level: 6, 
    actionType: 'Upgrade Estrutural', 
    description: "Você escolhe mais duas perícias ou ferramentas nas quais seu bônus de proficiência é dobrado." 
  },

  // Level 7
  { 
    name: "Evasão", 
    level: 7, 
    actionType: 'Passiva', 
    summary: 'Anular dano de testes de Destreza.',
    description: "Quando fizer um teste de resistência de Destreza para sofrer apenas metade do dano, você não sofre dano algum se passar no teste, e sofre apenas metade se falhar." 
  },

  // Level 8
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 8, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 9
  { 
    name: "Característica de Arquétipo Ladino", 
    level: 9, 
    actionType: 'Estrutural', 
    description: "Você recebe uma habilidade concedida pelo arquétipo escolhido." 
  },

  // Level 10
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 10, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 11
  { 
    name: "Talento Confiável", 
    level: 11, 
    actionType: 'Passiva', 
    summary: 'Mínimo de 10 em dados de perícia.',
    description: "Sempre que fizer um teste de habilidade no qual seja proficiente, qualquer resultado de 9 ou menor no d20 conta como 10." 
  },

  // Level 12
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 12, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 13
  { 
    name: "Característica de Arquétipo Ladino", 
    level: 13, 
    actionType: 'Estrutural', 
    description: "Você recebe uma habilidade concedida pelo arquétipo escolhido." 
  },

  // Level 14
  { 
    name: "Sentidos às Cegas", 
    level: 14, 
    actionType: 'Passiva', 
    summary: 'Detectar criaturas próximas.',
    description: "Você percebe a localização de criaturas escondidas ou invisíveis a até 3 metros de distância." 
  },

  // Level 15
  { 
    name: "Mente Escorregadia", 
    level: 15, 
    actionType: 'Passiva', 
    summary: 'Proficiência em salvaguardas de Sabedoria.',
    description: "Você ganha proficiência em testes de resistência de Sabedoria." 
  },

  // Level 16
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 16, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 17
  { 
    name: "Característica de Arquétipo Ladino", 
    level: 17, 
    actionType: 'Estrutural', 
    description: "Você recebe uma habilidade concedida pelo arquétipo escolhido." 
  },

  // Level 18
  { 
    name: "Elusivo", 
    level: 18, 
    actionType: 'Passiva', 
    summary: 'Inimigos perdem vantagem contra você.',
    description: "Nenhuma jogada de ataque tem vantagem contra você enquanto não estiver incapacitado." 
  },

  // Level 19
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 19, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 20
  { 
    name: "Golpe de Sorte", 
    level: 20, 
    actionType: 'Ativa / Reação Opcional', 
    summary: 'Transformar falha em acerto/20 natural.',
    isKey: true,
    description: "Se errar um ataque, você pode transformá-lo em um acerto. Alternativamente, se falhar em um teste de habilidade, pode tratar o resultado como 20. Esta característica pode ser usada uma vez por descanso curto ou longo." 
  },

  // --- SUBCLASSES: LADRÃO ---
  { 
    name: "Mãos Rápidas", 
    level: 3, 
    subclass: "Ladrão", 
    actionType: 'Passiva / Ação Bônus', 
    summary: 'Usar ferramentas/objetos como ação bônus.',
    description: "Você pode usar a Ação Ardilosa para: usar ferramentas de ladrão para abrir fechaduras ou desarmar armadilhas; realizar a ação Usar Objeto como ação bônus." 
  },
  { 
    name: "Trabalho de Segundo-Story", 
    level: 3, 
    subclass: "Ladrão", 
    actionType: 'Passiva', 
    summary: 'Bônus em escalada e saltos.',
    description: "Você recebe vantagem em testes de Destreza (Acrobacia) relacionados a escalar. Além disso, a distância do seu salto aumenta de acordo com seu modificador de Destreza." 
  },
  { 
    name: "Furtividade Suprema", 
    level: 9, 
    subclass: "Ladrão", 
    actionType: 'Passiva', 
    summary: 'Vantagem em furtividade ao mover pouco.',
    description: "Você tem vantagem em testes de Destreza (Furtividade) se se mover no máximo metade do seu deslocamento no turno." 
  },
  { 
    name: "Usar Dispositivo Mágico", 
    level: 13, 
    subclass: "Ladrão", 
    actionType: 'Passiva / Estrutural', 
    summary: 'Ignorar requisitos de itens mágicos.',
    description: "Você ignora todos os requisitos de classe, raça e nível ao usar itens mágicos." 
  },
  { 
    name: "Reflexos de Ladrão", 
    level: 17, 
    subclass: "Ladrão", 
    actionType: 'Passiva', 
    summary: 'Dois turnos na primeira rodada.',
    description: "No primeiro turno de cada combate, você recebe dois turnos: um na sua iniciativa normal e outro na iniciativa −10. Esta característica não se aplica se você estiver surpreendido." 
  },

  // --- SUBCLASSES: ASSASSINO ---
  { 
    name: "Assassinar", 
    level: 3, 
    subclass: "Assassino", 
    actionType: 'Passiva / Condicional', 
    summary: 'Vantagem e Crítico contra alvos desprevenidos.',
    description: "Você tem vantagem em jogadas de ataque contra qualquer criatura que ainda não tenha agido no combate. Além disso, qualquer acerto contra uma criatura surpreendida é considerado um acerto crítico." 
  },
  { 
    name: "Proficiências Adicionais", 
    level: 3, 
    subclass: "Assassino", 
    actionType: 'Passiva', 
    summary: 'Kits de disfarce e venenos.',
    description: "Você recebe proficiência com o kit de disfarce e o kit de venenos." 
  },
  { 
    name: "Infiltração Especializada", 
    level: 9, 
    subclass: "Assassino", 
    actionType: 'Passiva / Estrutural', 
    summary: 'Criar identidades falsas detalhadas.',
    description: "Você pode criar uma identidade falsa detalhada, incluindo documentos, história pessoal e conexões sociais plausíveis. Esta identidade requer tempo de preparação e depende de interpretação narrativa." 
  },
  { 
    name: "Impostor", 
    level: 13, 
    subclass: "Assassino", 
    actionType: 'Passiva', 
    summary: 'Imitar perfeitamente voz e maneirismos.',
    description: "Após observar uma criatura por tempo suficiente, você pode imitar perfeitamente sua voz, escrita e maneirismos, permitindo se passar por ela de forma convincente." 
  },
  { 
    name: "Golpe Mortal", 
    level: 17, 
    subclass: "Assassino", 
    actionType: 'Passiva / Condicional', 
    summary: 'Dobrar dano contra alvos surpreendidos.',
    description: "Quando você atinge uma criatura surpreendida, ela deve realizar um teste de resistência de Constituição. Se falhar, o dano do ataque é dobrado. Este efeito se soma a outras características que dependem de surpresa." 
  },

  // --- SUBCLASSES: TRAPACEIRO ARCANO ---
  { 
    name: "Conjuração", 
    level: 3, 
    subclass: "Trapaceiro Arcano", 
    actionType: 'Estrutural', 
    summary: 'Aprende a conjurar magias arcanas.',
    description: "Você aprende a conjurar magias arcanas. Regras de Conjuração: - Atributo de conjuração: Inteligência; - Tipo: magias conhecidas (não preparadas); - Progressão: 1/3 conjurador; - Espaços de magia seguem a tabela específica do Trapaceiro Arcano; - Truques e magias conhecidas aumentam conforme o nível. Restrições de Escolas: - A maioria das magias conhecidas deve ser das escolas Encantamento ou Ilusão; - Magias de outras escolas só podem ser escolhidas nos níveis permitidos pelo Livro do Jogador." 
  },
  { 
    name: "Mão Mágica Aprimorada", 
    level: 3, 
    subclass: "Trapaceiro Arcano", 
    actionType: 'Passiva / Upgrade', 
    summary: 'Mão mágica invisível e versátil.',
    description: "Quando conjura a magia Mão Mágica: a mão é invisível; você pode realizar testes de Destreza (Prestidigitação); pode usar ferramentas de ladrão; pode realizar a ação Usar Objeto. A mão não pode realizar ataques nem ativar itens mágicos." 
  },
  { 
    name: "Emboscada Mágica", 
    level: 9, 
    subclass: "Trapaceiro Arcano", 
    actionType: 'Passiva / Condicional', 
    summary: 'Desvantagem em salvaguardas enquanto escondido.',
    description: "Quando você está escondido de uma criatura e conjura uma magia contra ela, essa criatura tem desvantagem no teste de resistência contra a magia conjurada." 
  },
  { 
    name: "Versatilidade Mágica", 
    level: 13, 
    subclass: "Trapaceiro Arcano", 
    actionType: 'Passiva / Estrutural', 
    summary: 'Substituir magias ao subir de nível.',
    description: "Sempre que ganhar um nível de Ladino, você pode substituir uma magia conhecida por outra magia da lista do Trapaceiro Arcano, respeitando as restrições de escola." 
  },
  { 
    name: "Ladrão de Magias", 
    level: 17, 
    subclass: "Trapaceiro Arcano", 
    actionType: 'Reação / Condicional', 
    summary: 'Anular e roubar magia conjurada contra você.',
    description: "Quando uma criatura conjura uma magia contra você e você é alvo ou está na área de efeito, você pode usar sua reação para forçar a criatura a realizar um teste de resistência. Se a criatura falhar: a magia não tem efeito contra você; você aprende essa magia temporariamente; pode conjurá-la uma vez usando seus próprios espaços de magia. Após conjurar a magia roubada, ela é esquecida." 
  },
];