import React, { useEffect } from 'react';
import '../styles/layout.css'
import imagen1 from '../assets/gravitacional_mod_escorrentias.png';
import imagen2 from '../assets/icons_actions.png'

function Layout() {
    useEffect(() => {
        const script = document.createElement('script');
       // Asigna la URL de la API de Google Maps a la variable src del elemento script
        script.src = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    useEffect(() => {
        let map;
        let Paths = new Array();
        let bounds = null;
        let infoArea = null;
        function Generator() { }
        let maxArea = 500000;
        let isValid = false;

        Generator.prototype.rand = Math.floor(Math.random() * 26) + Date.now();

        Generator.prototype.getId = function () {
            return this.rand++;
        };

        var idGen = new Generator();
        let id = idGen.getId();

        function AddButton(controlDiv, title, innerHTML, fn, map) {
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
        }

        // This example requires the Drawing library. Include the libraries=drawing
        // parameter when you first load the API. For example:
        // <script src="https://maps.googleapis.com/maps/api/js?AIzaSyBduNSw_S2YfNsRJ-qc12d2IRWrLcdLsVo&libraries=drawing">
        function initMap() {
            map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: -36.81883, lng: -73.03145 },
                zoom: 12,
                mapTypeId: 'satellite',
                zoomControl: true,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    mapTypeIds: [
                        window.google.maps.MapTypeId.ROADMAP,
                        window.google.maps.MapTypeId.SATELLITE,
                        window.google.maps.MapTypeId.TERRAIN,
                        window.google.maps.MapTypeId.HYBRID
                    ]
                },
                scaleControl: true,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false
            });
            bounds = new window.google.maps.LatLngBounds();
            // Create the initial InfoWindow.
            let infoWindow = new window.google.maps.InfoWindow({
                content: "Comience a dibujar su polígono",
                position: { lat: -36.81883, lng: -73.03145 },
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
            });

            //Enviar polígono para su procesamiento
            const buttonSend = document.createElement("div");
            AddButton(buttonSend, "Click para procesar el polígono", "<i class=\"bi bi-cloud-upload-fill fa-2x\"></i>", () => {

                if (isValid) {

                    window.$("#poligonoInfoModal").modal("show");
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
            }, map);

            const buttonMesh = document.createElement("div");
            AddButton(buttonMesh, "Click para mostrar la malla", "<i class=\"bi bi-hash fa-2x\"></i>", () => {
                var data = JSON.stringify({ "id": "@(ViewBag.id)" });
                window.$.ajax({
                    type: "POST",
                    data: data,
                    url: "/Home/getMesh",
                    contentType: 'application/json; charset=utf-8'
                }).done(function (data) {
                    console.log(data);
                    console.log(window.jQuery.isEmptyObject(window.jQuery.parseJSON(data)));
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
                            jsonData.lines.forEach(lines => lines.forEach(line => {
                                //console.log(line.pointStart.lat)
                                var line = new window.google.maps.Polyline({
                                    path: [{
                                        lat: line.pointStart.lat,
                                        lng: line.pointStart.lng
                                    }, {
                                        lat: line.pointEnd.lat,
                                        lng: line.pointEnd.lng
                                    }],
                                    //geodesic: line.geodesic
                                    geodesic: true,
                                    strokeColor: line.strokeColor,
                                    strokeOpacity: line.strokeOpacity,
                                    strokeWeight: line.strokeWeight
                                });
                                line.setMap(map);

                                for (let i = 0; i < jsonData.polygons.length; i++) {
                                    for (let j = 0; j < jsonData.polygons[i].length; j++) {
                                        bounds.extend(new window.google.maps.LatLng(jsonData.polygons[i][j].lat, jsonData.polygons[i][j].lng));
                                    }
                                }

                                map.fitBounds(bounds);
                            }));
                        } else {
                            alert("No se ha terminado de procesar la malla, vuelva a intentarlo más tarde.");
                        }
                    } else {
                        alert("Primero debe enviar el polígono creado.");
                    }
                });
            }, map);

            const buttonMeshEj = document.createElement("div");
            AddButton(buttonMeshEj, "Click para mostrar la malla de ejemplo", "<i class=\"bi bi-hash fa-2x\"><sub>ej:<sub></i>", () => {
                var data = JSON.stringify({ "id": "1637034373219" })
                window.$.ajax({
                    type: "POST",
                    data: data,
                    url: "/Home/getMesh",
                    contentType: 'application/json; charset=utf-8'
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

                    jsonData.lines.forEach(lines => lines.forEach(line => {
                        //console.log(line.pointStart.lat)
                        var line = new window.google.maps.Polyline({
                            path: [{
                                lat: line.pointStart.lat,
                                lng: line.pointStart.lng
                            }, {
                                lat: line.pointEnd.lat,
                                lng: line.pointEnd.lng
                            }],
                            //geodesic: line.geodesic
                            geodesic: true,
                            strokeColor: line.strokeColor,
                            strokeOpacity: line.strokeOpacity,
                            strokeWeight: line.strokeWeight
                        });
                        line.setMap(map);

                        for (let i = 0; i < jsonData.polygons.length; i++) {
                            for (let j = 0; j < jsonData.polygons[i].length; j++) {
                                bounds.extend(new window.google.maps.LatLng(jsonData.polygons[i][j].lat, jsonData.polygons[i][j].lng));
                            }
                        }

                        // The Center of the Bermuda Triangle - (25.3939245, -72.473816)
                        //console.log(bounds.getCenter());

                        map.fitBounds(bounds);


                    }));
                });

                window.$.ajax({
                    type: "POST",
                    data: data,
                    url: "/Home/getReport",
                    contentType: 'application/json; charset=utf-8'
                }).done(function (data) {
                    window.$("#container").html(data);
                });

            }, map);

            const buttonMenu = document.createElement("div");
            AddButton(buttonMenu, "Click para abrir el menú", "<i class=\"bi bi-menu-up fa-2x\"></i>", () => {
                window.$("#menuModal").modal("show");

            }, map);

            const buttonDataLocal = document.createElement("div");
            AddButton(buttonDataLocal, "Click para abrir el menú", "<i class=\"bi bi-menu-up fa-2x\"></i>", () => {
                window.$("#menuModal").modal("show");
            }, map);

            map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(buttonMenu);
            map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(buttonSend);
            map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(buttonMesh);
            map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(buttonMeshEj);
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
                    icon:
                        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                },
                polygonOptions: {
                    fillColor: '#BCDCF9',
                    strokeColor: '#57ACF9',
                    fillOpacity: 0.5,
                    strokeWeight: 2,
                    clickable: true,
                    editable: true,
                    draggable: true,
                    zIndex: 1
                }
            });

            window.google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
                /*if (event.type == 'circle') {
                    var radius = event.overlay.getRadius();
                    console.log(radius);
                }*/
                //console.log(Paths.length);
                if (event.type == 'polygon' && Paths.length < 1) {
                    var _polygon = event.overlay.getPaths();
                    var path = new Array();
                    _polygon.forEach(p => p.forEach(i => {
                        var p = new Object();
                        p.lat = i.lat();
                        p.lng = i.lng();
                        path.push(p);
                    }
                    ));
                    Paths.push(path);

                    //console.log(window.google.maps.geometry.spherical.computeArea(event.overlay.getPath()));
                    var area = window.google.maps.geometry.spherical.computeArea(event.overlay.getPath());
                    if (area > maxArea) {
                        isValid = false;
                        event.overlay.setOptions({ fillColor: "##fb0000", strokeColor: "#fb0000" });
                    } else {
                        isValid = true;
                        event.overlay.setOptions({ fillColor: "#BCDCF9", strokeColor: "#57ACF9" });
                    }
                    event.overlay.getPaths().forEach(function (path, index) {
                        path.addListener("set_at", function () {
                            var _area = window.google.maps.geometry.spherical.computeArea(event.overlay.getPath());
                            if (_area > maxArea) {
                                isValid = false;
                                event.overlay.setOptions({ fillColor: "##fb0000", strokeColor: "#fb0000" });
                            } else {
                                isValid = true;
                                event.overlay.setOptions({ fillColor: "#BCDCF9", strokeColor: "#57ACF9" });
                            }
                        });
                    });
                }
                else {
                    event.overlay.setMap(null);
                }
            });

            drawingManager.setMap(map);
        }

        window.initMap = initMap;
    }, []);

    return (
<div>
<div id="map" style={{ width: '100%', height: '500px' }}></div>

<div className="modal fade right" id="menuModal" tabIndex="-1" aria-labelledby="menuModal" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">DISEÑO HIDROLOGICO DEL PAISAJE</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ padding: '5px' }}>
                <table className="table table-bordered">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">QUE ES GRAVITACIONAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-secondary">
                            <td style={{ fontSize: '12px' }}>
                                El diseño hidrológico es una técnica para maximizar el uso beneficioso de los recursos hídricos de un área de tierra. Se refiere a un a intervención topográfica específica ligada al flijo de agua de lluvia.<br />&nbsp;
                                <img src={imagen1} width="100%" height="100%" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="table table-bordered">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">COMO FUNCIONA LA PLATAFORMA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-secondary">
                            <td style={{ fontSize: '12px' }}>
                                <img src={imagen2} width="80%" height="80%" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div className="modal" id="poligonoInfoModal" tabIndex="-1" aria-labelledby="poligonoInfoModal" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ingresar información</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="project-name" className="col-form-label">Nombre del proyecto:</label>
                        <input type="text" className="form-control" id="project-name" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="col-form-label">E-mail:</label>
                        <input type="text" className="form-control" id="email" required />
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" id="btnEnviarPoligono" className="btn btn-primary">Enviar polígono</button>
            </div>
        </div>
    </div>
</div>

<form>
    <div className="form-group">
        <input id="pac-input" className="form-control form-control-lg" type="text" placeholder="Buscar un lugar" />
    </div>
</form>

</div>
);
}

export default Layout;



