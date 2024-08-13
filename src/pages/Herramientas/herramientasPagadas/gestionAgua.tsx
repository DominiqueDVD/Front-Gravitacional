import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/herramientas2.css';

const GestionAgua = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleClick = (component) => {
        setSelectedComponent(component);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Columna izquierda */}
                <div className="col-md-3 p-3 bg-light">
<br />
                    <h4>
                    Herramientas Específicas para la Gestión de Agua
                    </h4>
                    <br />
                    <ul className="list-group">
                        <li 
                            className={`list-group-item ${selectedComponent === 'Zonas vulnerables a anegamientos' ? 'selected' : ''}`} 
                            onClick={() => handleClick('Zonas vulnerables a anegamientos')}
                        >
                            Zonas vulnerables a anegamientos
                        </li>
                        <li 
                            className={`list-group-item ${selectedComponent === 'Cálculo de balance hídrico' ? 'selected' : ''}`} 
                            onClick={() => handleClick('Cálculo de balance hídrico')}
                        >
                            Cálculo de balance hídrico
                        </li>
                        <li 
                            className={`list-group-item ${selectedComponent === 'Patrón de cultivo o plantaciones con retención hídrica' ? 'selected' : ''}`} 
                            onClick={() => handleClick('Patrón de cultivo o plantaciones con retención hídrica')}
                        >
                            Patrón de cultivo o plantaciones con retención hídrica
                        </li>
                        <li 
                            className={`list-group-item ${selectedComponent === 'Patrón de diseño hidrológico' ? 'selected' : ''}`} 
                            onClick={() => handleClick('Patrón de diseño hidrológico')}
                        >
                            Patrón de diseño hidrológico
                        </li>
                        <li 
                            className={`list-group-item ${selectedComponent === 'Trazado y optimización de caminos' ? 'selected' : ''}`} 
                            onClick={() => handleClick('Trazado y optimización de caminos')}
                        >
                            Trazado y optimización de caminos
                        </li>
                        <li 
                            className={`list-group-item ${selectedComponent === 'Trazado y optimización de drenaje' ? 'selected' : ''}`} 
                            onClick={() => handleClick('Trazado y optimización de drenaje')}
                        >
                            Trazado y optimización de drenaje
                        </li>
                        <li 
                            className={`list-group-item ${selectedComponent === 'Calculadora de Tranques y embalses' ? 'selected' : ''}`} 
                            onClick={() => handleClick('Calculadora de Tranques y embalses')}
                        >
                            Calculadora de Tranques y embalses
                        </li>
                        <li 
                            className={`list-group-item ${selectedComponent === 'Identificación y generador de alcantarillas' ? 'selected' : ''}`} 
                            onClick={() => handleClick('Identificación y generador de alcantarillas')}
                        >
                            Identificación y generador de alcantarillas
                        </li>
                        <li 
                            className={`list-group-item ${selectedComponent === 'Trazado de canales con pendiente controlada' ? 'selected' : ''}`} 
                            onClick={() => handleClick('Trazado de canales con pendiente controlada')}
                        >
                            Trazado de canales con pendiente controlada
                        </li>
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

export default GestionAgua;
