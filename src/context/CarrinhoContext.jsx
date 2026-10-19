import { createContext, useContext, useEffect, useState } from 'react'

const CarrinhoContext = createContext()

export const useCarrinho = () => useContext(CarrinhoContext)

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => JSON.parse(localStorage.getItem('carrinho')) || [])

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(itens))
  }, [itens])

  function adicionar(item) {
    const chave = `${item.id}-${item.cor}`
    setItens(atual => {
      const existe = atual.find(i => i.chave === chave)
      if (!existe) return [...atual, { ...item, chave }]
      return atual.map(i => (i.chave === chave ? { ...i, qtd: i.qtd + item.qtd } : i))
    })
  }

  function alterarQtd(chave, qtd) {
    if (qtd < 1) return
    setItens(atual => atual.map(i => (i.chave === chave ? { ...i, qtd } : i)))
  }

  const remover = chave => setItens(atual => atual.filter(i => i.chave !== chave))
  const limpar = () => setItens([])

  const total = itens.reduce((soma, i) => soma + i.preco * i.qtd, 0)
  const quantidade = itens.reduce((soma, i) => soma + i.qtd, 0)

  return (
    <CarrinhoContext.Provider value={{ itens, adicionar, alterarQtd, remover, limpar, total, quantidade }}>
      {children}
    </CarrinhoContext.Provider>
  )
}
