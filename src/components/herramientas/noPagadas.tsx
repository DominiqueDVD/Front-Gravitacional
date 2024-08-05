import React from 'react';
import img1 from '../../assets/herramientas/tipologia.png';
import img2 from '../../assets/herramientas/topografico.png';
import img3 from '../../assets/herramientas/meteomatics.png';
import img4 from '../../assets/herramientas/eos.png';
import '../../styles/herramientas.css'

const NoPagadas = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="grid-item text-center">
                        <a href="/analisisGeografico">
                            <img src={img1} id='imgHerramientas' alt="Tipología de suelos" />
                            <p id='textoHerramientas'>Tipología de suelos</p>
                        </a>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="grid-item text-center">
                    <a href="/analisisGeografico">
                            <img src={img2} id='imgHerramientas' alt="Información meteorológica" />
                            <p id='textoHerramientas'>Información meteorológica meteomatics</p>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="grid-item text-center">
                    <a href="/analisisGeografico">
                            <img src={img3} id='imgHerramientas' alt="Información Topográfica" />
                            <p id='textoHerramientas'>Información Topográfica</p>
                        </a>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="grid-item text-center">
                    <a href="/analisisGeografico">
                            <img src={img4} id='imgHerramientas' alt="Índices NDVI" />
                            <p id='textoHerramientas'>Índices NDVI y otros índices de EOS</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoPagadas;
