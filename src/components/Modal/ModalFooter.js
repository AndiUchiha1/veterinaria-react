import React from 'react'

export default function ModalFooter({ crearEntidad = () => { } }) {
  return (
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        data-dismiss="modal"
      >
        Cerrar
      </button>
      <button
        onClick={crearEntidad}
        type="button"
        className="btn btn-primary"
        data-dismiss="modal" id="btn-guardar"
      >
        Crear
      </button>
    </div>
  )
}
