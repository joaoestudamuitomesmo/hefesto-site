import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Produtos from './pages/Produtos'
import DetalheProduto from './pages/DetalheProduto'
import Solucoes from './pages/Solucoes'
import Sobre from './pages/Sobre'
import Orcamento from './pages/Orcamento'
import Carrinho from './pages/Carrinho'
import Contato from './pages/Contato'
import Login from './pages/Login'
import AreaCliente from './pages/AreaCliente'
import Confirmacao from './pages/Confirmacao'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/:id" element={<DetalheProduto />} />
          <Route path="/solucoes" element={<Solucoes />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<Login />} />
          <Route path="/area-do-cliente" element={<AreaCliente />} />
          <Route path="/confirmacao/:id" element={<Confirmacao />} />
        </Routes>
      </main>
    </>
  )
}
