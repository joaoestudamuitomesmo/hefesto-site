import { CONFIG } from './config.js'
import { classe, densidade, ehResina, fatorVelocidade, observacao } from './materiais.js'

const r2 = n => Math.round(n * 100) / 100

// Escolhe a orientação de impressão: a menor altura em que a peça cabe na mesa.
// Retorna { altura, largura, profundidade } em mm, ou null se não couber.
function orientar(dims, vol) {
  const [x, y] = [vol.x, vol.y]
  const candidatos = [0, 1, 2]
    .map(h => {
      const [a, b] = dims.filter((_, i) => i !== h)
      return { altura: dims[h], largura: Math.max(a, b), profundidade: Math.min(a, b) }
    })
    .sort((p, q) => p.altura - q.altura)

  return (
    candidatos.find(
      c =>
        c.altura <= vol.z &&
        c.largura <= Math.max(x, y) &&
        c.profundidade <= Math.min(x, y)
    ) ?? null
  )
}

function descontoPara(qtd) {
  return CONFIG.descontos.find(d => qtd >= d.min)?.taxa ?? 0
}

/**
 * Calcula a estimativa de preço de impressão.
 *
 * @param {object} p
 * @param {object} p.modelo        retorno de analisarModelo() (volume mm³, area mm², dims mm)
 * @param {object} p.material      item de materiais.json
 * @param {number} p.quantidade
 * @param {number} p.preenchimento 0–1 (só FDM)
 * @param {number} p.camada        mm (só FDM)
 * @param {number} p.escala        multiplicador linear da unidade do arquivo (1 = mm)
 */
export function calcularOrcamento({ modelo, material, quantidade, preenchimento, camada, escala = 1 }) {
  const qtd = Math.max(1, Math.floor(quantidade) || 1)
  const resina = ehResina(material.id)
  const proc = resina ? CONFIG.resina : CONFIG.fdm

  const volume = modelo.volume * escala ** 3 // mm³
  const area = modelo.area * escala ** 2 // mm²
  const dims = modelo.dims.map(d => d * escala)

  const pos = orientar(dims, proc.volume)
  if (!pos) {
    const v = proc.volume
    return {
      ok: false,
      motivo: `A peça (${dims.map(d => d.toFixed(0)).join(' × ')} mm) excede a área útil de ${v.x} × ${v.y} × ${v.z} mm. Ela precisará ser dividida, e o orçamento será feito manualmente.`,
    }
  }

  // ── Massa de material por peça ─────────────────────────────
  let volImpresso // mm³ efetivamente depositado/curado
  if (resina) {
    volImpresso = volume
  } else {
    const casca = Math.min(volume, area * proc.parede)
    volImpresso = casca + Math.max(0, volume - casca) * preenchimento
  }
  const gramasPeca = (volImpresso / 1000) * densidade(material.id) * (1 + proc.suporte) * (1 + CONFIG.desperdicioMaterial)
  const gramas = gramasPeca * qtd
  const custoMaterial = gramas * material.precoGrama

  // ── Tempo de máquina ───────────────────────────────────────
  let horas
  if (resina) {
    const camadas = pos.altura / CONFIG.resina.camada
    const tempoPlaca = (camadas * proc.segPorCamada) / 3600 + proc.overheadHoras
    // quantas peças cabem na mesma plataforma (imprimem em paralelo)
    const m = proc.margemPlaca
    const { x, y } = proc.volume
    const cabem = Math.max(
      Math.floor(x / (pos.largura + m)) * Math.floor(y / (pos.profundidade + m)),
      Math.floor(x / (pos.profundidade + m)) * Math.floor(y / (pos.largura + m)),
      1
    )
    horas = Math.ceil(qtd / cabem) * tempoPlaca
  } else {
    const fluxo = proc.fluxoRef * (camada / proc.camadaRef) * fatorVelocidade(material.id)
    const porVolume = volImpresso / fluxo
    const porCamada = ((pos.altura / camada) * proc.segPorCamada) / 3600
    horas = qtd * (Math.max(porVolume, porCamada) + proc.overheadHoras)
  }
  const custoMaquina = horas * CONFIG.taxaHora[classe(material.id)]

  // ── Preparo e acabamento ───────────────────────────────────
  const custoPreparo = proc.preparo + proc.acabamento * qtd

  // ── Composição do preço ────────────────────────────────────
  const m = 1 + CONFIG.margem
  const servicoMaquina = custoMaquina * m
  const servicoPreparo = custoPreparo * m
  let subtotal = custoMaterial + servicoMaquina + servicoPreparo

  const taxaDesc = descontoPara(qtd)
  const desconto = subtotal * taxaDesc
  let total = subtotal - desconto

  const minimoAplicado = total < CONFIG.pedidoMinimo
  if (minimoAplicado) total = CONFIG.pedidoMinimo

  const avisos = []
  const obs = observacao(material.id)
  if (obs) avisos.push(obs)
  if (minimoAplicado) avisos.push(`Aplicado o pedido mínimo de R$ ${CONFIG.pedidoMinimo},00.`)

  return {
    ok: true,
    total: r2(total),
    unitario: r2(total / qtd),
    quantidade: qtd,
    gramas: Math.round(gramas),
    horas: r2(horas),
    dims: dims.map(r2),
    minimoAplicado,
    descontoPercentual: taxaDesc,
    linhas: [
      { rotulo: `Material (~${Math.round(gramas)} g)`, valor: r2(custoMaterial) },
      { rotulo: `Impressão (~${horas.toFixed(1).replace('.', ',')} h)`, valor: r2(servicoMaquina) },
      { rotulo: 'Preparo e acabamento', valor: r2(servicoPreparo) },
      ...(taxaDesc ? [{ rotulo: `Desconto por quantidade (${taxaDesc * 100}%)`, valor: -r2(desconto) }] : []),
    ],
    avisos,
  }
}
