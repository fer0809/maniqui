function MannequinList({ maniquies, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Fecha</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {maniquies.map(m => (
          <tr key={m.id_maniqui}>
            <td><strong>{m.codigo_maniqui}</strong></td>
            <td>{new Date(m.fecha_ensamblaje).toLocaleDateString()}</td>
            <td>
              <button className="btn btn-delete" onClick={() => onDelete(m.id_maniqui)}>🗑 Borrar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MannequinList
