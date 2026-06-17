import { useState, useEffect } from 'react'
import Stats from './components/Stats'
import InventoryTable from './components/InventoryTable'
import MannequinList from './components/MannequinList'
import AssemblyForm from './components/AssemblyForm'
import ConfirmModal from './components/ConfirmModal'

const API_URL = 'http://localhost:3000/api'

function App() {
  const [piezas, setPiezas] = useState([])
  const [maniquies, setManiquies] = useState([])
  const [message, setMessage] = useState({ text: '', isError: false, visible: false })
  const [modalOpen, setModalOpen] = useState(false)
  const [maniquiToDelete, setManiquiToDelete] = useState(null)

  const loadData = async () => {
    try {
      const [respPiezas, respManiquis] = await Promise.all([
        fetch(`${API_URL}/piezas`),
        fetch(`${API_URL}/maniquies`)
      ])
      const dataPiezas = await respPiezas.json()
      const dataManiquis = await respManiquis.json()
      setPiezas(dataPiezas)
      setManiquies(dataManiquis)
    } catch (error) {
      showMsg('Error al conectar con el servidor', true)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const showMsg = (text, isError = false) => {
    setMessage({ text, isError, visible: true })
    setTimeout(() => setMessage(prev => ({ ...prev, visible: false })), 3000)
  }

  const handleDeleteRequest = (id) => {
    setManiquiToDelete(id)
    setModalOpen(true)
  }

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/maniquies/${maniquiToDelete}`, { method: 'DELETE' })
      if (response.ok) {
        loadData()
        showMsg('✅ Eliminado')
      }
    } catch (error) {
      showMsg('❌ Error al borrar', true)
    } finally {
      setModalOpen(false)
      setManiquiToDelete(null)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Fábrica de Maniquíes - Gestión Pro</h1>
      </header>

      <main>
        <div className="grid-layout">
          <div className="left-col">
            <div className="card">
              <div className="card-header">
                <h2>Inventario de Piezas</h2>
                <button className="btn btn-refresh" onClick={loadData}>🔄 Actualizar</button>
              </div>
              
              <Stats piezas={piezas} />

              <div className="table-container">
                <InventoryTable piezas={piezas} />
              </div>
            </div>

            <div className="card">
              <h2>Maniquíes Ensamblados</h2>
              <div className="table-container-small">
                <MannequinList maniquies={maniquies} onDelete={handleDeleteRequest} />
              </div>
            </div>
          </div>

          <div className="right-col">
            <div className="card">
              <h2>Ensamblar Maniquí</h2>
              <AssemblyForm 
                piezas={piezas} 
                onSuccess={() => {
                  loadData()
                  showMsg('✅ Creado')
                }} 
                onError={(err) => showMsg(err, true)}
              />
              <div id="message" className={message.visible ? `message-visible ${message.isError ? 'message-error' : 'message-success'}` : ''}>
                {message.text}
              </div>
            </div>
          </div>
        </div>
      </main>

      <ConfirmModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={confirmDelete} 
      />
    </div>
  )
}

export default App
