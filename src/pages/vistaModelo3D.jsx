import React, { useState, useEffect } from 'react';
import { Viewer } from '../components/googleEarth/Viewer.js';
import { UI } from '../components/googleEarth/UI.js';
import { load } from '@loaders.gl/core';
import { Tileset3D } from '@loaders.gl/tiles';
import { Tiles3DLoader } from '@loaders.gl/3d-tiles';
import { WebMercatorViewport } from '@deck.gl/core';
 

function GoogleEarthComponent(props) {
  
  //const puntos = props.location?.state?.data;
  const [viewer] = useState(new Viewer());
  const [ui, setUI] = useState(null);

  useEffect(() => {
    setUI(new UI());
  }, []);

  const fetch3DTiles = async () => {
    ui.setDebugSliderVisibility(false)

    const { lat, lng, zoom } = ui.getLatLngZoom()
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const tilesetUrl = 'https://tile.googleapis.com/v1/3dtiles/root.json?key=' + GOOGLE_API_KEY;

    const targetScreenSpaceError = ui.getScreenSpaceError()

    ui.log(`Fetching tiles at (${lat} ${lng}, ${zoom}, sse: ${targetScreenSpaceError})`)
    const viewport = new WebMercatorViewport({
      width: 230,
      height: 175, // dimensions from the little map preview
      latitude: lat,
      longitude: lng,
      zoom: zoom
    });

    const tileset = await load3DTileset(tilesetUrl, viewport, targetScreenSpaceError)
    const sessionKey = getSessionKey(tileset)
    let tiles = tileset.tiles
    // sort tiles to have the most accurate tiles first
    tiles = tiles.sort((tileA, tileB) => {
      return tileA.header.geometricError - tileB.header.geometricError
    })

    const glbUrls = []
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i]
      const errorDiff = Math.abs(targetScreenSpaceError - tile.header.geometricError)
      if (errorDiff <= targetScreenSpaceError) {
        console.log(tile.header.geometricError)
        const url = `${tile.contentUrl}?key=${GOOGLE_API_KEY}&session=${sessionKey}`
        glbUrls.push(url)
      }

      if (glbUrls.length > 100) {
        ui.log("==== Exceeded maximum glTFs! Capping at 100 =====")
        break
      }
    }

    if (glbUrls.length == 0) {
      let firstSSEFound = null
      for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i]
        if (firstSSEFound == null) firstSSEFound = Math.round(tile.header.geometricError)
        const errorDiff = Math.abs(targetScreenSpaceError - tile.header.geometricError)
        if (errorDiff <= firstSSEFound * 2) {

          const url = `${tile.contentUrl}?key=${GOOGLE_API_KEY}&session=${sessionKey}`
          glbUrls.push(url)
        }

        if (glbUrls.length > 100) {
          ui.log("==== Exceeded maximum glTFs! Capping at 100 =====")
          break
        }
      }
      ui.log(`==== No tiles found for screen space error ${targetScreenSpaceError}. Getting tiles that are within 2x of ${firstSSEFound} ===`)
    }

    viewer.loadGLTFTiles(glbUrls, ui.log)
    ui.setDebugSliderVisibility(true)
    ui.updateDebugSliderRange(glbUrls.length)

    // eslint-disable-next-line no-unused-expressions
    viewer.fetch
  };

  const load3DTileset = async (tilesetUrl, viewport, screenSpaceError) => {
    const tilesetJson = await load(tilesetUrl, Tiles3DLoader, { '3d-tiles': { loadGLTF: false } });
    const tileset3d = new Tileset3D(tilesetJson, {
      throttleRequests: false,
      maximumScreenSpaceError: screenSpaceError
    })

    while (!tileset3d.isLoaded()) {
      await tileset3d.selectTiles(viewport)
    }

    return tileset3d
  };

  const getSessionKey = (tileset) => {
    // Resto del código de getSessionKey...
    return new URL(`http://website.com?${tileset.queryParams}`).searchParams.get("session")
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