import { useState } from 'react'
import Secao from '../components/Secao'
import Formulario from '../components/Formulario'
import { Input, Textarea } from '../components/Campos'
import Botao from '../components/Botao'
import Aviso from '../components/Aviso'
import Titulo from '../components/Titulo'
import styles from './Contato.module.css'

const perguntas = [
  {
    pergunta: 'Quais formatos de arquivo vocês aceitam?',
    resposta: 'STL, OBJ e STEP. O sistema valida a geometria antes de gerar o orçamento.'
  },
  {
    pergunta: 'Existe quantidade mínima?',
    resposta: 'Não. Fazemos desde uma única peça até pequenos lotes.'
  },
  {
    pergunta: 'Como funciona a logística reversa?',
    resposta: 'Você nos envia sobras plásticas e carretéis vazios e recebe créditos para abater nos próximos orçamentos.'
  },
  {
    pergunta: 'Qual a diferença entre a linha virgem e a Eco-Tech?',
    resposta: 'A Eco-Tech é feita de material reprocessado internamente, com custo por grama menor e resistência técnica certificada.'
  }
]

export default function Contato() {
  const [aberta, setAberta] = useState(null)
  const [enviado, setEnviado] = useState(false)

  function enviar(e) {
    e.preventDefault()
    setEnviado(true)
    e.target.reset()
  }

  return (
    <Secao className={styles.contato}>
      <div>
        <Titulo>Contato</Titulo>
        <Formulario onSubmit={enviar}>
          <Input name="nome" placeholder="Nome" required />
          <Input name="email" type="email" placeholder="E-mail" required />
          <Textarea name="mensagem" rows="6" placeholder="Mensagem" required />
          <Botao>Enviar</Botao>
          {enviado && <Aviso>Mensagem enviada.</Aviso>}
        </Formulario>
      </div>

      <div>
        <Titulo>FAQ</Titulo>
        {perguntas.map((p, i) => (
          <div className={styles.faq} key={p.pergunta}>
            <button onClick={() => setAberta(aberta === i ? null : i)}>
              {p.pergunta}
              <span>{aberta === i ? '−' : '+'}</span>
            </button>
            {aberta === i && <p>{p.resposta}</p>}
          </div>
        ))}
      </div>
    </Secao>
  )
}
