import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dados from '../data/materiais.json'
import { CONFIG } from '../pricing/config'
import { analisarModelo } from '../pricing/geometria'
import { calcularOrcamento } from '../pricing/calculo'
import { ehResina } from '../pricing/materiais'
import { useCarrinho } from '../context/CarrinhoContext'
import { criarPedido, getUsuario } from '../storage'
import PaginaForm from '../components/PaginaForm'
import Formulario from '../components/Formulario'
import { Input, Select, Textarea } from '../components/Campos'
import Botao from '../components/Botao'
import Aviso from '../components/Aviso'
import ResumoPreco from '../components/ResumoPreco'
import Titulo from '../components/Titulo'
import styles from './Orcamento.module.css'

export default function Orcamento() {
  const navigate = useNavigate()
  const { itens, limpar } = useCarrinho()
  const usuario = getUsuario()
  const [materialId, setMaterialId] = useState(dados.materiais[0].id)
  const [servico, setServico] = useState(dados.servicos[0])
  const [quantidade, setQuantidade] = useState(1)
  const [preenchimento, setPreenchimento] = useState(0.2)
  const [camada, setCamada] = useState(0.2)
  const [unidade, setUnidade] = useState('mm')
  const [modelo, setModelo] = useState(null)
  const [analisando, setAnalisando] = useState(false)

  const material = dados.materiais.find(m => m.id === materialId)
  const resina = ehResina(materialId)

  async function aoEscolherArquivo(e) {
    const arquivo = e.target.files[0]
    setModelo(null)
    if (!arquivo) return
    setAnalisando(true)
    try {
      setModelo(await analisarModelo(arquivo))
    } catch {
      setModelo({ suportado: true, erro: 'Não foi possível ler este arquivo.' })
    } finally {
      setAnalisando(false)
    }
  }

  // Resultado exibido no resumo de preço
  const estado = useMemo(() => {
    if (analisando) return { tipo: 'analisando' }
    if (!CONFIG.servicosCalculaveis.includes(servico))
      return { tipo: 'manual', mensagem: 'Este serviço é orçado manualmente pela nossa equipe após a análise do pedido.' }
    if (!modelo) return null
    if (!modelo.suportado)
      return {
        tipo: 'manual',
        mensagem: 'Não calculamos arquivos STEP automaticamente. Nossa equipe analisa o modelo e envia o valor por e-mail. Para ver uma estimativa na hora, envie em STL ou OBJ.',
      }
    if (modelo.erro) return { tipo: 'erro', mensagem: modelo.erro }

    const escala = CONFIG.unidades.find(u => u.valor === unidade).escala
    const calculo = calcularOrcamento({ modelo, material, quantidade, preenchimento, camada, escala })
    if (!calculo.ok) return { tipo: 'manual', mensagem: calculo.motivo }
    return { tipo: 'ok', calculo }
  }, [analisando, servico, modelo, material, quantidade, preenchimento, camada, unidade])

  function enviar(e) {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(e.target))
    const arquivo = form.arquivo?.name || ''
    const estimativa = estado?.tipo === 'ok' ? estado.calculo : null
    const id = criarPedido({ ...form, arquivo, itens, unidade, preenchimento, camada, estimativa })
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

        <Select name="servico" value={servico} onChange={e => setServico(e.target.value)}>
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
        <Input
          name="quantidade"
          type="number"
          min="1"
          value={quantidade}
          onChange={e => setQuantidade(Math.max(1, parseInt(e.target.value, 10) || 1))}
          placeholder="Quantidade"
        />

        {!resina && (
          <>
            <label className={styles.rotulo}>
              Preenchimento
              <Select name="preenchimento" value={preenchimento} onChange={e => setPreenchimento(+e.target.value)}>
                {CONFIG.opcoesFdm.preenchimento.map(o => (
                  <option key={o.valor} value={o.valor}>{o.rotulo}</option>
                ))}
              </Select>
            </label>
            <label className={styles.rotulo}>
              Altura da camada
              <Select name="camada" value={camada} onChange={e => setCamada(+e.target.value)}>
                {CONFIG.opcoesFdm.camada.map(o => (
                  <option key={o.valor} value={o.valor}>{o.rotulo}</option>
                ))}
              </Select>
            </label>
          </>
        )}

        <label className={styles.rotulo}>
          Unidade do arquivo 3D
          <Select name="unidade" value={unidade} onChange={e => setUnidade(e.target.value)}>
            {CONFIG.unidades.map(u => (
              <option key={u.valor} value={u.valor}>{u.rotulo}</option>
            ))}
          </Select>
        </label>

        <label className={styles.upload}>
          .STL/.OBJ
          <Input name="arquivo" type="file" accept=".stl,.obj" onChange={aoEscolherArquivo} required />
        </label>
        <Textarea name="mensagem" rows="5" placeholder="Mensagem" />

        <ResumoPreco estado={estado} />

        {itens.length > 0 && <Aviso>{itens.length} item(ns) do carrinho serão incluídos.</Aviso>}
        <Botao>Enviar solicitação</Botao>
      </Formulario>
    </PaginaForm>
  )
}
