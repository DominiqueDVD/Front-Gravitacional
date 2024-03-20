import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { abrirModal } from '../../redux/actions/modalActions';
import ModalInstruccion from './modalInstructivo';
import '../../styles/modalButton.css';

function BotonConModal() {
  // No necesitas utilizar el estado modalAbierto en este componente

  const dispatch = useDispatch();

  // Quitamos la función abrirModalHandler ya que no la necesitamos aquí

  return (
    <div className='informationButton'>
      {/* Utilizamos la función handleShowModal del componente ModalInstruccion */}
      <button onClick={ModalInstruccion.handleShowModal}>
        <i className="bi bi-menu-up fa-2x"></i>
      </button>
      {/* Eliminamos la condición para renderizar el ModalInstruccion */}
    </div>
  );
}

export default BotonConModal;
