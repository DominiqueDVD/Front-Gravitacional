import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { Loader } from "@loaders.gl/core";
import { Tiles3DLoader } from "@loaders.gl/tiles";
import { Tileset3DLoader } from "@loaders.gl/3d-tiles";
import L from "leaflet";
export class UI {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      const apiKeyInput = document.querySelector("#google-api-key");
      const latLngInput = document.querySelector("#lat-lng");
      const fetchTilesBtn = document.querySelector("#fetch");
      const downloadTilesBtn = document.querySelector("#download");
      const sseInput = document.querySelector("#sse");
      const debugSliderInput = document.querySelector("#debug-slider");
      const debugSliderContainer = document.querySelector(
        "#debug-slider-container"
      );


      // Load saved values
      apiKeyInput.value = localStorage.getItem("token");
      if (localStorage.getItem("coords")) {
        latLngInput.value = localStorage.getItem("coords");
      }

      if (!apiKeyInput.value) {
        document.querySelector("#instructions").style.display = "block";
      }

      debugSliderInput.onInput = (e) => {
        document.querySelector("#tile-count").innerText = String(e.target.value);
        this.onTileSliderChange(Number(e.target.value));
      };

      debugSliderInput.onChange = (e) => {
        document.querySelector("#tile-count").innerText = String(e.target.value);
        this.onTileSliderChange(Number(e.target.value));
      };

      apiKeyInput.onChange = (e) => {
        document.querySelector("#instructions").style.display = "none";

        const token = apiKeyInput.value;
        localStorage.setItem("token", token);
      };

      latLngInput.onChange = (e) => {
        const coords = e.target.value.split(",");
        this.leafletMap.panTo(coords);
      };
      fetchTilesBtn.onclick = () => {
        this.onFetch();
      };
      downloadTilesBtn.onclick = () => {
        this.onDownload();
      };
      window.onload = () => {
        const mapboxToken = `pk.eyJ1Ijoib21hcnNoZWhhdGEiLCJhIjoiY2xweWh4eWE3MDRmdDJtcGYyYnlsNW1jNiJ9.P6DvtW98Fx82KTMNQCYqwA`;
        const zoom = localStorage.getItem("zoom")
          ? localStorage.getItem("zoom")
          : 16;
        const map = L.map("map", { zoomControl: false }).setView(
          latLngInput.value.split(","),
          zoom
        );

        L.tileLayer(
          `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`,
          {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.mapbox.com/ target="_blank">Mapbox</a>  &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        ).addTo(map);

        map.on("moveend", function () {
          const lat = map.getCenter().lat.toFixed(4);
          const lng = map.getCenter().lng.toFixed(4);
          latLngInput.value = `${lat},${lng}`;
          localStorage.setItem("zoom", map.getZoom());
          // localStorage.setItem("coords", latLngInput.value);
          document.querySelector("#zoom").innerText = map.getZoom();
        });

        this.leafletMap = map;
        document.querySelector("#zoom").innerText = map.getZoom();
        fetchTilesBtn.click();
      };

      this.fetchTilesBtn = fetchTilesBtn;
      this.debugSliderContainer = debugSliderContainer;
      this.debugSliderInput = debugSliderInput;

      this.debugSliderInput = document.querySelector("#debug-slider");
      this.debugSliderContainer = document.querySelector("#debug-slider-container");
      this.fetchTilesBtn = document.querySelector("#fetch");

      // Bind event handlers
      this.handleDebugSliderChange = this.handleDebugSliderChange.bind(this);
      this.handleApiKeyChange = this.handleApiKeyChange.bind(this);
      this.handleLatLngChange = this.handleLatLngChange.bind(this);
      this.handleFetchButtonClick = this.handleFetchButtonClick.bind(this);
      this.handleDownloadButtonClick = this.handleDownloadButtonClick.bind(this);

      // Add event listeners
      this.debugSliderInput.addEventListener('input', this.handleDebugSliderChange);
      this.debugSliderInput.addEventListener('change', this.handleDebugSliderChange);
      document.querySelector("#google-api-key").addEventListener('change', this.handleApiKeyChange);
      document.querySelector("#lat-lng").addEventListener('change', this.handleLatLngChange);
      this.fetchTilesBtn.addEventListener('click', this.handleFetchButtonClick);
      document.querySelector("#download").addEventListener('click', this.handleDownloadButtonClick);
    });
  }
  handleDebugSliderChange(e) {
    // Handle debug slider change event
    const value = Number(e.target.value);
    document.querySelector("#tile-count").innerText = String(value);
    this.onTileSliderChange(value);
  }

  handleApiKeyChange(e) {
    // Handle API key change event
    const token = e.target.value;
    localStorage.setItem("token", token);
  }

  handleLatLngChange(e) {
    // Handle lat/lng input change event
    const coords = e.target.value.split(",");
    this.leafletMap.panTo(coords);
  }

  handleFetchButtonClick() {
    // Handle fetch button click event
    this.onFetch();
  }

  handleDownloadButtonClick() {
    // Handle download button click event
    this.onDownload();
  }

  onFetch() {
    console.log("Buscando teselas...");
    fetch("")
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos teselas:", data);
      })
      .catch((error) => {
        console.error("Error buscando teselas:", error);
      });
  }

  getGoogleAPIKey() {
    return document.querySelector("#google-api-key").value;
  }

  getLatLngZoom() {
    const coords = document.querySelector("#lat-lng").value.split(",");
    const zoom = this.leafletMap.getZoom();
    return {
      lat: Number(coords[0]),
      lng: Number(coords[1]),
      zoom,
    };
  }
  getZoom() {
    return this.leafletMap.getZoom();
  }

  getScreenSpaceError() {
    return parseInt(document.querySelector("#sse").value);
  }

  log(message) {
    const logElement = document.querySelector("#fetch-log");
    logElement.style.display = "block";
    logElement.innerText += message + "\n";

    logElement.scrollTop = logElement.scrollHeight;
  }
  clearLog() {
    const logElement = document.querySelector("#fetch-log");
    logElement.style.display = "none";
    logElement.innerText = "";
  }

  setDebugSliderVisibility(bool) {
    const { debugSliderContainer } = this;
    if (bool) {
      debugSliderContainer.style.display = "block";
    } else {
      debugSliderContainer.style.display = "none";
    }
  }

  updateDebugSliderRange(number) {
    const { debugSliderInput } = this;
    debugSliderInput.max = number;
    debugSliderInput.value = number;

    document.querySelector("#tile-count").innerText = String(number);
  }
}
