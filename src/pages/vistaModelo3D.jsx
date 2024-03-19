import React, { useState } from 'react';
import { Viewer } from '../components/googleEarth/Viewer.js';
import { UI } from '../components/googleEarth/UI.js';
import { load } from '@loaders.gl/core';
import { Tileset3D } from '@loaders.gl/tiles';
import { Tiles3DLoader } from '@loaders.gl/3d-tiles';
import { WebMercatorViewport } from '@deck.gl/core';

function GoogleEarthComponent() {
  const [viewer] = useState(new Viewer());
  const [ui] = useState(new UI());
  const [glbUrls, setGlbUrls] = useState([]);

  const fetch3DTiles = async () => {
    // Resto del código de fetch3DTiles...
  };

  const load3DTileset = async (tilesetUrl, viewport, screenSpaceError) => {
    // Resto del código de load3DTileset...
  };

  const getSessionKey = (tileset) => {
    // Resto del código de getSessionKey...
  };

  const handleFetch = async () => {
    ui.clearLog();
    ui.log("Fetching...");
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

  const handleTileSliderChange = (value) => {
    for (let i = 0; i < viewer.gltfArray.length; i++) {
      const gltf = viewer.gltfArray[i];
      gltf.scene.visible = i <= value;
    }
  };

  return (
    <div>
      {/* Aquí va el contenido JSX de tu componente */}
    </div>
  );
}

export default GoogleEarthComponent;