function MannequinList({ maniquies, onDelete, onEdit }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {maniquies.map(m => (
          <tr key={m.id_maniqui}>
            <td><strong>{m.codigo_maniqui}</strong></td>
            <td>{new Date(m.fecha_ensamblaje).toLocaleDateString()}</td>
            <td>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button 
                  className="btn btn-refresh" 
                  style={{ padding: '5px 10px', fontSize: '0.75rem', marginBottom: 0 }}
                  onClick={() => onEdit(m)}
                >
                  ✏️
                </button>
                <button className="btn btn-delete" onClick={() => onDelete(m.id_maniqui)}>🗑</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MannequinList
