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
      const latLngInput = document.querySelector("#lat-lng") as HTMLInputElement;
      const fetchTilesBtn = document.querySelector("#fetch") as HTMLButtonElement;
      const downloadTilesBtn = document.querySelector("#download") as HTMLButtonElement;
      const sseInput = document.querySelector("#sse") as HTMLInputElement;
      const debugSliderInput = document.querySelector("#debug-slider") as HTMLInputElement;
      const debugSliderContainer = document.querySelector("#debug-slider-container") as HTMLDivElement;
      const botonComputar = document.querySelector("#botonComputar") as HTMLButtonElement;

      if (localStorage.getItem("coords")) {
        latLngInput.value = localStorage.getItem("coords")!;
      }

      debugSliderInput.oninput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        document.querySelector("#tile-count")!.innerText = String(target.value);
        this.onTileSliderChange(Number(target.value));
      };

      debugSliderInput.onchange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        document.querySelector("#tile-count")!.innerText = String(target.value);
        this.onTileSliderChange(Number(target.value));
      };

      latLngInput.onchange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const coords = target.value.split(",").map(Number);
        this.leafletMap?.panTo(new L.LatLng(coords[0], coords[1]));
      };

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
          document.querySelector("#zoom")!.innerText = String(map.getZoom());
        });

        this.leafletMap = map;
        document.querySelector("#zoom")!.innerText = String(map.getZoom());
      };

      this.fetchTilesBtn = fetchTilesBtn;
      this.debugSliderContainer = debugSliderContainer;
      this.debugSliderInput = debugSliderInput;

      this.debugSliderInput = document.querySelector("#debug-slider") as HTMLInputElement;
      this.debugSliderContainer = document.querySelector("#debug-slider-container") as HTMLDivElement;
      this.fetchTilesBtn = document.querySelector("#fetch") as HTMLButtonElement;

      this.handleDebugSliderChange = this.handleDebugSliderChange.bind(this);
      this.handleApiKeyChange = this.handleApiKeyChange.bind(this);
      this.handleLatLngChange = this.handleLatLngChange.bind(this);
      this.handleFetchButtonClick = this.handleFetchButtonClick.bind(this);
      this.handleDownloadButtonClick = this.handleDownloadButtonClick.bind(this);

      this.debugSliderInput.addEventListener("input", this.handleDebugSliderChange);
      this.debugSliderInput.addEventListener("change", this.handleDebugSliderChange);
      latLngInput.addEventListener("change", this.handleLatLngChange);
      this.fetchTilesBtn.addEventListener("click", this.handleFetchButtonClick);
      document.querySelector("#download")!.addEventListener("click", this.handleDownloadButtonClick);
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

  onDownload() {
    console.log("Downloading tiles...");
    // Implement your download logic here
  }
}


// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
// import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
// import { Loader } from "@loaders.gl/core";
// import { Tiles3DLoader } from "@loaders.gl/tiles";
// import { Tileset3DLoader } from "@loaders.gl/3d-tiles";
// import L from "leaflet";

// export class UI {
  
//   constructor() {
//     document.addEventListener('DOMContentLoaded', () => {
//       const apiKeyInput = process.env.REACT_APP_GOOGLE_API_KEY;
//       // const apiKeyInput = document.querySelector("#google-api-key");
//       const latLngInput = document.querySelector("#lat-lng");
//       const fetchTilesBtn = document.querySelector("#fetch");
//       const downloadTilesBtn = document.querySelector("#download");
//       const sseInput = document.querySelector("#sse");
//       const debugSliderInput = document.querySelector("#debug-slider");
//       const debugSliderContainer = document.querySelector(
//         "#debug-slider-container"
//       );
//       const botonComputar = document.querySelector("#botonComputar");

//       // Load saved values
//       // apiKeyInput.value = localStorage.getItem("token");
//       if (localStorage.getItem("coords")) {
//         latLngInput.value = localStorage.getItem("coords");
//       }

//       // if (!apiKeyInput.value) {
//       //   document.querySelector("#instructions").style.display = "block";
//       // }

//       debugSliderInput.onInput = (e) => {
//         document.querySelector("#tile-count").innerText = String(e.target.value);
//         this.onTileSliderChange(Number(e.target.value));
//       };

//       debugSliderInput.onChange = (e) => {
//         document.querySelector("#tile-count").innerText = String(e.target.value);
//         this.onTileSliderChange(Number(e.target.value));
//       };

//       // apiKeyInput.onChange = (e) => {
//       //   document.querySelector("#instructions").style.display = "none";

//       //   const token = apiKeyInput.value;
//       //   localStorage.setItem("token", token);
//       // };

//       latLngInput.onChange = (e) => {
//         const coords = e.target.value.split(",");
//         this.leafletMap.panTo(coords);
//       };
//       fetchTilesBtn.onclick = () => {
//         this.onFetch();
//       };
//       downloadTilesBtn.onclick = () => {
//         this.onDownload();
//       };
//       botonComputar.onclick = () => {
//         console.log("Botón computar modelo");

//       }
//       window.onload = () => {
//         const mapboxToken = `pk.eyJ1Ijoib21hcnNoZWhhdGEiLCJhIjoiY2xweWh4eWE3MDRmdDJtcGYyYnlsNW1jNiJ9.P6DvtW98Fx82KTMNQCYqwA`;
//         const zoom = localStorage.getItem("zoom")
//           ? localStorage.getItem("zoom")
//           : 16;
//         const map = L.map("map", { zoomControl: false }).setView(
//           latLngInput.value.split(","),
//           zoom
//         );

//         L.tileLayer(
//           `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`,
//           {
//             maxZoom: 19,
//             attribution:
//               '&copy; <a href="https://www.mapbox.com/ target="_blank">Mapbox</a>  &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//           }
//         ).addTo(map);

//         map.on("moveend", function () {
//           const lat = map.getCenter().lat.toFixed(4);
//           const lng = map.getCenter().lng.toFixed(4);
//           latLngInput.value = `${lat},${lng}`;
//           localStorage.setItem("zoom", map.getZoom());
//           // localStorage.setItem("coords", latLngInput.value);
//           document.querySelector("#zoom").innerText = map.getZoom();
//         });

//         this.leafletMap = map;
//         document.querySelector("#zoom").innerText = map.getZoom();
//         // fetchTilesBtn.click();
//       };

//       this.fetchTilesBtn = fetchTilesBtn;
//       this.debugSliderContainer = debugSliderContainer;
//       this.debugSliderInput = debugSliderInput;

//       this.debugSliderInput = document.querySelector("#debug-slider");
//       this.debugSliderContainer = document.querySelector("#debug-slider-container");
//       this.fetchTilesBtn = document.querySelector("#fetch");

//       // Bind event handlers
//       this.handleDebugSliderChange = this.handleDebugSliderChange.bind(this);
//       this.handleApiKeyChange = this.handleApiKeyChange.bind(this);
//       this.handleLatLngChange = this.handleLatLngChange.bind(this);
//       this.handleFetchButtonClick = this.handleFetchButtonClick.bind(this);
//       this.handleDownloadButtonClick = this.handleDownloadButtonClick.bind(this);

//       // Add event listeners
//       this.debugSliderInput.addEventListener('input', this.handleDebugSliderChange);
//       this.debugSliderInput.addEventListener('change', this.handleDebugSliderChange);
//       // document.querySelector("#google-api-key").addEventListener('change', this.handleApiKeyChange);
//       document.querySelector("#lat-lng").addEventListener('change', this.handleLatLngChange);
//       this.fetchTilesBtn.addEventListener('click', this.handleFetchButtonClick);
//       document.querySelector("#download").addEventListener('click', this.handleDownloadButtonClick);
//     });
//   }
//   handleDebugSliderChange(e) {
//     // Handle debug slider change event
//     console.log("Slider change");
//     const value = Number(e.target.value);
//     document.querySelector("#tile-count").innerText = String(value);
//     this.onTileSliderChange(value);
//   }

//   handleApiKeyChange(e) {
//     // Handle API key change event
//     const token = e.target.value;
//     localStorage.setItem("token", token);
//   }

//   handleLatLngChange(e) {
//     // Handle lat/lng input change event
//     const coords = e.target.value.split(",");
//     this.leafletMap.panTo(coords);
//   }

//   handleFetchButtonClick() {
//     // Handle fetch button click event
//     this.onFetch();
//   }

//   handleDownloadButtonClick() {
//     // Handle download button click event
//     this.onDownload();
//   }

//   onFetch() {
//     console.log("Buscando teselas...");
//     fetch("")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Datos teselas:", data);
//       })
//       .catch((error) => {
//         console.error("Error buscando teselas:", error);
//       });
//   }

//   getGoogleAPIKey() {
//     return process.env.REACT_APP_GOOGLE_API_KEY;
//   }

//   getLatLngZoom() {
//     const coords = document.querySelector("#lat-lng").value.split(",");
//     const zoom = this.leafletMap.getZoom();
//     return {
//       lat: Number(coords[0]),
//       lng: Number(coords[1]),
//       zoom,
//     };
//   }


//   getZoom() {
//     return this.leafletMap.getZoom();
//   }

//   getScreenSpaceError() {
//     return parseInt(document.querySelector("#sse").value);
//   }

//   log(message) {
//     const logElement = document.querySelector("#fetch-log");
//     logElement.style.display = "block";
//     logElement.innerText += message + "\n";

//     logElement.scrollTop = logElement.scrollHeight;
//   }
//   clearLog() {
//     const logElement = document.querySelector("#fetch-log");
//     logElement.style.display = "none";
//     logElement.innerText = "";
//   }

//   setDebugSliderVisibility(bool) {
//     const { debugSliderContainer } = this;
//     if (bool) {
//       debugSliderContainer.style.display = "block";
//     } else {
//       debugSliderContainer.style.display = "none";
//     }
//   }

//   updateDebugSliderRange(number) {
//     const { debugSliderInput } = this;
//     debugSliderInput.max = number;
//     debugSliderInput.value = number;

//     document.querySelector("#tile-count").innerText = String(number);
//   }
// }
