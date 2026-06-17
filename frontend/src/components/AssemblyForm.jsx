import { useState, useEffect } from 'react'

function AssemblyForm({ piezas, onSuccess, onError, editingManiqui, onCancelEdit }) {
  const [formData, setFormData] = useState({
    numero_serie: '',
    id_cabeza: '',
    id_torso: '',
    id_brazos: '',
    id_piernas: ''
  })

  useEffect(() => {
    if (editingManiqui) {
      setFormData({
        numero_serie: editingManiqui.codigo_maniqui,
        id_cabeza: editingManiqui.id_cabeza,
        id_torso: editingManiqui.id_torso,
        id_brazos: editingManiqui.id_brazos,
        id_piernas: editingManiqui.id_piernas
      })
    } else {
      setFormData({
        numero_serie: '',
        id_cabeza: '',
        id_torso: '',
        id_brazos: '',
        id_piernas: ''
      })
    }
  }, [editingManiqui])

  const types = ['Cabeza', 'Torso', 'Brazos', 'Piernas']

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (Object.values(formData).some(val => val === '')) {
      onError('❌ Por favor completa todos los campos')
      return
    }

    const data = {
      numero_serie: formData.numero_serie,
      id_cabeza: parseInt(formData.id_cabeza),
      id_torso: parseInt(formData.id_torso),
      id_brazos: parseInt(formData.id_brazos),
      id_piernas: parseInt(formData.id_piernas)
    }

    const url = editingManiqui 
      ? `http://localhost:3000/api/maniquies/${editingManiqui.id_maniqui}`
      : 'http://localhost:3000/api/maniquies'
    
    const method = editingManiqui ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        setFormData({ numero_serie: '', id_cabeza: '', id_torso: '', id_brazos: '', id_piernas: '' })
        onSuccess(editingManiqui ? '✅ Actualizado' : '✅ Creado')
      } else {
        const errorData = await response.json()
        onError(`❌ Error: ${errorData.error}`)
      }
    } catch (error) {
      onError('❌ Error de conexión')
    }
  }

  return (
    <form id="assemble-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Código del Maniquí</label>
        <input 
          type="text" 
          id="numero_serie" 
          placeholder="Ej: MQ-2026-X" 
          value={formData.numero_serie}
          onChange={handleChange}
          required 
        />
      </div>
      
      {types.map(type => {
        const currentPieceId = editingManiqui ? editingManiqui[`id_${type.toLowerCase()}`] : null;
        return (
          <div className="form-group" key={type}>
            <label>Seleccionar {type}</label>
            <select 
              id={`id_${type.toLowerCase()}`} 
              value={formData[`id_${type.toLowerCase()}`]}
              onChange={handleChange}
              required
            >
              <option value="">-- Seleccionar {type} --</option>
              {piezas
                .filter(p => p.tipo_pieza === type && (p.estado === 'Disponible' || p.id_pieza === currentPieceId))
                .map(p => (
                  <option key={p.id_pieza} value={p.id_pieza}>
                    {p.numero_serie} ({p.material}) {p.id_pieza === currentPieceId ? '(Actual)' : ''}
                  </option>
                ))
              }
            </select>
          </div>
        )
      })}

      <button type="submit" className="btn btn-primary">
        {editingManiqui ? '💾 Guardar Cambios' : '🔨 Crear Maniquí'}
      </button>
      
      {editingManiqui && (
        <button 
          type="button" 
          className="btn btn-secondary-action" 
          style={{ marginTop: '10px', width: '100%' }}
          onClick={onCancelEdit}
        >
          Cancelar Edición
        </button>
      )}
    </form>
  )
}

export default AssemblyForm
