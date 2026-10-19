import hero from '../assets/hero.png'
import Card from '../components/Card'
import ListaCards from '../components/ListaCards'
import Secao from '../components/Secao'
import Botao from '../components/Botao'
import TituloGrande from '../components/TituloGrande'
import styles from './Home.module.css'

import img1 from '../assets/servicos.png'
import img2 from '../assets/empresa.png'
import img3 from '../assets/solucao.jpg'

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <span>Hefesto</span>
        <h1>MANUFATURA</h1>
        <img src={hero} alt="Impressoras 3D" />
        <h1 className={styles.espacado}>A D I T I V A</h1>
        <a href="#empresa" className={styles.saibaMais}>
          <span className={styles.seta}>↓</span>
          Saiba Mais
        </a>
      </section>

      <Secao id="empresa">
        <h2 className={styles.tituloEsquerda}>Hefesto</h2>
        <ListaCards>
          <Card titulo="Empresa" imagem={img2}>
            Manufatura aditiva que une engenharia de precisão e sustentabilidade.
          </Card>
          <Card titulo="Serviços" imagem={img1}>Manufatura aditiva com impressão 3D</Card>
          <Card titulo="Solução" imagem={img3}>Redução do desperdício de material</Card>
        </ListaCards>
      </Secao>

      <Secao centro>
        <TituloGrande>Impressão</TituloGrande>
        <div className={styles.cta}>
          <h2>Começar a imprimir</h2>
          <Botao to="/orcamento">Orçamento</Botao>
        </div>
      </Secao>
    </>
  )
}
