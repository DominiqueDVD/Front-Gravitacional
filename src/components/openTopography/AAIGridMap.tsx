import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface AAIGridMapProps {
  aaiGridData: string;
}

const parseAAIGrid = (aaiGridData: string) => {
  const lines = aaiGridData.trim().split('\n');
  const header = lines.slice(0, 6);
  const data = lines.slice(6);

  const ncols = parseInt(header[0].split(/\s+/)[1], 10);
  const nrows = parseInt(header[1].split(/\s+/)[1], 10);
  const xllcorner = parseFloat(header[2].split(/\s+/)[1]);
  const yllcorner = parseFloat(header[3].split(/\s+/)[1]);
  const cellsize = parseFloat(header[4].split(/\s+/)[1]);

  const values = data.flatMap(line => line.trim().split(/\s+/).map(Number));

  return { ncols, nrows, xllcorner, yllcorner, cellsize, values };
};

const AAIGridMap: React.FC<AAIGridMapProps> = ({ aaiGridData }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const { ncols, nrows, xllcorner, yllcorner, cellsize, values } = parseAAIGrid(aaiGridData);

    const canvas = document.createElement('canvas');
    canvas.width = ncols;
    canvas.height = nrows;

    const ctx = canvas.getContext('2d');

    if (ctx) {
      const imageData = ctx.createImageData(ncols, nrows);

      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        const color = value === -9999 ? [0, 0, 0, 0] : [value, value, value, 255];
        imageData.data.set(color, i * 4);
      }

      ctx.putImageData(imageData, 0, 0);
      setImageUrl(canvas.toDataURL());
    }
  }, [aaiGridData]);

  if (!imageUrl) {
    return <h1 style={{color: "black"}}>Cargando...</h1>;
  }

  const { ncols, nrows, xllcorner, yllcorner, cellsize } = parseAAIGrid(aaiGridData);
  const bounds: L.LatLngBoundsExpression = [
    [yllcorner, xllcorner],
    [yllcorner + cellsize * nrows, xllcorner + cellsize * ncols],
  ];

  return (
    <MapContainer center={[yllcorner + cellsize * nrows / 2, xllcorner + cellsize * ncols / 2]} zoom={13} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ImageOverlay
        url={imageUrl}
        bounds={bounds}
      />
    </MapContainer>
  );
};

export default AAIGridMap;
