import React, { useState, useEffect } from 'react';

const GetReportModal = ({ imageBase64 }) => {
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        // Actualizar la imagen cuando se monta el componente
        // eslint-disable-next-line no-undef
        $('#ReportImg').attr('src', `data:image/jpeg;base64,${imageBase64}`);
    }, [imageBase64]);

    const handleClose = () => {
        // Manejar el cierre del modal
        setShowModal(false);
    };

    return (
        <>
            {showModal && (
                <div className="modal" tabIndex="-1">
                    <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-body">
                                <img id="ReportImg" src="" width="100%" alt="Report" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GetReportModal;
