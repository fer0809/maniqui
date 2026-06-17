import { useState } from 'react'

function AssemblyForm({ piezas, onSuccess, onError }) {
  const [formData, setFormData] = useState({
    numero_serie: '',
    id_cabeza: '',
    id_torso: '',
    id_brazos: '',
    id_piernas: ''
  })

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

    try {
      const response = await fetch('http://localhost:3000/api/maniquies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        setFormData({
          numero_serie: '',
          id_cabeza: '',
          id_torso: '',
          id_brazos: '',
          id_piernas: ''
        })
        onSuccess()
      } else {
        onError('❌ Error al crear maniquí')
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
      
      {types.map(type => (
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
              .filter(p => p.tipo_pieza === type && p.estado === 'Disponible')
              .map(p => (
                <option key={p.id_pieza} value={p.id_pieza}>
                  {p.numero_serie} ({p.material})
                </option>
              ))
            }
          </select>
        </div>
      ))}

      <button type="submit" className="btn btn-primary">🔨 Crear Maniquí</button>
    </form>
  )
}

export default AssemblyForm
