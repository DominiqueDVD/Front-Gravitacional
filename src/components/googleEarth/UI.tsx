import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { Loader } from "@loaders.gl/core";
import { Tiles3DLoader } from "@loaders.gl/tiles";
import { Tileset3DLoader } from "@loaders.gl/3d-tiles";
import L from "leaflet";

interface Coordinate {
  lat: number;
  lng: number;
}

export class UI {
  private leafletMap: L.Map | undefined;
  private fetchTilesBtn: HTMLButtonElement | null = null;
  private debugSliderContainer: HTMLDivElement | null = null;
  private debugSliderInput: HTMLInputElement | null = null;

  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      const latLngInput = document.querySelector("#coordinateInput") as HTMLInputElement;
      const fetchTilesBtn = document.querySelector("#fetch") as HTMLButtonElement;
      const downloadTilesBtn = document.querySelector("#download") as HTMLButtonElement;
      const sseInput = document.querySelector("#sse") as HTMLInputElement;
      const debugSliderInput = document.querySelector("#debug-slider") as HTMLInputElement;
      const debugSliderContainer = document.querySelector("#debug-slider-container") as HTMLDivElement;
      const botonComputar = document.querySelector("#botonComputar") as HTMLButtonElement;

      if (localStorage.getItem("coords")) {
        latLngInput.value = localStorage.getItem("coords")!;
      }

      fetchTilesBtn.onclick = () => {
        this.onFetch();
      };

      downloadTilesBtn.onclick = () => {
        this.onDownload();
      };

      botonComputar.onclick = () => {
        console.log("Botón computar modelo");
      };

      window.onload = () => {
        const mapboxToken = `pk.eyJ1Ijoib21hcnNoZWhhdGEiLCJhIjoiY2xweWh4eWE3MDRmdDJtcGYyYnlsNW1jNiJ9.P6DvtW98Fx82KTMNQCYqwA`;
        const zoom = localStorage.getItem("zoom") ? Number(localStorage.getItem("zoom")) : 16;
        const map = L.map("map", { zoomControl: false }).setView(
          latLngInput.value.split(",").map(Number) as [number, number],
          zoom
        );

        L.tileLayer(
          `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`,
          {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.mapbox.com/" target="_blank">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        ).addTo(map);

        map.on("moveend", () => {
          const lat = map.getCenter().lat.toFixed(4);
          const lng = map.getCenter().lng.toFixed(4);
          latLngInput.value = `${lat},${lng}`;
          localStorage.setItem("zoom", String(map.getZoom()));
          // document.querySelector("#zoom")!.innerText = String(map.getZoom());
        });

        this.leafletMap = map;
        // document.querySelector("#zoom")!.innerText = String(map.getZoom());
      };

      // Asignación segura después de que los elementos estén disponibles
      this.fetchTilesBtn = fetchTilesBtn;
      this.debugSliderContainer = debugSliderContainer;
      this.debugSliderInput = debugSliderInput;

      if (this.debugSliderInput) {
        this.debugSliderInput.addEventListener("input", this.handleDebugSliderChange);
        this.debugSliderInput.addEventListener("change", this.handleDebugSliderChange);
      }

      // Bind event handlers
      this.handleDebugSliderChange = this.handleDebugSliderChange.bind(this);
      this.handleApiKeyChange = this.handleApiKeyChange.bind(this);
      this.handleLatLngChange = this.handleLatLngChange.bind(this);
      this.handleFetchButtonClick = this.handleFetchButtonClick.bind(this);
      this.handleDownloadButtonClick = this.handleDownloadButtonClick.bind(this);
    });
  }

  handleDebugSliderChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = Number(target.value);
    document.querySelector("#tile-count")!.innerText = String(value);
    this.onTileSliderChange(value);
  }

  handleApiKeyChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const token = target.value;
    localStorage.setItem("token", token);
  }

  handleLatLngChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const coords = target.value.split(",").map(Number);
    this.leafletMap?.panTo(new L.LatLng(coords[0], coords[1]));
  }

  handleFetchButtonClick() {
    this.onFetch();
  }

  handleDownloadButtonClick() {
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

  onDownload() {
    console.log("Downloading tiles...");
    // Implement your download logic here
  }

  getGoogleAPIKey() {
    return process.env.REACT_APP_GOOGLE_API_KEY;
  }

  getLatLngZoom() {
    const coords = (document.querySelector("#lat-lng") as HTMLInputElement).value.split(",").map(Number);
    const zoom = this.leafletMap?.getZoom() ?? 16;
    return {
      lat: coords[0],
      lng: coords[1],
      zoom,
    };
  }

  getZoom() {
    return this.leafletMap?.getZoom() ?? 16;
  }

  getScreenSpaceError() {
    return parseInt((document.querySelector("#sse") as HTMLInputElement).value, 10);
  }

  log(message: string) {
    const logElement = document.querySelector("#fetch-log") as HTMLDivElement;
    logElement.style.display = "block";
    logElement.innerText += message + "\n";
    logElement.scrollTop = logElement.scrollHeight;
  }

  clearLog() {
    const logElement = document.querySelector("#fetch-log") as HTMLDivElement;
    logElement.style.display = "none";
    logElement.innerText = "";
  }

  setDebugSliderVisibility(bool: boolean) {
    const { debugSliderContainer } = this;
    if (debugSliderContainer) {
      debugSliderContainer.style.display = bool ? "block" : "none";
    }
  }

  updateDebugSliderRange(number: number) {
    const { debugSliderInput } = this;
    if (debugSliderInput) {
      debugSliderInput.max = String(number);
      debugSliderInput.value = String(number);
      document.querySelector("#tile-count")!.innerText = String(number);
    }
  }

  onTileSliderChange(value: number) {
    console.log("Tile slider value:", value);
    // Implement your logic here
  }
}
