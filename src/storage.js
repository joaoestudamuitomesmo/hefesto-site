const ler = (chave, padrao) => JSON.parse(localStorage.getItem(chave)) ?? padrao

export const getUsuario = () => ler('usuario', null)
export const salvarUsuario = usuario => localStorage.setItem('usuario', JSON.stringify(usuario))
export const sairUsuario = () => localStorage.removeItem('usuario')

export const listarPedidos = () => ler('pedidos', [])

export function criarPedido(dados) {
  const pedidos = listarPedidos()
  const id = String(1000 + pedidos.length + 1)
  const pedido = { id, status: 'Em análise', data: new Date().toISOString(), ...dados }
  localStorage.setItem('pedidos', JSON.stringify([pedido, ...pedidos]))
  return id
}

export const buscarPedido = id => listarPedidos().find(p => p.id === id)

export const formatarPreco = valor =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
