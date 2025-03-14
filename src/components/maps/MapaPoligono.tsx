import React, { useEffect, useState } from "react";
import "../../styles/layout.css";
import ButtonModal from "../poligonos/modalButton";
import SearchForm from "../poligonos/buscarLugar";
import VistaModelo3D from "../../pages/VistaModelo3D";
import { calcularCentroide } from "../googleEarth/puntos";
import { useProject } from "../guardarProyectos/ProjectContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { updateProject } from "../../redux/slices/projectSlice";
const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapaPoligono = React.memo(() => {
  // const { updateProject, project } = useProject();
  const project = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();
  var map;
  var Paths = new Array();
  var bounds = null;
  var infoArea = null;
  function Generator() {}
  const maxArea = 5000000;
  var isValid = false;
  const centroInicio = { lat: -36.418858, lng: -72.51649 };

  const script = document.createElement("script");
  // Asigna la URL de la API de Google Maps a la variable src del elemento script
  script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&callback=initMap&libraries=drawing,places,geometry&v=weekly`;
  script.async = true;
  document.body.appendChild(script);

  useEffect(() => {
    Generator.prototype.rand = Math.floor(Math.random() * 26) + Date.now();

    Generator.prototype.getId = function () {
      return this.rand++;
    };

    var idGen = new Generator();
    let id = idGen.getId();

    // This example requires the Drawing library. Include the libraries=drawing
    // parameter when you first load the API. For example:
    function initMap() {
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: centroInicio,
        zoom: 12,
        mapTypeId: "satellite",
        zoomControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          mapTypeIds: [
            window.google.maps.MapTypeId.ROADMAP,
            window.google.maps.MapTypeId.SATELLITE,
            window.google.maps.MapTypeId.TERRAIN,
            window.google.maps.MapTypeId.HYBRID,
          ],
        },
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        gestureHandling: "greedy",
      });
      bounds = new window.google.maps.LatLngBounds();
      // Create the initial InfoWindow.
      let infoWindow = new window.google.maps.InfoWindow({
        content: "Comience a dibujar su polígono",
        position: centroInicio,
      });

      infoWindow.open(map);
      // Configure the click listener.
      map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new window.google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
          JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);

        const punto = mapsMouseEvent.latLng.toJSON();
        Paths.push(punto);

        // Actualizar el estado con los nuevos Paths
        setPolygonPaths([...Paths]);
      });

      //Enviar polígono para su procesamiento
      const buttonSend = document.createElement("div");
      AddButton(
        buttonSend,
        "Click para procesar el polígono",
        'Procesar el terreno <i class="bi bi-cloud-upload-fill fa-2x"></i>',
        () => {
          if (isValid) {
            console.log(Paths);
            var jsonData = Paths;
            var fileName = "coordenadas" + Date.now();
            // Convertir el objeto JSON en una cadena JSON
            const jsonStr = JSON.stringify(jsonData, null, 2);

            // Crear un Blob a partir de la cadena JSON
            const blob = new Blob([jsonStr], { type: "application/json" });

            // Crear un enlace <a> para descargar el archivo
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName || "data.json";

            // Simular un clic en el enlace para iniciar la descarga
            document.body.appendChild(link);
            // link.click();

            // Limpiar el enlace y liberar el objeto URL
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            const pathsEncoded = encodeURIComponent(jsonStr);
            // coordinates.s = Paths;
            sessionStorage.setItem("coordenadas", JSON.stringify(Paths[0]));
            const centroide = calcularCentroide(Paths[0]);
            sessionStorage.setItem("centroide", JSON.stringify(centroide));

            const areaSelec = sessionStorage.getItem("areaSelec");
            const areaDecimales = parseFloat(areaSelec || "0").toFixed(2);

            // dispatch(updateProject({ key: "coordinates", value: Paths[0] }));

            // updateProject("coordinates", sessionStorage.getItem("coordenadas"));
            // updateProject("coordinatesCenter", centroide);

            alert(
              "Tamaño del área: " +
                areaDecimales +
                "m2\nCoordenadas: " +
                sessionStorage.getItem("coordenadas") +
                "\nCentroide: " +
                sessionStorage.getItem("centroide")
            );

            // PoligonoInfoModal.openModal()

            // window.$('#poligonoInfoModal').modal('show')

            /*var d = new Object();
                    d.Paths = Paths;
                    d.id = id;
                    window.$.ajax({
                        type: "POST",
                        data: JSON.stringify(d),
                        url: "/Home/PathsProcess",
                        contentType: 'application/json; charset=utf-8'
                    }).done(function (data) {
                        for (i = 0; i < Paths.length; i++) {
                            for (j = 0; j < Paths[i].length; j++) {
                                bounds.extend(new window.google.maps.LatLng(Paths[i][j].lat, Paths[i][j].lng));
                            }
                        }
                        map.fitBounds(bounds);
                        window.$("#container").html(data);
                    });*/
          } else {
            alert("El polígono debe ser menor o igual a " + maxArea + "m2");
          }
        },
        map
      );

      const buttonMesh = document.createElement("div");
      AddButton(
        buttonMesh,
        "Click para mostrar la malla",
        '<i class="bi bi-hash fa-2x"></i>',
        () => {
          var data = JSON.stringify({ id: "@(ViewBag.id)" });
          window.$.ajax({
            type: "POST",
            data: data,
            url: "/Home/getMesh",
            contentType: "application/json; charset=utf-8",
          }).done(function (data) {
            console.log(data);
            console.log(
              window.jQuery.isEmptyObject(window.jQuery.parseJSON(data))
            );
            if (!window.jQuery.isEmptyObject(window.jQuery.parseJSON(data))) {
              var jsonData = window.jQuery.parseJSON(data);
              const polygonCoords = jsonData.polygons[0];
              // Construct the polygon.
              const polygon = new window.google.maps.Polygon({
                paths: polygonCoords,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
              });
              polygon.setMap(map);

              if (jsonData.lines.length > 0 && jsonData.lines[0].length > 0) {
                jsonData.lines.forEach((lines) =>
                  lines.forEach((line) => {
                    //console.log(line.pointStart.lat)
                    var line = new window.google.maps.Polyline({
                      path: [
                        {
                          lat: line.pointStart.lat,
                          lng: line.pointStart.lng,
                        },
                        {
                          lat: line.pointEnd.lat,
                          lng: line.pointEnd.lng,
                        },
                      ],
                      //geodesic: line.geodesic
                      geodesic: true,
                      strokeColor: line.strokeColor,
                      strokeOpacity: line.strokeOpacity,
                      strokeWeight: line.strokeWeight,
                    });
                    line.setMap(map);

                    for (let i = 0; i < jsonData.polygons.length; i++) {
                      for (let j = 0; j < jsonData.polygons[i].length; j++) {
                        bounds.extend(
                          new window.google.maps.LatLng(
                            jsonData.polygons[i][j].lat,
                            jsonData.polygons[i][j].lng
                          )
                        );
                      }
                    }

                    map.fitBounds(bounds);
                  })
                );
              } else {
                alert(
                  "No se ha terminado de procesar la malla, vuelva a intentarlo más tarde."
                );
              }
            } else {
              alert("Primero debe enviar el polígono creado.");
            }
          });
        },
        map
      );

      const buttonMeshEj = document.createElement("div");
      AddButton(
        buttonMeshEj,
        "Click para mostrar la malla de ejemplo",
        '<i class="bi bi-hash fa-2x"><sub>ej:<sub></i>',
        () => {
          var data = JSON.stringify({ id: "1637034373219" });
          window.$.ajax({
            type: "POST",
            data: data,
            url: "/Home/getMesh",
            contentType: "application/json; charset=utf-8",
          }).done(function (data) {
            //console.log(data);
            var jsonData = window.jQuery.parseJSON(data);
            const polygonCoords = jsonData.polygons[0];
            // Construct the polygon.
            const polygon = new window.google.maps.Polygon({
              paths: polygonCoords,
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
            });
            polygon.setMap(map);

            jsonData.lines.forEach((lines) =>
              lines.forEach((line) => {
                //console.log(line.pointStart.lat)
                var line = new window.google.maps.Polyline({
                  path: [
                    {
                      lat: line.pointStart.lat,
                      lng: line.pointStart.lng,
                    },
                    {
                      lat: line.pointEnd.lat,
                      lng: line.pointEnd.lng,
                    },
                  ],
                  //geodesic: line.geodesic
                  geodesic: true,
                  strokeColor: line.strokeColor,
                  strokeOpacity: line.strokeOpacity,
                  strokeWeight: line.strokeWeight,
                });
                line.setMap(map);

                for (let i = 0; i < jsonData.polygons.length; i++) {
                  for (let j = 0; j < jsonData.polygons[i].length; j++) {
                    bounds.extend(
                      new window.google.maps.LatLng(
                        jsonData.polygons[i][j].lat,
                        jsonData.polygons[i][j].lng
                      )
                    );
                  }
                }

                // The Center of the Bermuda Triangle - (25.3939245, -72.473816)
                //console.log(bounds.getCenter());

                map.fitBounds(bounds);
              })
            );
          });

          window.$.ajax({
            type: "POST",
            data: data,
            url: "/Home/getReport",
            contentType: "application/json; charset=utf-8",
          }).done(function (data) {
            window.$("#container").html(data);
          });
        },
        map
      );

      const buttonDataLocal = document.createElement("div");
      AddButton(
        buttonDataLocal,
        "Click para abrir el menú",
        '<i class="bi bi-menu-up fa-2x"></i>',
        () => {
          window.$("#menuModal").modal("show");
        },
        map
      );

      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
        buttonSend
      );
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
        buttonMesh
      );
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
        buttonMeshEj
      );
      //map.controls[window.google.maps.ControlPosition.LEFT_CENTER].push(buttonDataLocal);

      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.BOTTOM_CENTER,

          drawingModes: [
            //window.google.maps.drawing.OverlayType.MARKER,
            //window.google.maps.drawing.OverlayType.CIRCLE,
            window.google.maps.drawing.OverlayType.POLYGON,
            //window.google.maps.drawing.OverlayType.POLYLINE,
            //window.google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },
        markerOptions: {
          icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        },
        polygonOptions: {
          fillColor: "#BCDCF9",
          strokeColor: "#57ACF9",
          fillOpacity: 0.5,
          strokeWeight: 2,
          clickable: true,
          editable: true,
          draggable: true,
          zIndex: 1,
        },
      });

      window.google.maps.event.addListener(
        drawingManager,
        "overlaycomplete",
        function (event) {
          /*if (event.type == 'circle') {
                    var radius = event.overlay.getRadius();
                    console.log(radius);
                }*/
          //console.log(Paths.length);
          if (event.type == "polygon" && Paths.length < 1) {
            var _polygon = event.overlay.getPaths();
            var path = new Array();
            _polygon.forEach((p) =>
              p.forEach((i) => {
                var p = new Object();
                p.lat = i.lat();
                p.lng = i.lng();
                path.push(p);
              })
            );
            Paths.push(path);

            //console.log(window.google.maps.geometry.spherical.computeArea(event.overlay.getPath()));
            var area = window.google.maps.geometry.spherical.computeArea(
              event.overlay.getPath()
            );
            sessionStorage.setItem("areaSelec", area);
            if (area > maxArea) {
              isValid = false;
              event.overlay.setOptions({
                fillColor: "##fb0000",
                strokeColor: "#fb0000",
              });
            } else {
              isValid = true;
              event.overlay.setOptions({
                fillColor: "#BCDCF9",
                strokeColor: "#57ACF9",
              });
            }
            event.overlay.getPaths().forEach(function (path, index) {
              path.addListener("set_at", function () {
                var _area = window.google.maps.geometry.spherical.computeArea(
                  event.overlay.getPath()
                );
                sessionStorage.setItem("areaSelec", _area);
                if (_area > maxArea) {
                  isValid = false;
                  event.overlay.setOptions({
                    fillColor: "##fb0000",
                    strokeColor: "#fb0000",
                  });
                } else {
                  isValid = true;
                  event.overlay.setOptions({
                    fillColor: "#BCDCF9",
                    strokeColor: "#57ACF9",
                  });
                }
              });
            });
          } else {
            event.overlay.setMap(null);
          }
        }
      );

      drawingManager.setMap(map);
    }

    window.initMap = initMap;
  }, []);

  const usarPoligonoPrueba = () => {
    let coordenadas = [
      { lat: -36.414751, lng: -72.511329 },
      { lat: -36.415254, lng: -72.512766 },
      { lat: -36.415266, lng: -72.514048 },
      { lat: -36.41583, lng: -72.515521 },
      { lat: -36.415858, lng: -72.516124 },
      { lat: -36.416431, lng: -72.518011 },
      { lat: -36.416573, lng: -72.51895 },
      { lat: -36.416403, lng: -72.519597 },
      { lat: -36.416389, lng: -72.521145 },
      { lat: -36.418564, lng: -72.521567 },
      { lat: -36.420214, lng: -72.521722 },
      { lat: -36.421316, lng: -72.520872 },
      { lat: -36.422568, lng: -72.519273 },
      { lat: -36.422834, lng: -72.517201 },
      { lat: -36.420746, lng: -72.512437 },
      { lat: -36.418379, lng: -72.511805 },
      { lat: -36.417377, lng: -72.511321 },
      { lat: -36.414751, lng: -72.511329 },
    ];

    let polygon = new google.maps.Polygon({
      paths: coordenadas,
      fillColor: "#BCDCF9",
      strokeColor: "#57ACF9",
      fillOpacity: 0.5,
      strokeWeight: 2,
      clickable: true,
      editable: true,
      draggable: true,
    });

    polygon.setMap(map!);

    for (let i = 0; i < coordenadas.length; i++) {
      let latLng = new google.maps.LatLng(
        coordenadas[i].lat,
        coordenadas[i].lng
      );
      bounds?.extend(latLng);
    }

    isValid = true;
    map!.fitBounds(bounds!);

    let area = window.google.maps.geometry.spherical.computeArea(
      polygon.getPath()
    );

    sessionStorage.setItem("areaSelec", area);

    console.log(coordenadas);

    // Paths.length = 0;
    // Paths = coordenadas;

    sessionStorage.setItem("coordenadas", JSON.stringify(coordenadas));
    const centroide = calcularCentroide(coordenadas);
    sessionStorage.setItem("centroide", JSON.stringify(centroide));

    const areaSelec = sessionStorage.getItem("areaSelec");
    const areaDecimales = parseFloat(areaSelec || "0").toFixed(2);

    // alert("Tamaño del área: " + areaDecimales + "m2\nCoordenadas: " + sessionStorage.getItem("coordenadas") + "\nCentroide: " + sessionStorage.getItem("centroide"));
    // procesarCoordenadas();
  };

  const AddButton = (controlDiv, title, innerHTML, fn, map) => {
    // Set CSS for the control border.
    const controlUI = document.createElement("div");
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginTop = "10px";
    controlUI.style.marginBottom = "22px";
    controlUI.style.marginRight = "10px";
    controlUI.style.textAlign = "center";
    controlUI.title = title;
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interioViewBag.
    const controlText = document.createElement("div");
    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "16px";
    controlText.style.lineHeight = "28px";
    controlText.style.paddingLeft = "2px";
    controlText.style.paddingRight = "2px";
    controlText.innerHTML = innerHTML;
    controlUI.appendChild(controlText);
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener("click", fn);
  };

  return (
    <div className="divMap">
      <button className="btn btn-primary" onClick={usarPoligonoPrueba}>
        Usar coordenadas de prueba
      </button>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
      {/* <ButtonModal></ButtonModal>
      <SearchForm></SearchForm> */}

      {/* <VistaModelo3D coordinates={polygonPaths} /> */}
    </div>
  );
});

export default MapaPoligono;
