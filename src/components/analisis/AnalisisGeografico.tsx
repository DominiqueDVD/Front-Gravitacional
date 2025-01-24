import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapaPoligono from "../maps/MapaPoligono.js";
import RhinoViewer from "./../rhinoCompute/RhinoViewer.jsx";
import OpenTopography from "../openTopography/OpenTopography";
import EosRequestComponent from "../eos/EosRequestComponent";

const AnalisisGeografico = () => {
  const [activeTab, setActiveTab] = useState<string>("herramienta1");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "herramienta1":
        return (
          <div>
            <h1 className="text-center">Zonas vulnerables</h1>
          </div>
        );
      case "herramienta2":
        return (
          <div>
            <h1 className="text-center">Cálculo de flujo</h1>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="d-flex flex-row">
        <nav className="nav nav-pills flex-column w-25">
          <button
            className={`flex-sm-fill text-sm-center nav-link ${
              activeTab === "herramienta1" ? "active" : ""
            }`}
            onClick={() => setActiveTab("herramienta1")}
          >
            Zonas vulnerables
          </button>
          <button
            className={`text-sm-center nav-link ${
              activeTab === "herramienta2" ? "active" : ""
            }`}
            onClick={() => setActiveTab("herramienta2")}
          >
            Cálculo de flujo
          </button>
          {/* <button
                        className={`text-sm-center nav-link ${activeTab === 'herramienta3' ? 'active' : ''}`}
                        onClick={() => setActiveTab('herramienta3')}
                    >
                        Vista OpenTP
                    </button>
                    <button
                        className={`text-sm-center nav-link ${activeTab === 'herramienta4' ? 'active' : ''}`}
                        onClick={() => setActiveTab('herramienta4')}
                    >
                        Vista EOS
                    </button> */}
        </nav>

        <div className="m-1 w-75">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AnalisisGeografico;
