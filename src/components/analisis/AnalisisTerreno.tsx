import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapaPoligono from '../../pages/MapaPoligono';
import RhinoViewer from './../rhinoCompute/RhinoViewer';
import OpenTopography from '../openTopography/OpenTopography';
import EosRequestComponent from '../eos/EosRequestComponent';

const AnalisisTerreno = () => {
    const [activeTab, setActiveTab] = useState<string>('herramienta1');
    const navigate = useNavigate();

    const renderContent = () => {
        switch (activeTab) {
            case 'herramienta1':
                return <div>
                    <MapaPoligono />
                </div>
            case 'herramienta2':
                return <div>
                    <RhinoViewer />
                </div>
            case 'herramienta3':
                return <div>
                    <OpenTopography />
                </div>
            case 'herramienta4':
                return <div>
                    <EosRequestComponent />
                </div>
            default:
                return null;
        }
    };

    return (
        <div className='m-5'>
            <div>
                <nav className="nav nav-pills flex-column flex-sm-row">
                    <button
                        className={`flex-sm-fill text-sm-center nav-link ${activeTab === 'herramienta1' ? 'active' : ''}`}
                        onClick={() => setActiveTab('herramienta1')}
                    >
                        Polígono
                    </button>
                    <button
                        className={`flex-sm-fill text-sm-center nav-link ${activeTab === 'herramienta2' ? 'active' : ''}`}
                        onClick={() => setActiveTab('herramienta2')}
                    >
                        Vista 3D
                    </button>
                    <button
                        className={`flex-sm-fill text-sm-center nav-link ${activeTab === 'herramienta3' ? 'active' : ''}`}
                        onClick={() => setActiveTab('herramienta3')}
                    >
                        Vista OpenTP
                    </button>
                    <button
                        className={`flex-sm-fill text-sm-center nav-link ${activeTab === 'herramienta4' ? 'active' : ''}`}
                        onClick={() => setActiveTab('herramienta4')}
                    >
                        Vista EOS
                    </button>
                </nav>

                <div className="mt-3">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AnalisisTerreno;