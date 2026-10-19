import Secao from '../components/Secao'
import styles from './Sobre.module.css'

const valores = [
  {
    titulo: 'Economia Circular & Desperdício Zero',
    textos: [
      'Na Hefesto, nenhum grama de polímero é perdido. Mantemos um centro interno de moagem e extrusão que recupera sobras de produção, protótipos antigos e falhas de impressão. Esse material reciclado volta para a linha de produção em forma de filamento técnico, mantendo as propriedades mecânicas da peça e garantindo um impacto ambiental positivo.'
    ]
  },
  {
    titulo: 'Redução Real de Custos',
    textos: [
      'Ao reincorporar matéria-prima reciclada no processo fabril, reduzimos os custos com insumos em até 20% para nossos clientes. Além disso, criamos o programa de Logística Reversa Inteligente: ao nos enviar sobras plásticas e carretéis vazios, sua empresa acumula créditos diretos em carteira para abater nos próximos orçamentos.'
    ]
  },
  {
    titulo: 'Ecossistema Digital Integrado',
    textos: [
      'Plataforma Web (Engenharia & Cotação): envie seus arquivos CAD em segundos, selecione materiais, visualize o fatiamento em 360° e receba um orçamento instantâneo.',
      'Aplicativo Mobile (Gestão & Acompanhamento): acompanhe o status da sua produção em tempo real, gerencie coletas de logística reversa e acesse relatórios de impacto ambiental (Métricas ESG) da sua empresa.'
    ]
  }
]

const passos = [
  { titulo: 'Envio do Arquivo 3D', texto: 'Faça o upload do seu modelo nos formatos STL, OBJ ou STEP.' },
  { titulo: 'Configuração & Cotação', texto: 'Escolha a tecnologia, o preenchimento (infill) e o tipo de material (virgem ou reciclado). O sistema valida a geometria e calcula o preço na hora.' },
  { titulo: 'Produção Sustentável', texto: 'O projeto é alocado em nosso parque de impressoras, com insumos eficientes e o mínimo de resíduo.' },
  { titulo: 'Rastreio via App', texto: 'Acompanhe fatiamento, impressão, acabamento e expedição pelo smartphone.' },
  { titulo: 'Logística Reversa & Créditos', texto: 'Envie de volta suportes descartados e sobras para converter quilos de plástico em desconto.' }
]

export default function Sobre() {
  return (
    <Secao className={styles.texto}>
      <div className={styles.intro}>
        <h1>Quem Somos?</h1>
        <p>
          Inspirada na figura mitológica do deus grego da forja, da tecnologia e da arte de moldar a
          matéria, a Hefesto é uma empresa de manufatura aditiva que une engenharia de precisão e
          sustentabilidade. Nascemos com o propósito de transformar a relação da indústria com a
          fabricação de peças e protótipos, eliminando os dois maiores gargalos da impressão 3D
          tradicional: o alto custo de produção e o descarte desenfreado de insumos.
        </p>
      </div>

      <div>
        <h2 className={styles.titulo}>Nossa Proposta de Valor</h2>
        <div className={styles.grade}>
          {valores.map((v, i) => (
            <article className={styles.card} key={v.titulo}>
              <span className={styles.numero}>{i + 1}</span>
              <h3>{v.titulo}</h3>
              {v.textos.map(t => (
                <p key={t}>{t}</p>
              ))}
            </article>
          ))}
        </div>
      </div>

      <div>
        <h2 className={styles.titulo}>Como funciona?</h2>
        <ol className={styles.passos}>
          {passos.map(p => (
            <li key={p.titulo}>
              <strong>{p.titulo}</strong>
              <span>{p.texto}</span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className={styles.titulo}>Materiais</h2>
        <div className={styles.materiais}>
          <article className={styles.card}>
            <h3>Linha Virgem Técnica</h3>
            <p>ABS, PLA, PETG, Nylon, TPU (flexível) e polímeros reforçados com fibra de carbono.</p>
          </article>
          <article className={styles.card}>
            <h3>Linha Hefesto Eco-Tech</h3>
            <span className={styles.tag}>100% reciclada</span>
            <p>
              Filamentos reprocessados internamente com certificação de resistência técnica, com
              menor custo por grama sem perda de performance.
            </p>
          </article>
        </div>
      </div>
    </Secao>
  )
}