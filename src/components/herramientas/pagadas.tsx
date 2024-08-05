import React from 'react';
import img1 from '../../assets/herramientas/tipologia.png';
import img2 from '../../assets/herramientas/topografico.png';
import img3 from '../../assets/herramientas/meteomatics.png';
import img4 from '../../assets/herramientas/eos.png';
import '../../styles/herramientas.css'

const Pagadas = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-2 mb-4">
                    <div className="grid-item text-center">
                    <a href="/gestionAgua">
                            <img src={img1} id='imgHerramientas' alt="Imagen 1" />
                            <p id='textoHerramientas'>Zonas vulnerables a anegamientos</p>
                        </a>
                    </div>
                </div>
                <div className="col-md-2 mb-4">
                    <div className="grid-item text-center">
                    <a href="/gestionAgua">
                            <img src={img2} id='imgHerramientas' alt="Imagen 2" />
                            <p id='textoHerramientas'>Cálculo de balance hídrico</p>
                        </a>
                    </div>
                </div>
                <div className="col-md-2 mb-4">
                    <div className="grid-item text-center">
                    <a href="/gestionAgua">
                            <img src={img3} id='imgHerramientas' alt="Imagen 3" />
                            <p id='textoHerramientas'>Patrón de diseño hidrológico</p>
                        </a>
                    </div>
                </div>
                <div className="col-md-2 mb-4">
                    <div className="grid-item text-center">
                    <a href="/gestionAgua">
                            <img src={img4} id='imgHerramientas' alt="Imagen 4" />
                            <p id='textoHerramientas'>Patrón de cultivo o plantaciones con retención hídrica</p>
                        </a>
                    </div>
                </div>
                <div className="col-md-2 mb-4">
                    <div className="grid-item text-center">
                    <a href="/gestionAgua">
                            <img src={img1} id='imgHerramientas' alt="Imagen 5" />
                            <p id='textoHerramientas'>Trazado de canales con pendiente controlada</p>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-3 mb-4">
                    <div className="grid-item text-center">
                    <a href="/gestionAgua">
                            <img src={img2} id='imgHerramientas' alt="Imagen 6" />
                            <p id='textoHerramientas'>Identificación y generador de alcantarillas</p>
                        </a>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="grid-item text-center">
                    <a href="/gestionAgua">
                            <img src={img3} id='imgHerramientas' alt="Imagen 7" />
                            <p id='textoHerramientas'>Trazado y optimización de drenajes</p>
                        </a>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="grid-item text-center">
                    <a href="/gestionAgua">
                            <img src={img4} id='imgHerramientas' alt="Imagen 8" />
                            <p id='textoHerramientas'>Calculadora de tranques y embalses</p>
                        </a>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="grid-item text-center">
                    <a href="/gestionAgua">
                            <img src={img1} id='imgHerramientas' alt="Imagen 9" />
                            <p id='textoHerramientas'>Trazado y optimización de caminos</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagadas;
