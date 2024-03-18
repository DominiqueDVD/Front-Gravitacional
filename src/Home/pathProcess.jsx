import React from 'react';

const PathProcessModal = ({ polygons }) => {
    return (
        <div className="modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-scrollable modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Polígonos creados</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Polígono</th>
                                    <th scope="col">Punto</th>
                                    <th scope="col">Latitud</th>
                                    <th scope="col">Longitud</th>
                                </tr>
                            </thead>
                            <tbody>
                                {polygons.map((path, i) => (
                                    path.map((point, j) => (
                                        <tr key={`${i}-${j}`}>
                                            <td>Polígono {i + 1}</td>
                                            <td>Punto {j + 1}</td>
                                            <td>{point.lat}</td>
                                            <td>{point.lng}</td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PathProcessModal;
