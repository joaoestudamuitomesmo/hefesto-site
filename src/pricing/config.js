// ─────────────────────────────────────────────────────────────
// Parâmetros de precificação da Hefesto.
// Tudo que influencia o preço fica aqui: ajuste os números conforme
// o custo real da operação, sem mexer na lógica de cálculo.
// ─────────────────────────────────────────────────────────────

export const CONFIG = {
  // Serviços do formulário que têm preço calculável por geometria.
  // Os demais (CAD, digitalização, esterilização...) são cotados manualmente.
  servicosCalculaveis: [
    'Impressão 3D FDM',
    'Impressão 3D Resina (SLA/DLP/LCD)',
    'Prototipagem Rápida',
    'Peças Sob Demanda',
    'Peças de Reposição Industrial',
    'Produção em Pequenas Séries',
  ],

  // Fração do preço/g do materiais.json tratada como preço final de material.
  // O material é cobrado a preço de tabela, sem margem extra (a margem
  // incide só sobre máquina, preparo e acabamento).
  desperdicioMaterial: 0.05, // purga, brim, falhas parciais

  fdm: {
    volume: { x: 250, y: 250, z: 250 }, // mm, área útil da impressora
    parede: 1.2, // mm de casca externa (perímetros + topo/base)
    fluxoRef: 21600, // mm³/h de material depositado com camada de 0,2 mm (6 mm³/s)
    camadaRef: 0.2, // mm
    segPorCamada: 8, // s de troca de camada/resfriamento (limita peças altas e finas)
    overheadHoras: 0.25, // aquecimento, primeira camada, remoção da mesa
    suporte: 0.05, // acréscimo médio de material por suportes
    preparo: 15, // R$ por pedido: validação do modelo, fatiamento, setup
    acabamento: 4, // R$ por peça: remoção de suportes e limpeza
  },

  resina: {
    volume: { x: 192, y: 120, z: 200 }, // mm
    camada: 0.05, // mm
    segPorCamada: 8, // s por camada (exposição + peel)
    overheadHoras: 0.3,
    suporte: 0.2, // acréscimo de resina por suportes e base
    margemPlaca: 8, // mm de folga entre peças e bordas na plataforma
    preparo: 20,
    acabamento: 8, // R$ por peça: lavagem em IPA + cura UV
  },

  // R$ por hora de máquina, por classe de material
  taxaHora: {
    padrao: 8, // PLA, PETG, etc.
    tecnico: 12, // ABS, ASA, nylon, PC, TPU, PP, compósitos...
    altaTemp: 35, // PEEK, PEKK, PEI, PPS, PVDF
    resina: 12,
  },

  margem: 0.35, // sobre máquina + preparo + acabamento

  // Desconto por quantidade (aplicado ao total). Do maior para o menor.
  descontos: [
    { min: 50, taxa: 0.15 },
    { min: 25, taxa: 0.1 },
    { min: 10, taxa: 0.05 },
  ],

  pedidoMinimo: 40, // R$

  opcoesFdm: {
    preenchimento: [
      { valor: 0.15, rotulo: '15% (leve)' },
      { valor: 0.2, rotulo: '20% (padrão)' },
      { valor: 0.5, rotulo: '50% (reforçado)' },
      { valor: 1, rotulo: '100% (maciço)' },
    ],
    camada: [
      { valor: 0.12, rotulo: '0,12 mm (acabamento fino)' },
      { valor: 0.2, rotulo: '0,20 mm (padrão)' },
      { valor: 0.28, rotulo: '0,28 mm (rápido)' },
    ],
  },

  unidades: [
    { valor: 'mm', rotulo: 'Milímetros (padrão)', escala: 1 },
    { valor: 'cm', rotulo: 'Centímetros', escala: 10 },
    { valor: 'pol', rotulo: 'Polegadas', escala: 25.4 },
  ],
}
