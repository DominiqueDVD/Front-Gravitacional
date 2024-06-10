import React, { useState, useEffect } from "react";
import "../styles/analisisModelo.css";
import OpenTopography from "../components/openTopography/OpenTopography";
// import EosTest from "./EosTest.jsx";
import RequestComponent from "../components/eos/RequestComponent";
import VistaModelo3D from "./VistaModelo3D"

function AnalisisModelo() {

    const handleViewChange = (view: 'vista3D' | 'vistaOpenTP' | 'vistaEOS') => {
        const seccion1 = document.getElementById('seccion1');
        const seccion2 = document.getElementById('seccion2');
        const seccion3 = document.getElementById('seccion3');

        if (seccion1 && seccion2 && seccion3) {
            switch (view) {
                case 'vista3D':
                    seccion1.classList.add('full-width');
                    seccion1.classList.remove('hidden');
                    seccion2.classList.add('hidden');
                    seccion2.classList.remove('full-width');
                    seccion3.classList.add('hidden');
                    seccion3.classList.remove('full-width');
                    break;
                case 'vistaOpenTP':
                    seccion1.classList.add('hidden');
                    seccion1.classList.remove('full-width');
                    seccion2.classList.add('full-width');
                    seccion2.classList.remove('hidden');
                    seccion3.classList.add('hidden');
                    seccion3.classList.remove('full-width');
                    break;
                case 'vistaEOS':
                    seccion1.classList.add('hidden');
                    seccion1.classList.remove('full-width');
                    seccion2.classList.add('hidden');
                    seccion2.classList.remove('full-width');
                    seccion3.classList.add('full-width');
                    seccion3.classList.remove('hidden');
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={() => handleViewChange('vista3D')}>Vista 3D</button>
            <button className="btn btn-primary" onClick={() => handleViewChange('vistaOpenTP')}>Vista OpenTP</button>
            <button className="btn btn-primary" onClick={() => handleViewChange('vistaEOS')}>Vista EOS</button>
            <div id="containerGeneral">
                <div id="seccion1" className="secciones full-width">
                    <VistaModelo3D />
                </div>
                <div id="seccion2" className="secciones hidden">
                    <OpenTopography />
                </div>
                <div id="seccion3" className="secciones hidden">
                    <RequestComponent />
                </div>
            </div>
        </div>
    );
}

export default AnalisisModelo;
