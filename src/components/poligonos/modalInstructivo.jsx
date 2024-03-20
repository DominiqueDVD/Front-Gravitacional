// ModalInstruccion.jsx
import React, { useState } from 'react';
import '../../styles/layout.css';
import imagen1 from '../../assets/gravitacional_mod_escorrentias.png';
import imagen2 from '../../assets/icons_actions.png';
import '../../styles/modalInstructivo.css';

const ModalInstruccion = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className={`modal fade right ${showModal ? 'show' : ''}`} id="menuModal" tabIndex="-1" aria-labelledby="menuModal" aria-hidden={!showModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">DISEÑO HIDROLOGICO DEL PAISAJE</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ padding: '5px' }}>
                        <table className="table table-bordered">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">QUE ES GRAVITACIONAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="table-secondary">
                                    <td style={{ fontSize: '12px' }}>
                                        El diseño hidrológico es una técnica para maximizar el uso beneficioso de los recursos hídricos de un área de tierra. Se refiere a un a intervención topográfica específica ligada al flijo de agua de lluvia.<br />&nbsp;
                                        <img src={imagen1} width="100%" height="100%" alt="imagen1" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="table table-bordered">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">COMO FUNCIONA LA PLATAFORMA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="table-secondary">
                                    <td style={{ fontSize: '12px' }}>
                                        <img src={imagen2} width="80%" height="80%" alt="imagen2" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalInstruccion;
