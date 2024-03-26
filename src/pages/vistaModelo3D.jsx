import React, { useState } from 'react';
import { Viewer } from '../components/googleEarth/Viewer.js';
import { UI } from '../components/googleEarth/UI.js';
import { load } from '@loaders.gl/core';
import { Tileset3D } from '@loaders.gl/tiles';
import { Tiles3DLoader } from '@loaders.gl/3d-tiles';
import { WebMercatorViewport } from '@deck.gl/core';
import { calcularCentroide } from '../components/googleEarth/puntos'
import '../styles/vista3d.css'


function GoogleEarthComponent() {

  // Get the parameter value from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const encodedJsonString = urlParams.get('data');

  // Decode the parameter value and parse it back into a JSON array
  const jsonString = decodeURIComponent(encodedJsonString);
  const arrayPuntos = JSON.parse(jsonString);

  console.log(arrayPuntos); // This will log the decoded JSON array


  // console.log(props.paths);
  const centroide = calcularCentroide(arrayPuntos);
  console.log(`${centroide.lat},${centroide.lng}`);

  //const puntos = props.location?.state?.data;
  const [viewer] = useState(new Viewer());
  const [ui] = useState(new UI());

  // useEffect(() => {
  //   setUI(new UI());
  // }, []);
  ui.onFetch = async () => {
    ui.clearLog()
    ui.log("Buscando...")
    ui.fetchTilesBtn.disabled = true

    try {
      await fetch3DTiles()
    } catch (e) {
      console.error(e)
      ui.log(`¡Error buscando teselas! Error: ${e}`)
    }

    ui.fetchTilesBtn.disabled = false
  }
  ui.onDownload = () => {
    viewer.generateCombineGltf()
  }
  ui.onTileSliderChange = (value) => {
    for (let i = 0; i < viewer.gltfArray.length; i++) {
      const gltf = viewer.gltfArray[i]
      gltf.scene.visible = i <= value
    }
  }

  // Here is where we actually get the 3D Tiles from the Google API
  // We use loadersgl to traverse the tileset until we get to the 
  // lat,lng,zoom we want, at the given screen space error
  // we end up with a list of glTF url's. Viewer is what finally
  // fetches them

  const fetch3DTiles = async () => {
    ui.setDebugSliderVisibility(false)

    // const { lat, lng, zoom } = ui.getLatLngZoom()
    const lat = centroide.lat;
    const lng = centroide.lng;
    const zoom = ui.getZoom();

    // const GOOGLE_API_KEY = 'AIzaSyDhLRBxmCSQdojbBtMQflN6DkRa-fSh1yk';
    const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    console.log(process.env);
    const tilesetUrl = 'https://tile.googleapis.com/v1/3dtiles/root.json?key=' + GOOGLE_API_KEY;

    const targetScreenSpaceError = ui.getScreenSpaceError()

    ui.log(`Buscando teselas en (${lat} ${lng}, ${zoom}, sse: ${targetScreenSpaceError})`)
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
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin="" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""></script>
      <div id="settings">
        <div id="centered-container">
          <label>Google API Key</label>
          <input id="google-api-key" type="text" />

          <label>Lat,Lng</label>
          <input id="lat-lng" type="text" defaultValue={`${centroide.lat},${centroide.lng}`} />

          <label>Reducción de calidad</label>
          <input type="number" defaultValue="0" id="sse"/>

          <label>Zoom: <span id="zoom">16</span></label>

          <div id="map-container">
            <div id="map"></div>
          </div>
        </div>
        <button id="fetch">Buscar teselas</button>
        <div id="debug-slider-container" style={{display:'none'}}>
          <label>Cantidad de teselas (<span id="tile-count"></span>)</label>
          <input id="debug-slider" type="range" min="-1" max="100" defaultValue="40"></input>
        </div>
        <pre id="fetch-log" className="log"></pre>
        <button id="download">Descargar modelo glTF</button>

        <br /><br /><a href="https://github.com/OmarShehata/google-earth-as-gltf#google-earth-as-gltf-models" target="_blank" className="settings-link">About</a><br /><br />
      </div>

      <div id="instructions">
        <center>
          <p>
            This app demonstrates fetching & rendering Google Earth 3D Tiles in ThreeJS
          </p>
        </center>
        <ol>
          <li>Get a <a href="https://developers.google.com/maps/documentation/tile/get-api-key" target="_blank">Google "Map Tiles"</a> API key </li>
          <li>
            Paste it in the settings top left
          </li>
          <li>
            Click <span id="fetch-tiles-instruction-text">fetch tiles</span>
          </li>
        </ol>
        <center>
          <p><a href="https://github.com/OmarShehata/google-earth-as-gltf#google-earth-as-gltf-models" target="_blank">Learn more</a> </p>
        </center>
      </div>

      <script type="module" src="/src/index.js"></script>
    </div>
  );
}

export default GoogleEarthComponent;