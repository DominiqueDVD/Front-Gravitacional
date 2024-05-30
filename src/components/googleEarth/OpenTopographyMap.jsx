import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const parseAAIGrid = (aaiGridText) => {
  const lines = aaiGridText.split('\n');
  const header = {};
  let dataStartIndex = 0;

  // Parse the header
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const [key, value] = line.split(/\s+/);
    header[key.toLowerCase()] = parseFloat(value);

    if (key.toLowerCase() === 'nodata_value') {
      dataStartIndex = i + 1;
      break;
    }
  }

  // Parse the data
  const data = [];
  for (let i = dataStartIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(/\s+/).map(parseFloat);
    data.push(...values);
  }

  return { header, data };
};

const generateLatLonPoints = (gridData) => {
  const { header, data } = gridData;
  const points = [];
  const { ncols, nrows, xllcorner, yllcorner, cellsize, nodata_value } = header;

  for (let row = 0; row < nrows; row++) {
    for (let col = 0; col < ncols; col++) {
      const value = data[row * ncols + col];
      if (value !== nodata_value) {
        const lat = yllcorner + (nrows - row - 1) * cellsize;
        const lon = xllcorner + col * cellsize;
        points.push({ lat, lon, value });
      }
    }
  }

  return points;
};

const OpenTopographyMap = () => {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://portal.opentopography.org/API/globaldem?demtype=AW3D30_E&south=50&north=50.1&west=14.35&east=14.6&outputFormat=AAIGrid&API_Key=cad9618d16cbc4b643a97c683bdc6b68', {
          responseType: 'text',
        });
        const gridData = parseAAIGrid(response.data);
        const latLonPoints = generateLatLonPoints(gridData);
        setPoints(latLonPoints);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from OpenTopography API', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {points.map((point, index) => (
        <Marker key={index} position={[point.lat, point.lon]}>
          <Popup>
            Value: {point.value}<br />Lat: {point.lat}, Lon: {point.lon}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OpenTopographyMap;
