import React, { useState } from 'react';
import ContenidoModal from './modalInstructivo';
import '../../styles/modalButton.css'

const ButtonModal = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='informationButton'>
           <button className='buttonModal'  onClick={openModal}>
        <i className="bi bi-menu-up fa-2x"></i>
      </button>
      {showModal && (
        <ContenidoModal
   
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ButtonModal;
