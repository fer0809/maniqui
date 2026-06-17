function InventoryTable({ piezas }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Serie</th>
          <th>Tipo</th>
          <th>Material</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {piezas.map(p => (
          <tr key={p.id_pieza}>
            <td><strong>{p.numero_serie}</strong></td>
            <td>{p.tipo_pieza}</td>
            <td>{p.material}</td>
            <td>
              <span className={`status-badge ${p.estado === 'Disponible' ? 'status-disponible' : 'status-ensamblado'}`}>
                {p.estado}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default InventoryTable
