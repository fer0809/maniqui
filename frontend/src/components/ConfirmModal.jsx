function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className="modal modal-show">
      <div className="modal-content">
        <div className="modal-icon">⚠️</div>
        <h3>¿Confirmar Eliminación?</h3>
        <p>Esta acción no se puede deshacer. El maniquí se desarmará y sus piezas volverán al inventario.</p>
        <div className="modal-actions">
          <button className="btn btn-secondary-action" onClick={onClose}>Cancelar</button>
          <button className="btn btn-danger-action" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
