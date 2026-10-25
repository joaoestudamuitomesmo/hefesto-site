// Propriedades físicas e de processo por material.
// Densidades em g/cm³ (valores típicos de ficha técnica; ajuste se
// o seu fornecedor informar outro valor). A primeira regra que casar vence.

const DENSIDADES = [
  [/^resina/, 1.1],
  [/316l/, 5.0],
  [/^metal-(copper|bronze)$/, 4.0],
  [/^metal-/, 2.0], // PLA carregado com cobre/latão/ferro
  [/peek-cf/, 1.4],
  [/peek-gf/, 1.5],
  [/peek|pekk/, 1.3],
  [/pei/, 1.28],
  [/pps-cf/, 1.45],
  [/pps/, 1.35],
  [/pvdf/, 1.78],
  [/^pom/, 1.41],
  [/pbt-gf/, 1.5],
  [/pbt/, 1.31],
  [/pp-gf/, 1.1],
  [/^pp$/, 0.9],
  [/pc-cf/, 1.25],
  [/pc-gf/, 1.35],
  [/pc-abs/, 1.15],
  [/^pc-|policarbonato/, 1.2],
  [/nylon-gf|nylon-pa12-gf30/, 1.3],
  [/nylon-pa6-cf|fibra-de-carbono/, 1.2],
  [/pa11/, 1.03],
  [/pa612/, 1.06],
  [/pa6/, 1.14],
  [/eco-nylon/, 1.1],
  [/nylon/, 1.01],
  [/^tpe|^tpc/, 1.15],
  [/tpu/, 1.2],
  [/abs-gf/, 1.18],
  [/abs-esd/, 1.1],
  [/asa-cf/, 1.15],
  [/asa/, 1.07],
  [/abs/, 1.05],
  [/petg-gf/, 1.35],
  [/petg-cf|petg-esd/, 1.3],
  [/petg/, 1.27],
  [/pla-wood/, 1.2],
  [/pla-cf/, 1.3],
  [/pla-gf/, 1.35],
  [/pva|bvoh/, 1.2],
  [/hips/, 1.04],
  [/pla/, 1.24],
]

// Fator de velocidade de impressão (1 = PLA). Materiais difíceis imprimem mais devagar.
const VELOCIDADES = [
  [/peek|pekk|pei|pps|pvdf|pom/, 0.45],
  [/tpu|tpe|tpc/, 0.4],
  [/metal-/, 0.5],
  [/nylon|pc|pbt|^pp/, 0.7],
  [/-cf|-gf|fibra/, 0.8],
  [/abs|asa|hips/, 0.9],
]

export function densidade(id) {
  return (DENSIDADES.find(([re]) => re.test(id)) ?? [null, 1.25])[1]
}

export function fatorVelocidade(id) {
  return (VELOCIDADES.find(([re]) => re.test(id)) ?? [null, 1])[1]
}

export const ehResina = id => id.startsWith('resina')

export function classe(id) {
  if (ehResina(id)) return 'resina'
  if (/peek|pekk|pei|pps|pvdf/.test(id)) return 'altaTemp'
  if (/^pla|^petg|^eco-(pla|petg)|^metal-.*fill/.test(id)) return 'padrao'
  return 'tecnico'
}

export function observacao(id) {
  if (/316l|^metal-(copper|bronze)$/.test(id))
    return 'Valor refere-se apenas à impressão. Debinding e sinterização são cotados à parte.'
  if (id === 'resina-dental')
    return 'Aplicações odontológicas/cirúrgicas passam por validação adicional antes da confirmação.'
  return null
}
