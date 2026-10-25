// Leitura de modelos 3D no navegador (STL binário/ASCII e OBJ) para obter
// volume, área de superfície e dimensões. Todas as medidas em mm³, mm² e mm
// supondo que o arquivo está em milímetros (a escala é aplicada depois).
// STEP/STP é um formato B-Rep e exige um kernel CAD: não é lido aqui.

function acumulador() {
  let ref = null
  let volume = 0
  let area = 0
  let triangulos = 0
  const min = [Infinity, Infinity, Infinity]
  const max = [-Infinity, -Infinity, -Infinity]

  function tri(ax, ay, az, bx, by, bz, cx, cy, cz) {
    if (!ref) ref = [ax, ay, az] // origem local: evita erro numérico em modelos longe da origem
    const [rx, ry, rz] = ref
    const a0 = ax - rx, a1 = ay - ry, a2 = az - rz
    const b0 = bx - rx, b1 = by - ry, b2 = bz - rz
    const c0 = cx - rx, c1 = cy - ry, c2 = cz - rz

    // volume com sinal do tetraedro (origem, a, b, c)
    volume += (a0 * (b1 * c2 - b2 * c1) - a1 * (b0 * c2 - b2 * c0) + a2 * (b0 * c1 - b1 * c0)) / 6

    // área do triângulo
    const u0 = b0 - a0, u1 = b1 - a1, u2 = b2 - a2
    const v0 = c0 - a0, v1 = c1 - a1, v2 = c2 - a2
    const x = u1 * v2 - u2 * v1
    const y = u2 * v0 - u0 * v2
    const z = u0 * v1 - u1 * v0
    area += 0.5 * Math.sqrt(x * x + y * y + z * z)

    for (const [px, py, pz] of [[ax, ay, az], [bx, by, bz], [cx, cy, cz]]) {
      if (px < min[0]) min[0] = px
      if (py < min[1]) min[1] = py
      if (pz < min[2]) min[2] = pz
      if (px > max[0]) max[0] = px
      if (py > max[1]) max[1] = py
      if (pz > max[2]) max[2] = pz
    }
    triangulos++
  }

  function resultado() {
    return {
      triangulos,
      volume: Math.abs(volume),
      area,
      dims: triangulos ? [max[0] - min[0], max[1] - min[1], max[2] - min[2]] : [0, 0, 0],
    }
  }

  return { tri, resultado }
}

function lerStlBinario(buffer, acc) {
  const view = new DataView(buffer)
  const n = view.getUint32(80, true)
  let o = 84
  for (let i = 0; i < n; i++, o += 50) {
    const f = k => view.getFloat32(o + 12 + k * 4, true) // pula a normal (12 bytes)
    acc.tri(f(0), f(1), f(2), f(3), f(4), f(5), f(6), f(7), f(8))
  }
}

function lerStlAscii(texto, acc) {
  const re = /vertex\s+([-+0-9.eE]+)\s+([-+0-9.eE]+)\s+([-+0-9.eE]+)/g
  let m
  let buf = []
  while ((m = re.exec(texto))) {
    buf.push(+m[1], +m[2], +m[3])
    if (buf.length === 9) {
      acc.tri(...buf)
      buf = []
    }
  }
}

function lerObj(texto, acc) {
  const v = [] // coordenadas achatadas x,y,z
  for (const linha of texto.split(/\r?\n/)) {
    if (linha.startsWith('v ')) {
      const p = linha.trim().split(/\s+/)
      v.push(+p[1], +p[2], +p[3])
    } else if (linha.startsWith('f ')) {
      const total = v.length / 3
      const idx = linha
        .trim()
        .split(/\s+/)
        .slice(1)
        .map(t => {
          const i = parseInt(t, 10) // aceita "1", "1/2", "1//3", "1/2/3"
          return (i < 0 ? total + i : i - 1) * 3
        })
      for (let k = 1; k < idx.length - 1; k++) {
        const a = idx[0], b = idx[k], c = idx[k + 1]
        acc.tri(v[a], v[a + 1], v[a + 2], v[b], v[b + 1], v[b + 2], v[c], v[c + 1], v[c + 2])
      }
    }
  }
}

export async function analisarModelo(arquivo) {
  const ext = arquivo.name.split('.').pop().toLowerCase()

  if (ext === 'step' || ext === 'stp') return { formato: 'step', suportado: false }
  if (ext !== 'stl' && ext !== 'obj') return { formato: ext, suportado: false }

  const acc = acumulador()
  const buffer = await arquivo.arrayBuffer()

  if (ext === 'stl') {
    const binario = buffer.byteLength >= 84 && 84 + new DataView(buffer).getUint32(80, true) * 50 === buffer.byteLength
    if (binario) lerStlBinario(buffer, acc)
    else lerStlAscii(new TextDecoder().decode(buffer), acc)
  } else {
    lerObj(new TextDecoder().decode(buffer), acc)
  }

  const r = acc.resultado()
  if (r.triangulos === 0 || r.volume <= 0) {
    return { formato: ext, suportado: true, erro: 'Não foi possível ler a geometria deste arquivo.' }
  }
  return { formato: ext, suportado: true, ...r }
}
