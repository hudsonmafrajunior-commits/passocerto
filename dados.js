/* Conteúdo compartilhado pelo app e pelo painel.
   Os ids precisam ser os mesmos listados no Codigo.gs. */
window.QUEDAS_DADOS = {
  // Perguntas de triagem (baseadas no questionário "Stay Independent" do STEADI/CDC)
  TRIAGEM: [
    { id: 'instavel', t: 'Sente-se instável ou com medo de cair quando fica em pé ou caminha?', chave: true },
    { id: 'medo', t: 'Tem medo de cair?', chave: true },
    { id: 'auxilio', t: 'Usa ou foi orientado a usar bengala ou andador?' },
    { id: 'apoio_moveis', t: 'Costuma se apoiar nos móveis para andar dentro de casa?' },
    { id: 'levantar_bracos', t: 'Precisa empurrar com as mãos para levantar da cadeira?' },
    { id: 'meds', t: 'Toma 4 ou mais remédios diferentes por dia?' },
    { id: 'meds_sono', t: 'Toma remédio para dormir, para ansiedade ou para depressão?' },
    { id: 'tontura', t: 'Sente tontura ao se levantar?' },
    { id: 'urgencia', t: 'Precisa correr para o banheiro para não perder urina?' },
    { id: 'visao', t: 'Tem dificuldade para enxergar, mesmo de óculos?' },
    { id: 'pes', t: 'Sente dormência ou formigamento nos pés?' },
    { id: 'tristeza', t: 'Tem se sentido triste ou desanimado com frequência?' }
  ],
  // Orientações ligadas aos fatores de risco da triagem
  ORIENT_TRIAGEM: {
    auxilio: 'Peça a um fisioterapeuta para conferir a altura e o uso da bengala ou do andador.',
    apoio_moveis: 'Apoiar-se nos móveis indica pouco equilíbrio. Os exercícios de força e equilíbrio ajudam; até lá, deixe o caminho livre e com pontos firmes de apoio.',
    levantar_bracos: 'A dificuldade para levantar mostra fraqueza nas pernas. Exercícios de fortalecimento são o principal cuidado.',
    meds: 'Leve todos os remédios (inclusive os sem receita) numa consulta na UBS e peça uma revisão. Alguns aumentam o risco de queda.',
    meds_sono: 'Remédios para dormir, ansiedade ou depressão podem causar sonolência e desequilíbrio. Converse com o médico, sem parar nenhum por conta própria.',
    tontura: 'Levante em etapas: sente na beira da cama, conte até 30, fique em pé segurando em algo firme e só então caminhe. Avise o médico sobre a tontura.',
    urgencia: 'Deixe o caminho até o banheiro livre e iluminado à noite. A urgência para urinar tem tratamento: comente na UBS.',
    visao: 'Faça exame de vista pelo menos uma vez por ano. Cuidado com óculos multifocais ao descer escadas.',
    pes: 'Mostre os pés ao médico ou enfermeiro e use calçado fechado, firme e com sola antiderrapante.',
    tristeza: 'Converse com a equipe de saúde sobre o desânimo. Cuidar do humor também reduz o risco de quedas.'
  },
  // Segurança da casa
  CASA: [
    { id: 'casa_tapetes', bom: 'nao', t: 'Há tapetes soltos, fios ou objetos no caminho?', dica: 'Retire tapetes soltos ou prenda-os com fita dupla-face. Tire fios e objetos dos lugares de passagem.' },
    { id: 'casa_luz', bom: 'sim', t: 'A casa é bem iluminada, inclusive o caminho do quarto ao banheiro à noite?', dica: 'Deixe uma luz noturna acesa no caminho até o banheiro e um interruptor ou abajur ao alcance da cama.' },
    { id: 'casa_barras', bom: 'sim', t: 'O banheiro tem barras de apoio no box e ao lado do vaso?', dica: 'Instale barras de apoio no box e ao lado do vaso. Não use toalheiro ou pia como apoio.' },
    { id: 'casa_piso', bom: 'sim', t: 'O box tem tapete de borracha ou fita antiderrapante?', dica: 'Coloque tapete de borracha ou fita antiderrapante no box. Um banquinho de banho firme também ajuda.' },
    { id: 'casa_escada', bom: 'sim', na: true, t: 'As escadas e os degraus têm corrimão e boa iluminação?', dica: 'Instale corrimão dos dois lados, ilumine bem e marque a borda dos degraus com fita colorida.' },
    { id: 'casa_alcance', bom: 'sim', t: 'Os objetos do dia a dia ficam fáceis de pegar, sem subir em banco nem se abaixar muito?', dica: 'Guarde o que usa todo dia entre a altura da cintura e dos ombros. Não suba em bancos ou cadeiras.' },
    { id: 'casa_calcado', bom: 'sim', t: 'Usa calçado fechado e antiderrapante dentro de casa?', dica: 'Troque chinelo e meia por calçado fechado, preso ao pé e com sola de borracha.' },
    { id: 'casa_animais', bom: 'nao', na: true, t: 'Há animais de estimação que passam entre os pés?', dica: 'Atenção com os animais: coloque um guizo na coleira e olhe o chão antes de andar.' },
    { id: 'casa_cama', bom: 'sim', t: 'Consegue sentar e levantar da cama e do sofá com facilidade?', dica: 'Camas e sofás muito baixos dificultam levantar. Ajuste a altura para os joelhos ficarem na altura do quadril.' }
  ],
  // Referência do teste de sentar e levantar em 30 s (valores abaixo destes indicam risco; STEADI, a partir de Rikli e Jones)
  SL_REF: {
    M: [[60, 14], [65, 12], [70, 12], [75, 11], [80, 10], [85, 8], [90, 7]],
    F: [[60, 12], [65, 11], [70, 10], [75, 10], [80, 9], [85, 8], [90, 4]]
  },
  ESTAGIOS: [
    ['Pés juntos', 'Pés lado a lado, encostados.'],
    ['Semi-tandem', 'O dedão de um pé encostado no meio do outro pé.'],
    ['Tandem', 'Um pé na frente do outro, o calcanhar encostado nos dedos.'],
    ['Apoio em uma perna', 'Em pé sobre uma perna só.']
  ],
  MARCHA: [['passos_curtos', 'Passos curtos ou arrastados'], ['desequilibrio', 'Perda de equilíbrio'], ['apoio', 'Apoiou em paredes ou móveis'], ['lento', 'Muito lento ou hesitante'], ['bracos', 'Não balança os braços']]
};
