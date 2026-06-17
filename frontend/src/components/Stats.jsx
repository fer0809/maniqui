function Stats({ piezas }) {
  const disponibles = piezas.filter(p => p.estado === 'Disponible').length
  const ensambladas = piezas.length - disponibles

  return (
    <div className="stats-container">
      <div className="stat-card"><h3>Total</h3><p>{piezas.length}</p></div>
      <div className="stat-card"><h3>Libres</h3><p>{disponibles}</p></div>
      <div className="stat-card"><h3>Uso</h3><p>{ensambladas}</p></div>
    </div>
  )
}

export default Stats
