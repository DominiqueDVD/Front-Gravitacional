import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapaPoligono from "../maps/MapaPoligono.js";
import RhinoViewer from "./../rhinoCompute/RhinoViewer.jsx";
import OpenTopography from "../openTopography/OpenTopography";
import EosRequestComponent from "../eos/EosRequestComponent";
import SelectSuelos from "../suelos/selectSuelos";

const IngenieriaConceptual = () => {
  const [activeTab, setActiveTab] = useState<string>("herramienta1");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "herramienta2":
        return (
          <div>
            <RhinoViewer />
          </div>
        );
      case "herramienta3":
        return (
          <div>
            <SelectSuelos />
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
          {/* <button
                        className={`flex-sm-fill text-sm-center nav-link ${activeTab === 'herramienta1' ? 'active' : ''}`}
                        onClick={() => setActiveTab('herramienta1')}
                    >
                        Polígono
                    </button> */}
          <button
            className={`text-sm-center nav-link ${
              activeTab === "herramienta2" ? "active" : ""
            }`}
            onClick={() => setActiveTab("herramienta2")}
          >
            Diseño Hidrológico
          </button>
          <button
            className={`text-sm-center nav-link ${
              activeTab === "herramienta3" ? "active" : ""
            }`}
            onClick={() => setActiveTab("herramienta3")}
          >
            Plantaciones con retención hídrica
          </button>
        </nav>

        <div className="m-1 mt-5 w-75">{renderContent()}</div>
      </div>
    </div>
  );
};

export default IngenieriaConceptual;
