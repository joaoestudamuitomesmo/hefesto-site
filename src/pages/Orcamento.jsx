import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dados from '../data/materiais.json'
import { useCarrinho } from '../context/CarrinhoContext'
import { criarPedido, getUsuario } from '../storage'
import PaginaForm from '../components/PaginaForm'
import Formulario from '../components/Formulario'
import { Input, Select, Textarea } from '../components/Campos'
import Botao from '../components/Botao'
import Aviso from '../components/Aviso'
import Titulo from '../components/Titulo'
import styles from './Orcamento.module.css'

export default function Orcamento() {
  const navigate = useNavigate()
  const { itens, limpar } = useCarrinho()
  const usuario = getUsuario()
  const [materialId, setMaterialId] = useState(dados.materiais[0].id)

  const material = dados.materiais.find(m => m.id === materialId)

  function enviar(e) {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(e.target))
    const arquivo = form.arquivo?.name || ''
    const id = criarPedido({ ...form, arquivo, itens })
    limpar()
    navigate(`/confirmacao/${id}`)
  }

  return (
    <PaginaForm>
      <Titulo>Solicitação de orçamento</Titulo>
      <p>Envie seu modelo 3D e receba o orçamento por e-mail.</p>

      <Formulario onSubmit={enviar}>
        <Input name="nome" placeholder="Nome" defaultValue={usuario?.nome} required />
        <Input name="empresa" placeholder="Empresa" defaultValue={usuario?.empresa} />
        <Input name="email" type="email" placeholder="E-mail" defaultValue={usuario?.email} required />
        <Input name="telefone" placeholder="Telefone" />

        <Select name="servico">
          {dados.servicos.map(s => (
            <option key={s}>{s}</option>
          ))}
        </Select>
        <Select name="material" value={materialId} onChange={e => setMaterialId(e.target.value)}>
          {dados.materiais.map(m => (
            <option key={m.id} value={m.id}>{m.nome}</option>
          ))}
        </Select>
        <Select name="cor">
          {material.cores.map(c => (
            <option key={c.nome}>{c.nome}</option>
          ))}
        </Select>
        <Input name="quantidade" type="number" min="1" defaultValue="1" placeholder="Quantidade" />

        <label className={styles.upload}>
          .STL/.OBJ/.STEP
          <Input name="arquivo" type="file" accept=".stl,.obj,.step,.stp" required />
        </label>
        <Textarea name="mensagem" rows="5" placeholder="Mensagem" />

        {itens.length > 0 && <Aviso>{itens.length} item(ns) do carrinho serão incluídos.</Aviso>}
        <Botao>Enviar solicitação</Botao>
      </Formulario>
    </PaginaForm>
  )
}
