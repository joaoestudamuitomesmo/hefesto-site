import Card from '../components/Card'
import ListaCards from '../components/ListaCards'
import Secao from '../components/Secao'
import Botao from '../components/Botao'
import TituloGrande from '../components/TituloGrande'

import img1 from '../assets/sol1.jpg'
import img2 from '../assets/sol2.jpg'
import img3 from '../assets/sol3.jpg'
import img4 from '../assets/sol4.jpg'

export default function Solucoes() {
  return (
    <Secao centro>
      <TituloGrande>Soluções</TituloGrande>
      <ListaCards>
        <Card titulo="Prototipagem rápida" imagem={img3}>
          Valide o projeto em dias, sem molde e sem quantidade mínima.
        </Card>
        <Card titulo="Peças sob demanda" imagem={img1}>
          Produza só o que precisa, sem estoque e sem custo de armazenagem.
        </Card>
        <Card titulo="Peças de reposição" imagem={img2}>
          Substitua componentes descontinuados ou difíceis de encontrar.
        </Card>
        <Card titulo="Linha eco-tech reciclada"imagem= {img4}>
          Filamento Eco-Tech com menor custo por grama e reduz desperdício.
        </Card>
      </ListaCards>
      <Botao to="/orcamento">Solicitar orçamento</Botao>
    </Secao>
  )
}
