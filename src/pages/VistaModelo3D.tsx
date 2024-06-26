import React, { useState, useEffect } from 'react';
import { Viewer } from "../components/googleEarth/Viewer";
import { UI } from "../components/googleEarth/UI";
import { load } from "@loaders.gl/core";
import { Tileset3D } from "@loaders.gl/tiles";
import { Tiles3DLoader } from "@loaders.gl/3d-tiles";
import { WebMercatorViewport } from "@deck.gl/core";
import logo2 from "../assets/logoDefinitivo.png";
import isotipo from "../assets/isotipo_color.png";
import "../styles/vista3d.css";

interface Coordinate {
  lat: number;
  lng: number;
}

interface VistaModelo3DProps {
  // coordinates: Coordinate[];
  // onLatLngChange: (centroide: Coordinate) => void;
}

const VistaModelo3D: React.FC<VistaModelo3DProps> = () => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([
    { lat: -36.6066, lng: -72.1034 },
    { lat: -36.6067, lng: -72.1035 },
    { lat: -36.6068, lng: -72.1036 },
  ]);
  const [zoom, setZoom] = useState(16);
  const [viewer] = useState(new Viewer());
  const [ui] = useState(new UI());
  const [teselas, setTesela] = useState();
  const [sse, setSse] = useState(0);

  const [latLng, setLatLng] = useState<Coordinate>({ lat: -36.6, lng: -72.1 });

  // useEffect(() => {
  //   onLatLngChange(latLng);
  // }, [latLng, onLatLngChange]);

  useEffect(() => {
    ui.onFetch = async () => {
      ui.clearLog();
      ui.log("Buscando...");
      ui.fetchTilesBtn.disabled = true;
      try {
        await fetch3DTiles();
      } catch (e) {
        console.error(e);
        ui.log(`¡Error buscando teselas! Error: ${e}`);
      }
      ui.fetchTilesBtn.disabled = false;
    };

    ui.onDownload = () => {
      viewer.generateCombineGltf();
    };

    ui.onTileSliderChange = (value) => {
      for (let i = 0; i < viewer.gltfArray.length; i++) {
        const gltf = viewer.gltfArray[i];
        gltf.scene.visible = i <= value;
      }
    };
  }, [ui, viewer]);

  // if (coordinates && coordinates.length > 0) {
  console.log(coordinates);

  const fetch3DTiles = async () => {
    ui.setDebugSliderVisibility(false);

    const lat = latLng.lat;
    const lng = latLng.lng;
    const zoom = ui.getZoom();

    const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const tilesetUrl = `https://tile.googleapis.com/v1/3dtiles/root.json?key=${GOOGLE_API_KEY}`;

    const targetScreenSpaceError = ui.getScreenSpaceError();
    const viewport = new WebMercatorViewport({
      width: 230,
      height: 175,
      latitude: lat,
      longitude: lng,
      zoom: zoom,
    });

    const tileset = await load3DTileset(tilesetUrl, viewport, targetScreenSpaceError);
    const sessionKey = getSessionKey(tileset);
    let tiles = tileset.tiles;
    tiles = tiles.sort((tileA, tileB) => {
      return tileA.header.geometricError - tileB.header.geometricError;
    });

    const glbUrls = [];
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      const errorDiff = Math.abs(targetScreenSpaceError - tile.header.geometricError);
      if (errorDiff <= targetScreenSpaceError) {
        const url = `${tile.contentUrl}?key=${GOOGLE_API_KEY}&session=${sessionKey}`;
        glbUrls.push(url);
      }

      if (glbUrls.length > 100) {
        ui.log("==== Exceeded maximum glTFs! Capping at 100 =====");
        break;
      }
    }

    if (glbUrls.length === 0) {
      let firstSSEFound = null;
      for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        if (firstSSEFound === null) firstSSEFound = Math.round(tile.header.geometricError);
        const errorDiff = Math.abs(targetScreenSpaceError - tile.header.geometricError);
        if (errorDiff <= firstSSEFound * 2) {
          const url = `${tile.contentUrl}?key=${GOOGLE_API_KEY}&session=${sessionKey}`;
          glbUrls.push(url);
        }

        if (glbUrls.length > 100) {
          ui.log("==== Exceeded maximum glTFs! Capping at 100 =====");
          break;
        }
      }
      ui.log(
        `==== No tiles found for screen space error ${targetScreenSpaceError}. Getting tiles that are within 2x of ${firstSSEFound} ===`
      );
    }
    document.getElementById("loader").style.display = "flex";
    viewer.loadGLTFTiles(glbUrls, ui.log);
    ui.setDebugSliderVisibility(true);
    ui.updateDebugSliderRange(glbUrls.length);
  };

  const load3DTileset = async (tilesetUrl, viewport, screenSpaceError) => {
    const tilesetJson = await load(tilesetUrl, Tiles3DLoader, {
      "3d-tiles": { loadGLTF: false },
    });
    const tileset3d = new Tileset3D(tilesetJson, {
      throttleRequests: false,
      maximumScreenSpaceError: screenSpaceError,
    });

    while (!tileset3d.isLoaded()) {
      await tileset3d.selectTiles(viewport);
    }

    return tileset3d;
  };

  const getSessionKey = (tileset) => {
    return new URL(`http://website.com?${tileset.queryParams}`).searchParams.get("session");
  };

  const handleFetch = async () => {
    ui.clearLog();
    ui.log("Buscando...");
    ui.fetchTilesBtn.disabled = true;
    try {
      await fetch3DTiles();
    } catch (e) {
      console.error(e);
      ui.log(`Failed to fetch 3D Tiles! Error: ${e}`);
    }
    ui.fetchTilesBtn.disabled = false;
  };

  const handleDownload = () => {
    viewer.generateCombineGltf();
  };

  const computarModelo = () => {
    viewer.computarFigura();
  };

  const handleTeselaChange = (event) => {
    setTesela(event.target.value);
  };

  const handleSseChange = (event) => {
    setSse(event.target.value);
  };

  const handleZoomChange = (event) => {
    const newZoom = event.target.value;
    setZoom(newZoom);
    ui.leafletMap.setView([latLng.lat, latLng.lng], newZoom);
    localStorage.setItem("zoom", newZoom);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    const [lat, lng] = value.split(',').map(parseFloat);
    setLatLng({ lat, lng });
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <div className="top-bar">
        <div className="logo-container">
          <img src={logo2} alt="logo" className="logo-img" />
        </div>
        <div className="input-container">
          <label htmlFor="coordinateInput">LatLng:</label>
          <input
            id="coordinateInput"
            type="text"
            value={`${latLng.lat}, ${latLng.lng}`}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="controls">
        <button id="fetch" onClick={handleFetch} className="button">
          Buscar
        </button>
        <button id="download" onClick={handleDownload} className="button">
          Descargar Modelo
        </button>
        <button id="botonComputar" onClick={computarModelo} className="button">
          Computar Modelo
        </button>
        <label htmlFor="tesela">Teselas:</label>
        <input
          id="tesela"
          type="text"
          value={teselas}
          onChange={handleTeselaChange}
          className="input"
        />
        <label htmlFor="sse">SSE:</label>
        <input
          id="sse"
          type="text"
          value={sse}
          onChange={handleSseChange}
          className="input"
        />
        <label htmlFor="zoom">Zoom:</label>
        <input
          id="zoom"
          type="text"
          value={zoom}
          onChange={handleZoomChange}
          className="input"
        />
      </div>

      <div className="viewer-container" id="viewer"></div>
      <div id="loader" style={{ display: 'none' }}>
        <img src={isotipo} alt="Isotipo" className="isotipo" />
        <p className="loading-text">Cargando...</p>
      </div>
      <div className="leaflet-container">
        <div id="map"></div>
      </div>
      <pre id="fetch-log" className="log"></pre>
    </div>
  );
  // } else return null;
};

export default VistaModelo3D;
