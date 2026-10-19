import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { salvarUsuario } from '../storage'
import PaginaForm from '../components/PaginaForm'
import Formulario from '../components/Formulario'
import { Input } from '../components/Campos'
import Botao from '../components/Botao'
import Aviso from '../components/Aviso'
import styles from './Login.module.css'

export default function Login() {
  const navigate = useNavigate()
  const [aba, setAba] = useState('entrar')
  const [erro, setErro] = useState('')

  function enviar(e) {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(e.target))

    if (aba === 'cadastrar' && form.senha !== form.confirmar) {
      setErro('Senha incorreta.')
      return
    }

    salvarUsuario({ nome: form.nome || form.email, empresa: form.empresa, email: form.email })
    navigate('/area-do-cliente')
  }

  return (
    <PaginaForm>
      <div className={styles.abas}>
        <button className={aba === 'entrar' ? styles.ativa : ''} onClick={() => setAba('entrar')}>Entrar</button>
        <button className={aba === 'cadastrar' ? styles.ativa : ''} onClick={() => setAba('cadastrar')}>Cadastrar</button>
      </div>

      <Formulario onSubmit={enviar} key={aba}>
        {aba === 'cadastrar' && (
          <>
            <Input name="nome" placeholder="Nome" required />
            <Input name="empresa" placeholder="Empresa" />
          </>
        )}
        <Input name="email" type="email" placeholder="E-mail" required />
        {aba === 'cadastrar' && <Input name="telefone" placeholder="Telefone" />}
        <Input name="senha" type="password" placeholder="Senha" required />
        {aba === 'cadastrar' && <Input name="confirmar" type="password" placeholder="Confirmar senha" required />}

        {erro && <Aviso>{erro}</Aviso>}
        {aba === 'entrar' && <Botao type="button" variante="link">Esqueci a senha</Botao>}
        <Botao>{aba === 'entrar' ? 'Entrar' : 'Criar conta'}</Botao>
      </Formulario>
    </PaginaForm>
  )
}
