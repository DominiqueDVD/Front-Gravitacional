import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/herramientas2.css'

const AnalisisGeografico = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleClick = (component) => {
        setSelectedComponent(component);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Columna izquierda */}
                <div className="col-md-3 p-3 bg-light">
                    <ul className="list-group">

                        <li className="list-group-item" onClick={() => handleClick('Tipología de suelos')}>Tipología de suelos</li>

                        <li className="list-group-item" onClick={() => handleClick('Infromación meteorológica Meteomatics')}>Infromación meteorológica Meteomatics</li>

                        <li className="list-group-item" onClick={() => handleClick('Información topográfica')}>Información topográfica</li>
                       
                        <li className="list-group-item" onClick={() => handleClick('Índices NDVI y otros índices de EOS')}>Patrón de diseño hidrológico</li>
                       
                        
                    </ul>
                </div>

                {/* Columna derecha */}
                <div className="col-md-9 p-3">
                    {selectedComponent ? (
                        <div>
                            <h2>{selectedComponent}</h2>
                        </div>
                    ) : (
                        <p>Selecciona un ítem de la lista para ver el contenido</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalisisGeografico;
