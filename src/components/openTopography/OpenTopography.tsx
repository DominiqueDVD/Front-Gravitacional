import React, { useState } from 'react';
import axios from 'axios';
import AAIGridMap from './AAIGridMap';
import Loader from '../usabilidad/Loader';

const OpenTopography: React.FC = () => {
  const [south, setSouth] = useState('-36.61');
  const [north, setNorth] = useState('-36.6');
  const [west, setWest] = useState('-72.11');
  const [east, setEast] = useState('-72.1');
  const [aaiGridData, setAaiGridData] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const OPENTOPOGRAPHY_API_KEY = process.env.REACT_APP_OPENTOPOGRAPHY_API_KEY;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setAaiGridData(null);
    setDownloadUrl(null);  // Reset download URL
    setLoading(true);  // Iniciar la carga

    try {
      // Validar que las coordenadas sean números
      const southNum = parseFloat(south);
      const northNum = parseFloat(north);
      const westNum = parseFloat(west);
      const eastNum = parseFloat(east);

      if (isNaN(southNum) || isNaN(northNum) || isNaN(westNum) || isNaN(eastNum)) {
        throw new Error('Por favor ingrese coordenadas numéricas válidas');
      }
      const response = await axios.get(`https://portal.opentopography.org/API/globaldem`, {
        params: {
          demtype: 'AW3D30_E',
          south: southNum,
          north: northNum,
          west: westNum,
          east: eastNum,
          outputFormat: 'AAIGrid',
          API_Key: OPENTOPOGRAPHY_API_KEY,
        },
      });

      setAaiGridData(response.data);

      // Crear un blob y generar una URL de descarga
      const blob = new Blob([response.data], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err: any) {
      setError(err.message || 'Error obteniendo datos de OpenTopography API');
      console.error(err);
    } finally {
      setLoading(false);  // Finalizar la carga
    }
  };

  return (
    <div>
      <div className="d-flex p-2">
        <div className="w-50 p-3">
          <h1>OpenTopography API Request</h1>
          <form onSubmit={handleSubmit}>
            <h5>Ingresar coordenadas de los bordes en formato WGS 84</h5>
            <div>
              <label>
                Sur:
                <input
                  type="text"
                  value={south}
                  onChange={(e) => setSouth(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Norte:
                <input
                  type="text"
                  value={north}
                  onChange={(e) => setNorth(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Oeste:
                <input
                  type="text"
                  value={west}
                  onChange={(e) => setWest(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Este:
                <input
                  type="text"
                  value={east}
                  onChange={(e) => setEast(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit" className='btn btn-primary'>Buscar</button>
          </form>
        </div>
        <div className="w-50 p-3">
          {loading && <div>
            <Loader />
          </div>}

          {error && <div style={{ color: 'red' }}>{error}</div>}

          {aaiGridData && (
            <div>
              <h2>Resultado</h2>{downloadUrl && (
                <div>
                  <a href={downloadUrl} download={"grid-data-" + Date.now() + ".asc"}>
                    <button className='btn btn-dark'>Descargar archivo AAIGrid</button>
                  </a>
                </div>
              )}
              <AAIGridMap aaiGridData={aaiGridData} />
            </div>
          )}

        </div>
      </div>
    </div >
  );
};

export default OpenTopography;
