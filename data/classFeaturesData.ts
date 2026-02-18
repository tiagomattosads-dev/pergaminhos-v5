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
  { 
    name: "Caminho Primitivo", 
    level: 3, 
    actionType: 'Estrutural',
    summary: 'Escolha de especialização de arquétipo.',
    description: "Você escolhe um caminho que define sua especialização como bárbaro, concedendo habilidades adicionais nos níveis 3, 6, 10 e 14." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 4, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você pode aumentar um atributo em +2, ou dois atributos em +1 cada. Alternativamente, pode escolher um talento, se essa regra estiver em uso." 
  },
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
  { 
    name: "Instinto Feral", 
    level: 7, 
    actionType: 'Passiva',
    summary: 'Vantagem em Iniciativa.',
    isKey: true,
    description: "Você tem vantagem nas jogadas de iniciativa. Além disso, se estiver surpreendido no início do combate, pode agir normalmente no primeiro turno se entrar em fúria." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 8, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Crítico Brutal", 
    level: 9, 
    actionType: 'Upgrade',
    summary: '+1 dado de dano extra em acertos críticos.',
    description: "Ao acertar um acerto crítico com um ataque corpo a corpo, você rola um dado adicional de dano do mesmo tipo da arma. Este valor aumenta conforme o nível." 
  },
  { 
    name: "Fúria Implacável", 
    level: 11, 
    actionType: 'Passiva',
    summary: 'Resistir à morte enquanto em fúria.',
    description: "Enquanto estiver em fúria, se cair a 0 pontos de vida e não morrer imediatamente, você pode fazer um teste de Constituição (CD 10) para permanecer consciente com 1 ponto de vida. A CD aumenta a cada uso após o primeiro, e é redefinida após um descanso longo." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 12, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Crítico Brutal", 
    level: 13, 
    actionType: 'Upgrade',
    summary: '+2 dados de dano extra em acertos críticos.',
    description: "O número de dados extras de dano al realizar um acerto crítico com ataque corpo a corpo aumenta para dois." 
  },
  { 
    name: "Fúria Persistente", 
    level: 15, 
    actionType: 'Passiva',
    summary: 'Fúria contínua sem necessidade de bater/sofrer dano.',
    description: "Sua fúria só termina prematuramente se você cair inconsciente ou decidir encerrá-la voluntariamente." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 16, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Crítico Brutal", 
    level: 17, 
    actionType: 'Upgrade',
    summary: '+3 dados de dano extra em acertos críticos.',
    description: "O número de dados extras de dano al realizar um acerto crítico com ataque corpo a corpo aumenta para três." 
  },
  { 
    name: "Força Indomável", 
    level: 18, 
    actionType: 'Passiva',
    summary: 'Usar valor de Força como mínimo em testes.',
    description: "Se o total de um teste de Força for menor que seu valor de Força, você pode usar esse valor no lugar do resultado." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 19, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Campeão Primitivo", 
    level: 20, 
    actionType: 'Passiva',
    summary: '+4 Força e Constituição (Máximo 24).',
    isKey: true,
    description: "Sua Força e Constituição aumentam em +4. O valor máximo desses atributos passa a ser 24." 
  },
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
  { 
    name: "Estilo de Luta", 
    level: 1, 
    actionType: 'Estrutural', 
    summary: 'Bônus permanente de combate.',
    description: "Você escolhe um estilo de combate que concede um bônus permanente, como aumento de defesa, precisão ou dano, dependendo da option escolhida." 
  },
  { 
    name: "Recuperar o Fôlego", 
    level: 1, 
    actionType: 'Ativa', 
    summary: 'Curar 1d10 + nível como ação bônus.',
    description: "Você pode usar uma ação bônus para recuperar pontos de vida iguais a 1d10 + seu nível de guerreiro. Você pode usar esta característica uma vez por descanso curto ou longo." 
  },
  { 
    name: "Surto de Ação", 
    level: 2, 
    actionType: 'Ativa', 
    summary: 'Uma ação adicional no turno.',
    isKey: true,
    description: "No seu turno, você pode realizar uma ação adicional além da sua ação normal e possível ação bônus. Você pode usar esta característica uma vez por descanso curto ou longo." 
  },
  { 
    name: "Arquétipo Marcial", 
    level: 3, 
    actionType: 'Estrutural', 
    summary: 'Escolha de especialização de combate.',
    description: "Você escolhe um arquétipo marcial que define seu estilo de combate especializado, concedendo habilidades adicionais nos níveis 3, 7, 10, 15 e 18." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 4, 
    actionType: 'Estrutural', 
    description: "Você pode aumentar um atributo em +2, ou dois atributos em +1 cada. Alternativamente, pode escolher um talento, se essa regra estiver em uso." 
  },
  { 
    name: "Ataque Extra", 
    level: 5, 
    actionType: 'Upgrade', 
    summary: 'Dois ataques por ação de Ataque.',
    isKey: true,
    description: "Quando você realiza a ação de Ataque no seu turno, pode atacar duas vezes em vez de uma." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 6, 
    actionType: 'Estrutural', 
    description: "Você pode aumentar um atributo em +2, ou dois atributos em +1 cada. Alternativamente, pode escolher um talento, se essa regra estiver em uso." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 8, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Indomável", 
    level: 9, 
    actionType: 'Passiva', 
    summary: 'Rerrolar teste de resistência falho.',
    description: "Quando você falhar em um teste de resistência, pode optar por rerrolar o teste. Você deve usar o novo resultado. Esta característica pode ser usada uma vez por descanso longo." 
  },
  { 
    name: "Ataque Extra (2)", 
    level: 11, 
    actionType: 'Upgrade', 
    summary: 'Três ataques por ação de Ataque.',
    description: "Quando você realiza a ação de Ataque no seu turno, pode atacar três vezes." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 12, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Indomável (2 usos)", 
    level: 13, 
    actionType: 'Upgrade', 
    summary: 'Dois usos de Indomável por descanso.',
    description: "Você pode usar Indomável duas vezes entre descansos longos." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 14, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 16, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Surto de Ação (2 usos)", 
    level: 17, 
    actionType: 'Upgrade', 
    summary: 'Dois usos de Surto de Ação por descanso.',
    description: "Você pode usar Surto de Ação duas vezes entre descansos, mas apenas uma vez no mesmo turno." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 19, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Ataque Extra (3)", 
    level: 20, 
    actionType: 'Upgrade Final', 
    summary: 'Quatro ataques por ação de Ataque.',
    isKey: true,
    description: "Quando você realiza a ação de Ataque no seu turno, pode atacar quatro vezes." 
  },
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
  { 
    name: "Ação Ardilosa", 
    level: 2, 
    actionType: 'Passiva', 
    summary: 'Ações bônus utilitárias.',
    description: "Você pode usar as ações Correr, Desengajar ou Esconder como ação bônus em cada turno." 
  },
  { 
    name: "Arquétipo Ladino", 
    level: 3, 
    actionType: 'Estrutural', 
    summary: 'Escolha de especialização de ladinagem.',
    description: "Você escolhe um arquétipo que define sua especialização, concedendo habilidades adicionais nos níveis 3, 9, 13 e 17." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 4, 
    actionType: 'Estrutural', 
    description: "Você pode aumentar um atributo em +2, ou dois atributos em +1 cada. Alternativamente, pode escolher um talento, se essa regra estiver em uso." 
  },
  { 
    name: "Esquiva Sobrenatural", 
    level: 5, 
    actionType: 'Reação', 
    summary: 'Reduzir dano de ataque pela metade.',
    isKey: true,
    description: "Quando uma criatura que você possa ver o atinge com um ataque, você pode usar sua reação para reduzir o dano sofrido pela metade." 
  },
  { 
    name: "Especialização", 
    level: 6, 
    actionType: 'Upgrade Estrutural', 
    description: "Você escolhe mais duas perícias ou ferramentas nas quais seu bônus de proficiência é dobrado." 
  },
  { 
    name: "Evasão", 
    level: 7, 
    actionType: 'Passiva', 
    summary: 'Anular dano de testes de Destreza.',
    description: "Quando fizer um teste de resistência de Destreza para sofrer apenas metade do dano, você não sofre dano algum se passar no teste, e sofre apenas metade se falhar." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 8, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Característica de Arquétipo Ladino", 
    level: 9, 
    actionType: 'Estrutural', 
    description: "Você recebe uma habilidade concedida pelo arquétipo escolhido." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 10, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Talento Confiável", 
    level: 11, 
    actionType: 'Passiva', 
    summary: 'Mínimo de 10 em dados de perícia.',
    description: "Sempre que fizer um teste de habilidade no qual seja proficiente, qualquer resultado de 9 ou menor no d20 conta como 10." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 12, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Característica de Arquétipo Ladino", 
    level: 13, 
    actionType: 'Estrutural', 
    description: "Você recebe uma habilidade concedida pelo arquétipo escolhido." 
  },
  { 
    name: "Sentidos às Cegas", 
    level: 14, 
    actionType: 'Passiva', 
    summary: 'Detectar criaturas próximas.',
    description: "Você percebe a localização de criaturas escondidas ou invisíveis a até 3 metros de distância." 
  },
  { 
    name: "Mente Escorregadia", 
    level: 15, 
    actionType: 'Passiva', 
    summary: 'Proficiência em salvaguardas de Sabedoria.',
    description: "Você ganha proficiência em testes de resistência de Sabedoria." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 16, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Característica de Arquétipo Ladino", 
    level: 17, 
    actionType: 'Estrutural', 
    description: "Você recebe uma habilidade concedida pelo arquétipo escolhido." 
  },
  { 
    name: "Elusivo", 
    level: 18, 
    actionType: 'Passiva', 
    summary: 'Inimigos perdem vantagem contra você.',
    description: "Nenhuma jogada de ataque tem vantagem contra você enquanto não estiver incapacitado." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 19, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Golpe de Sorte", 
    level: 20, 
    actionType: 'Ativa / Reação Opcional', 
    summary: 'Transformar falha em acerto/20 natural.',
    isKey: true,
    description: "Se errar um ataque, você pode transformá-lo em um acerto. Alternativamente, se falhar em um teste de habilidade, pode tratar o resultado como 20. Esta característica pode ser usada uma vez por descanso curto ou longo." 
  },
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

export const PALADIN_FEATURES: FeatureInfo[] = [
  {
    name: "Sentido Divino",
    level: 1,
    actionType: "Ativa – Recurso",
    description: "Como ação, você pode detectar celestiais, ínferos e mortos-vivos a até 18 metros. Usos por descanso longo: 1 + modificador de Carisma."
  },
  {
    name: "Cura pelas Mãos",
    level: 1,
    actionType: "Ativa – Recurso",
    description: "Você possui uma reserva de cura igual a 5 × nível de Paladino. Como ação, pode tocar uma criatura e restaurar qualquer quantidade de pontos da reserva. Pode gastar 5 pontos para curar doença ou neutralizar veneno."
  },
  {
    name: "Estilo de Combate",
    level: 2,
    actionType: "Estrutural / Passiva",
    description: "Escolha um Estilo de Combate da lista do Paladino. Após escolhido, o efeito é permanente e não consome recurso."
  },
  {
    name: "Conjuração",
    level: 2,
    actionType: "Estrutural",
    description: "Atributo de conjuração: Carisma. Tipo: Magias Preparadas. Você pode preparar: Carisma + metade do nível de Paladino (arredondado para baixo). Segue tabela de espaços de magia de meio conjurador (Half Caster)."
  },
  {
    name: "Golpe Divino",
    level: 2,
    actionType: "Passiva / Condicional",
    description: "Quando acerta um ataque corpo a corpo, pode gastar um espaço de magia para causar dano radiante adicional. O dano aumenta conforme o nível do espaço gasto."
  },
  {
    name: "Saúde Divina",
    level: 3,
    actionType: "Passiva",
    description: "Você é imune a doenças."
  },
  {
    name: "Juramento Sagrado",
    level: 3,
    actionType: "Estrutural",
    description: "Escolha um Juramento. Recebe habilidades nos níveis 3, 7, 15 e 20."
  },
  {
    name: "Canalizar Divindade",
    level: 3,
    actionType: "Recurso",
    description: "Você pode usar Canalizar Divindade uma vez por descanso curto ou longo. Os efeitos dependem do Juramento escolhido."
  },
  {
    name: "Incremento no Valor de Habilidade",
    level: 4,
    actionType: "Estrutural",
    description: "Você pode aumentar um atributo em +2, ou dois atributos em +1 cada. Alternativamente, pode escolher um talento, se essa regra estiver em uso."
  },
  {
    name: "Ataque Extra",
    level: 5,
    actionType: "Upgrade",
    description: "Pode atacar duas vezes ao usar a ação de Ataque."
  },
  {
    name: "Aura de Proteção",
    level: 6,
    actionType: "Passiva",
    description: "Você e aliados a até 3 metros adicionam seu modificador de Carisma a testes de resistência."
  },
  {
    name: "Incremento no Valor de Habilidade",
    level: 8,
    actionType: "Estrutural",
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema."
  },
  {
    name: "Aura de Coragem",
    level: 10,
    actionType: "Passiva",
    description: "Você e aliados a até 3 metros não podem ser amedrontados."
  },
  {
    name: "Golpe Divino Aprimorado",
    level: 11,
    actionType: "Upgrade",
    description: "Seus ataques corpo a corpo causam 1d8 de dano radiante adicional."
  },
  {
    name: "Incremento no Valor de Habilidade",
    level: 12,
    actionType: "Estrutural",
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema."
  },
  {
    name: "Purificar Toque",
    level: 14,
    actionType: "Ativa – Recurso",
    description: "Você pode encerrar uma magia em si ou em outra criatura. Usos por descanso longo: igual ao modificador de Carisma."
  },
  {
    name: "Incremento no Valor de Habilidade",
    level: 16,
    actionType: "Estrutural",
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema."
  },
  {
    name: "Auras Aprimoradas",
    level: 18,
    actionType: "Upgrade",
    description: "O alcance das suas auras aumenta para 9 metros."
  },
  {
    name: "Incremento no Valor de Habilidade",
    level: 19,
    actionType: "Estrutural",
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema."
  },
  {
    name: "Magias do Juramento",
    level: 3,
    subclass: "Juramento dos Antigos",
    actionType: "Estrutural – Sempre Preparadas",
    description: "Você sempre tem estas magias preparadas. Elas NÃO contam no limite normal de magias preparadas.\n\nNível 3:\n- Enredar\n- Falar com Animais"
  },
  {
    name: "Canalizar Divindade — Ira da Natureza",
    level: 3,
    subclass: "Juramento dos Antigos",
    actionType: "Ativa – Recurso",
    description: "Como ação, você invoca vinhas espectrais para prender uma criatura. A criatura deve realizar um teste de resistência. Se falhar, fica restrita. Pode repetir o teste no final de cada turno."
  },
  {
    name: "Canalizar Divindade — Afastar os Infiéis",
    level: 3,
    subclass: "Juramento dos Antigos",
    actionType: "Ativa – Recurso",
    description: "Como ação, você apresenta seu símbolo sagrado. Fadas e ínferos que falharem no teste de resistência ficam amedrontados e devem fugir."
  },
  {
    name: "Magias do Juramento (Nível 5)",
    level: 5,
    subclass: "Juramento dos Antigos",
    actionType: "Sempre Preparadas",
    description: "Você sempre tem estas magias preparadas. Elas NÃO contam no limite normal de magias preparadas.\n\nNível 5:\n- Passo Nebuloso\n- Raio Lunar"
  },
  {
    name: "Aura de Proteção Mágica",
    level: 7,
    subclass: "Juramento dos Antigos",
    actionType: "Passiva",
    description: "Você e aliados a até 3 metros têm resistência a dano causado por magias. No nível 18, o alcance aumenta para 9 metros."
  },
  {
    name: "Magias do Juramento (Nível 9)",
    level: 9,
    subclass: "Juramento dos Antigos",
    actionType: "Sempre Preparadas",
    description: "Nível 9: Crescimento de Plantas, Proteção contra Energia"
  },
  {
    name: "Magias do Juramento (Nível 13)",
    level: 13,
    subclass: "Juramento dos Antigos",
    actionType: "Sempre Preparadas",
    description: "Nível 13: Pele Rochosa, Muralha de Fogo"
  },
  {
    name: "Guardião Imortal",
    level: 15,
    subclass: "Juramento dos Antigos",
    actionType: "Passiva – Recurso",
    description: "Quando for reduzido a 0 pontos de vida, você pode cair para 1 ponto de vida em vez disso. Pode usar este efeito uma vez por descanso longo. Além disso, você não sofre efeitos de envelhecimento mágico."
  },
  {
    name: "Magias do Juramento (Nível 17)",
    level: 17,
    subclass: "Juramento dos Antigos",
    actionType: "Sempre Preparadas",
    description: "Nível 17: Comunhão com a Natureza, Árvore Despertada"
  },
  {
    name: "Campeão Ancestral",
    level: 20,
    subclass: "Juramento dos Antigos",
    actionType: "Ativa – Transformação",
    description: "Como ação, por 1 minuto:\n- Você recupera 10 pontos de vida no início de cada turno.\n- Pode conjurar magias de Paladino de 1º nível como ação bônus.\n- Criaturas inimigas na aura têm desvantagem em testes de resistência contra suas magias e Canalizar Divindade.\nUsável uma vez por descanso longo."
  },
  {
    name: "Magias do Juramento",
    level: 3,
    subclass: "Juramento de Vingança",
    actionType: "Estrutural – Sempre Preparadas",
    description: "Você sempre tem estas magias preparadas. Elas NÃO contam no limite normal de magias preparadas.\n\nNível 3:\n- Perdição\n- Marca do Caçador"
  },
  {
    name: "Canalizar Divindade — Voto de Inimizade",
    level: 3,
    subclass: "Juramento de Vingança",
    actionType: "Ativa – Recurso",
    description: "Como ação bônus, você escolhe uma criatura a até 3 metros. Você tem vantagem em jogadas de ataque contra essa criatura por 1 minuto. Não requer concentração."
  },
  {
    name: "Canalizar Divindade — Abjurar Inimigo",
    level: 3,
    subclass: "Juramento de Vingança",
    actionType: "Ativa – Recurso",
    description: "Como ação, você escolhe uma criatura. A criatura deve realizar um teste de resistência. Se falhar: fica amedrontada e tem deslocamento reduzido a 0. Se tiver sucesso: deslocamento é reduzido pela metade."
  },
  {
    name: "Magias do Juramento (Nível 5)",
    level: 5,
    subclass: "Juramento de Vingança",
    actionType: "Sempre Preparadas",
    description: "Nível 5:\n- Passo Nebuloso\n- Imobilizar Pessoa"
  },
  {
    name: "Vingador Implacável",
    level: 7,
    subclass: "Juramento de Vingança",
    actionType: "Passiva",
    description: "Quando atinge uma criatura com um ataque de oportunidade, você pode se mover até metade do seu deslocamento, sem provocar ataques de oportunidade."
  },
  {
    name: "Magias do Juramento (Nível 9)",
    level: 9,
    subclass: "Juramento de Vingança",
    actionType: "Sempre Preparadas",
    description: "Nível 9:\n- Acelerar\n- Proteção contra Energia"
  },
  {
    name: "Magias do Juramento (Nível 13)",
    level: 13,
    subclass: "Juramento de Vingança",
    actionType: "Sempre Preparadas",
    description: "Nível 13:\n- Banimento\n- Porta Dimensional"
  },
  {
    name: "Alma da Vingança",
    level: 15,
    subclass: "Juramento de Vingança",
    actionType: "Passiva / Condicional",
    description: "Quando uma criatura sob efeito de seu Voto de Inimizade realiza um ataque, você pode usar sua reação para realizar um ataque corpo a corpo contra ela."
  },
  {
    name: "Magias do Juramento (Nível 17)",
    level: 17,
    subclass: "Juramento de Vingança",
    actionType: "Sempre Preparadas",
    description: "Nível 17:\n- Imobilizar Monstro\n- Vidência"
  },
  {
    name: "Anjo da Vingança",
    level: 20,
    subclass: "Juramento de Vingança",
    actionType: "Ativa – Transformação",
    description: "Como ação, por 1 hora:\n- Você ganha asas e deslocamento de voo.\n- Criaturas inimigas a até 9 metros devem realizar teste de resistência.\n- Se falharem, ficam amedrontadas.\nUsável uma vez por descanso longo."
  },
  {
    name: "Magias do Juramento",
    level: 3,
    subclass: "Juramento da Devoção",
    actionType: "Estrutural – Sempre Preparadas",
    description: "Você sempre tem estas magias preparadas. Elas NÃO contam no limite normal de magias preparadas. Nível 3: Proteção contra o Bem e o Mal, Santuário."
  },
  {
    name: "Canalizar Divindade — Arma Sagrada",
    level: 3,
    subclass: "Juramento da Devoção",
    actionType: "Ativa – Recurso",
    description: "Como ação, você imbui uma arma com energia divina por 1 minuto. Adiciona seu modificador de Carisma às jogadas de ataque. A arma emite luz brilhante. Se não for mágica, torna-se mágica durante a duração."
  },
  {
    name: "Canalizar Divindade — Afastar o Profano",
    level: 3,
    subclass: "Juramento da Devoção",
    actionType: "Ativa – Recurso",
    description: "Como ação, você apresenta seu símbolo sagrado. Ínferos e mortos-vivos que falharem no teste de resistência ficam amedrontados e devem fugir."
  },
  {
    name: "Magias do Juramento (Nível 5)",
    level: 5,
    subclass: "Juramento da Devoção",
    actionType: "Sempre Preparadas",
    description: "Nível 5: Restauração Menor, Zona da Verdade."
  },
  {
    name: "Aura de Devoção",
    level: 7,
    subclass: "Juramento da Devoção",
    actionType: "Passiva",
    description: "Você e aliados a até 3 metros não podem ser enfeitiçados. No nível 18, alcance aumenta para 9 metros."
  },
  {
    name: "Magias do Juramento (Nível 9)",
    level: 9,
    subclass: "Juramento da Devoção",
    actionType: "Sempre Preparadas",
    description: "Nível 9: Farol da Esperança, Dissipar Magia."
  },
  {
    name: "Magias do Juramento (Nível 13)",
    level: 13,
    subclass: "Juramento da Devoção",
    actionType: "Sempre Preparadas",
    description: "Nível 13: Liberdade de Movimento, Guardião da Fé."
  },
  {
    name: "Pureza de Espírito",
    level: 15,
    subclass: "Juramento da Devoção",
    actionType: "Passiva",
    description: "Você está permanentemente sob os efeitos de Proteção contra o Bem e o Mal. Não requer concentração."
  },
  {
    name: "Magias do Juramento (Nível 17)",
    level: 17,
    subclass: "Juramento da Devoção",
    actionType: "Sempre Preparadas",
    description: "Nível 17: Comunhão, Golpe Flamejante."
  },
  {
    name: "Halo Sagrado",
    level: 20,
    subclass: "Juramento da Devoção",
    actionType: "Ativa – Transformação",
    description: "Como ação, você emana luz radiante por 1 minuto. Criaturas inimigas na luz sofrem dano radiante. Ínferos e mortos-vivos têm desvantagem contra suas magias. Você tem vantagem em testes de resistência contra magias deles. Usável uma vez por descanso longo."
  }
];

export const RANGER_FEATURES: FeatureInfo[] = [
  {
    name: "Inimigo Favorecido",
    level: 1,
    actionType: "Estrutural / Passiva",
    description: "Ao escolher Patrulheiro, você seleciona um tipo de inimigo favored. Você tem vantagem em testes de Sabedoria (Sobrevivência) para rastrear esse tipo e em testes de Inteligência para recordar informações sobre ele. Você aprende um idioma falado por esse tipo."
  },
  {
    name: "Explorador Nato",
    level: 1,
    actionType: "Estrutural / Passiva",
    description: "Você seleciona um terreno favoured. Ao viajar por ele por 1 hora ou mais: terreno difícil não reduz velocidade; o grupo não se perde; você permanece alerta mesmo engajado em outras atividades; pode mover-se furtivamente em ritmo normal se estiver sozinho; encontra o dobro de alimento; aprende número e tamanho de criaturas rastreadas."
  },
  {
    name: "Estilo de Combate",
    level: 2,
    actionType: "Estrutural / Passiva",
    description: "Você adota um estilo de combate particular como sua especialidade."
  },
  {
    name: "Conjuração",
    level: 2,
    actionType: "Estrutural",
    description: "Atributo: SAB. Tipo: Magias Conhecidas. CD = 8 + prof + mod(SAB). Ataque = prof + mod(SAB). Segue tabela de meio conjurador."
  },
  {
    name: "Arquétipo de Patrulheiro",
    level: 3,
    actionType: "Estrutural",
    description: "Você escolhe um arquétipo que define sua maestria. Este tomo implementa o arquétipo Caçador."
  },
  {
    name: "Incremento no Valor de Habilidade",
    level: 4,
    actionType: "Estrutural",
    description: "Aumente um atributo em +2 ou dois em +1, ou escolha um talento."
  },
  {
    name: "Ataque Extra",
    level: 5,
    actionType: "Upgrade",
    description: "Ao usar a ação de Ataque, pode atacar duas vezes."
  },
  {
    name: "Passos Ligeiros",
    level: 8,
    actionType: "Passiva",
    description: "Mover-se através de terreno difícil não-mágico não custa movimento extra. Atravessa plantas não-mágicas sem redução ou dano. Vantagem contra plantas mágicas de impedimento."
  },
  {
    name: "Ocultar-se em Plena Vista",
    level: 10,
    actionType: "Ativa / Preparação",
    description: "Pode gastar 1 minuto criando camuflagem natural. Enquanto permanecer imóvel, recebe +10 em Furtividade."
  },
  {
    name: "Desaparecer",
    level: 14,
    actionType: "Passiva / Upgrade",
    description: "Pode usar Esconder como ação bônus. Não pode ser rastreado por meios não-mágicos a menos que queira."
  },
  {
    name: "Sentidos Selvagens",
    level: 18,
    actionType: "Passiva",
    description: "Você ganha percepção aprimorada contra inimigos invisíveis ou ocultos conforme PHB."
  },
  {
    name: "Matador de Inimigos",
    level: 20,
    actionType: "Passiva / Upgrade",
    description: "Uma vez por turno, pode adicionar seu mod de SAB a uma jogada de ataque OU dano contra um inimigo favorecido."
  }
];

export const HUNTER_FEATURES: Record<number, FeatureInfo[]> = {
  3: [
    {
      name: "Matador de Colossos",
      level: 3,
      subclass: "Caçador",
      actionType: "Passiva / Condicional",
      description: "Uma vez por turno, quando você atinge uma criatura que esteja abaixo de seus pontos de vida máximos, você causa +1d8 de dano adicional ao alvo."
    },
    {
      name: "Assassino de Gigantes",
      level: 3,
      subclass: "Caçador",
      actionType: "Reação / Condicional",
      description: "Quando uma criatura Grande ou maior erra um ataque corpo a corpo contra você, você pode usar sua reação para fazer um ataque contra essa criatura."
    },
    {
      name: "Matador de Hordas",
      level: 3,
      subclass: "Caçador",
      actionType: "Passiva / Condicional",
      description: "Uma vez por turno, quando você realiza um ataque com arma, você pode fazer outro ataque com a mesma arma contra uma criatura diferente que esteja a até 1,5m do alvo original e dentro do alcance da arma."
    }
  ],
  7: [
    {
      name: "Escapar da Horda",
      level: 7,
      subclass: "Caçador",
      actionType: "Passiva",
      description: "Ataques de oportunidade contra você são feitos com desvantagem."
    },
    {
      name: "Defesa contra Ataques Múltiplos",
      level: 7,
      subclass: "Caçador",
      actionType: "Passiva / Reativa",
      description: "Quando uma criatura o atinge com um ataque, você ganha +4 de CA contra todos os ataques subsequentes feitos por essa criatura até o fim do turno dela."
    },
    {
      name: "Vontade de Aço",
      level: 7,
      subclass: "Caçador",
      actionType: "Passiva",
      description: "Você tem vantagem em testes de resistência contra ser amedrontado."
    }
  ],
  11: [
    {
      name: "Ataque Giratório",
      level: 11,
      subclass: "Caçador",
      actionType: "Ativa",
      description: "Como ação, você pode realizar um ataque corpo a corpo contra qualquer número de criaturas dentro de 1,5m de você, fazendo uma jogada de ataque separada para cada alvo."
    },
    {
      name: "Chuva de Flechas",
      level: 11,
      subclass: "Caçador",
      actionType: "Ativa",
      description: "Como ação, você pode fazer um ataque à distância contra qualquer número de criaturas dentro de 3m de um ponto que você possa ver dentro do alcance da arma, realizando uma jogada de ataque separada para cada alvo."
    }
  ],
  15: [
    {
      name: "Evasão",
      level: 15,
      subclass: "Caçador",
      actionType: "Passiva",
      description: "Quando você for submetido a um efeito que permita realizar um teste de resistência de Destreza para sofrer metade do dano, você não sofre dano se for bem-sucedido, e sofre apenas metade do dano se falhar."
    },
    {
      name: "Suportar a Maré",
      level: 15,
      subclass: "Caçador",
      actionType: "Reação / Condicional",
      description: "Quando uma criatura errar um ataque corpo a corpo contra você, você pode usar sua reação para forçar que esse ataque atinja outra criatura de sua escolha, diferente do atacante, que esteja a até 1,5m dele."
    },
    {
      name: "Esquiva Sobrenatural",
      level: 15,
      subclass: "Caçador",
      actionType: "Reação",
      description: "Quando um atacante que você possa ver o atinge com um ataque, você pode usar sua reação para reduzir o dano pela metade."
    }
  ]
};
