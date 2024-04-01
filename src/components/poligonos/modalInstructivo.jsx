import "../../styles/layout.css";
import imgModal from "../../assets/modalNuevo.png";
import "../../styles/modalInstructivo.css";
import React from "react";

const ContenidoModal = ({ onClose }) => {
  return (
    <div className="modal-container">
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Close"
      ></button>
      <img className="imgModal" src={imgModal}></img>
      
    </div>
  );
};

export default ContenidoModal;
