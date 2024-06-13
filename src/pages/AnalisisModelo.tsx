import React, { useState, useEffect } from "react";
import "../styles/analisisModelo.css";
import OpenTopography from "../components/openTopography/OpenTopography";
// import EosTest from "./EosTest.jsx";
import EosRequestComponent from "../components/eos/EosRequestComponent";
import VistaModelo3D from "./VistaModelo3D"
import MapaPoligono from "./MapaPoligono";
import { calcularCentroide } from "../components/googleEarth/puntos";

interface Coordinate {
    lat: number;
    lng: number;
}

interface Project {
    coordinates: Coordinate[];
    // Otros campos del proyecto
}

const AnalisisModelo: React.FC<{ project: Project }> = ({ project }) => {
    const initialCoordinates = project?.coordinates || [{ lat: -36.6066, lng: -72.1034 },
    { lat: -36.6067, lng: -72.1035 },
    { lat: -36.6068, lng: -72.1036 }];
    const [view, setView] = useState('poligono');
    const [coordinates, setCoordinates] = useState<Coordinate[]>(initialCoordinates);
    const [coordenadasValidas, setCoordenadasValidas] = useState<boolean>(false);
    const [centroide, setCentroide] = useState<Coordinate>({ lat: -36.6, lng: -72.1 });

    console.log(coordinates);
    const actualizarCoordenadas = (nuevasCoordenadas: Coordinate[]) => {
        setCoordinates(nuevasCoordenadas);
        setCoordenadasValidas(true);
        setCentroide(calcularCentroide(coordinates));
    }

    const handleViewChange = (viewName: string) => {
        setView(viewName);
    };

    const handleCoordinatesConfirm = (newCoordinates: Coordinate[]) => {
        setCoordinates(newCoordinates);
    };

    // const handleViewChange = (view: 'vista3D' | 'vistaOpenTP' | 'vistaEOS' | 'poligono') => {
    //     const seccion1 = document.getElementById('seccion1');
    //     const seccion2 = document.getElementById('seccion2');
    //     const seccion3 = document.getElementById('seccion3');
    //     const seccion4 = document.getElementById('seccion4');

    //     if (seccion1 && seccion2 && seccion3 && seccion4) {
    //         switch (view) {
    //             case 'poligono':
    //                 seccion1.classList.add('full-width');
    //                 seccion1.classList.remove('hidden');
    //                 seccion2.classList.add('hidden');
    //                 seccion2.classList.remove('full-width');
    //                 seccion3.classList.add('hidden');
    //                 seccion3.classList.remove('full-width');
    //                 seccion4.classList.add('hidden');
    //                 seccion4.classList.remove('full-width');
    //                 break;
    //             case 'vista3D':
    //                 seccion1.classList.add('hidden');
    //                 seccion1.classList.remove('full-width');
    //                 seccion2.classList.add('full-width');
    //                 seccion2.classList.remove('hidden');
    //                 seccion3.classList.add('hidden');
    //                 seccion3.classList.remove('full-width');
    //                 seccion4.classList.add('hidden');
    //                 seccion4.classList.remove('full-width');
    //                 break;
    //             case 'vistaOpenTP':
    //                 seccion1.classList.add('hidden');
    //                 seccion1.classList.remove('full-width');
    //                 seccion2.classList.add('hidden');
    //                 seccion2.classList.remove('full-width');
    //                 seccion3.classList.add('full-width');
    //                 seccion3.classList.remove('hidden');
    //                 seccion4.classList.add('hidden');
    //                 seccion4.classList.remove('full-width');
    //                 break;
    //             case 'vistaEOS':
    //                 seccion1.classList.add('hidden');
    //                 seccion1.classList.remove('full-width');
    //                 seccion2.classList.add('hidden');
    //                 seccion2.classList.remove('full-width');
    //                 seccion3.classList.add('hidden');
    //                 seccion3.classList.remove('full-width');
    //                 seccion4.classList.add('full-width');
    //                 seccion4.classList.remove('hidden');
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    // };

    return (
        <div>
            <button className="btn btn-primary" onClick={() => handleViewChange('poligono')}>Polígono</button>
            {coordenadasValidas && (
                <div>
                    <button className="btn btn-primary" onClick={() => handleViewChange('vista3D')}>Vista 3D</button>
                    <button className="btn btn-primary" onClick={() => handleViewChange('vistaOpenTP')}>Vista OpenTP</button>
                    <button className="btn btn-primary" onClick={() => handleViewChange('vistaEOS')}>Vista EOS</button>

                </div>
            )}
            <div id="containerGeneral">
                {view === 'poligono' && (
                    <div id="seccion1" className="secciones full-width">
                        <MapaPoligono coordinates={coordinates} actualizarCoordenadas={actualizarCoordenadas} />
                    </div>
                )}
                {view === 'vista3D' && (
                    <div id="seccion2" className="secciones full-width">
                        <VistaModelo3D coordinates={coordinates} centroide={centroide} />
                    </div>
                )}
                {coordenadasValidas && (
                    <div>

                        {view === 'vistaOpenTP' && (
                            <div id="seccion3" className="secciones full-width">
                                <OpenTopography coordinates={coordinates} />
                            </div>
                        )}
                        {view === 'vistaEOS' && (
                            <div id="seccion4" className="secciones full-width">
                                <EosRequestComponent coordinates={coordinates} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnalisisModelo;
