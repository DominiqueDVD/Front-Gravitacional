import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchRenderImageUrl, fetchNdviImageUrl } from '../../services/eosService';
// import './eosTest.css';


const EosRequestComponent = () => {
  const [renderImageUrl, setRenderImageUrl] = useState<string | null>(null);
  const [ndviImageUrl, setNdviImageUrl] = useState<string | null>(null);

  const [coords, setLatitude] = useState<string | ''>('');
  // const [longitude, setLongitude] = useState<number | ''>('');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const datos = document.getElementById("datos");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (coords !== '' && dateStart && dateEnd && datos !== null) {
      datos.innerHTML = "Coordenadas : " + coords + "<br></br>Fecha de inicio : " + dateStart + "<br></br>Fecha de fin : " + dateEnd;
    } else {
      alert('Por favor indique los datos');
    }
  }

  const {
    data: renderData,
    error: renderError,
    refetch: fetchRender,
  } = useQuery('renderImage', fetchRenderImageUrl, {
    enabled: false, // disable automatic query on mount
    onSuccess: (data) => setRenderImageUrl(data),
  });

  const {
    data: ndviData,
    error: ndviError,
    refetch: fetchNdvi,
  } = useQuery('ndviImage', fetchNdviImageUrl, {
    enabled: false, // disable automatic query on mount
    onSuccess: (data) => setNdviImageUrl(data),
  });

  const handleRenderButtonClick = () => {
    if (!renderImageUrl) {
      fetchRender();
    }
  };

  const handleNdviButtonClick = () => {
    if (!ndviImageUrl) {
      fetchNdvi();
    }
  };

  return (
    <div>
      <div className='eosTest'>
        <div className='grid'>
          <h5>Imagen satelital</h5>
          {/* {renderError && <div>Error: {getErrorMessage(renderError)}</div>} */}
          {renderImageUrl ? (
            <img src={renderImageUrl} alt="Rendered from API" />
          ) : (
            <div>No se ha buscado una imagen aún</div>
          )}
          <button className='btn btn-primary' onClick={handleRenderButtonClick}>Cargar imagen satelital</button>

          <br></br>
          <br></br>
          <h5>Indicador de vegetación</h5>
          {/* {ndviError && <div>Error: {getErrorMessage(ndviError)}</div>} */}
          {ndviImageUrl ? (
            <img src={ndviImageUrl} alt="NDVI from API" />
          ) : (
            <div>No se ha buscado una imagen NDVI aún</div>
          )}
          <button className='btn btn-primary' onClick={handleNdviButtonClick}>Cargar imagen NDVI</button>
        </div>
      </div>
    </div>
  );
};

export default EosRequestComponent;




// import React, { useEffect, useState } from 'react';
// import { useQuery, useMutation } from 'react-query';
// import { sendRequest, fetchTaskById, fetchDatasetById } from './apiService';

// const requestData = {
//   type: 'mt_stats',
//   params: {
//     bm_type: 'NDVI',
//     date_start: '2020-01-01',
//     date_end: '2020-01-02',
//     geometry: {
//       coordinates: [
//         [
//           [-86.86718, 41.317464],
//           [-86.86718, 41.331596],
//           [-86.862631, 41.331596],
//           [-86.862631, 41.317464],
//           [-86.86718, 41.317464],
//         ],
//       ],
//       type: 'Polygon',
//     },
//     reference: 'ref_20200924-00-00',
//     sensors: ['sentinel2'],
//     limit: 10,
//   },
// };

// const RATE_LIMIT = 10; // ten requests per minute
// const MINUTE_IN_SECONDS = 60;
// const INTERVAL_MS = (MINUTE_IN_SECONDS / RATE_LIMIT) * 1000;

// interface ApiError {
//   message: string;
//   [key: string]: any;
// }

// const RequestComponent: React.FC = () => {
//   const [taskId, setTaskId] = useState<string | null>(null);
//   const [datasetId, setDatasetId] = useState<string | null>(null);

//   const { data, error, mutate } = useMutation(sendRequest, {
//     onSuccess: (data) => {
//       // Assuming the response has a task_id, update the state with it
//       if (data && data.task_id) {
//         setTaskId(data.task_id);
//       }
//     },
//   });

//   const {
//     data: taskData,
//     error: taskError,
//     refetch: fetchTask,
//   } = useQuery(['taskData', taskId], () => fetchTaskById(taskId!), {
//     enabled: !!taskId,
//   });

//   const {
//     data: datasetData,
//     error: datasetError,
//     refetch: fetchDataset,
//   } = useQuery(['datasetData', datasetId], () => fetchDatasetById(datasetId!), {
//     enabled: !!datasetId,
//   });

//   const handleButtonClick = () => {
//     if (taskId) {
//       fetchTask();
//     } else {
//       mutate(requestData);
//     }
//   };

//   const handleFetchDataset = () => {
//     const datasetId = '<your_dataset_id>'; // Replace with the actual dataset ID
//     setDatasetId(datasetId);
//     fetchDataset();
//   };

//   if (error) {
//     const apiError = error as ApiError;
//     const errorMessage = apiError.message || 'An unknown error occurred';
//     return <div>Error: {errorMessage}</div>;
//   }

//   if (taskError) {
//     const apiError = taskError as ApiError;
//     const errorMessage = apiError.message || 'An unknown error occurred';
//     return <div>Error: {errorMessage}</div>;
//   }

//   if (datasetError) {
//     const apiError = datasetError as ApiError;
//     const errorMessage = apiError.message || 'An unknown error occurred';
//     return <div>Error: {errorMessage}</div>;
//   }

//   return (
//     <div>
//       <h1>API Data</h1>
//       {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <div>No data yet</div>}
//       <h1>Task Data</h1>
//       {taskData ? <pre>{JSON.stringify(taskData, null, 2)}</pre> : <div>No task data yet</div>}
//       <h1>Dataset Data</h1>
//       {datasetData ? <pre>{JSON.stringify(datasetData, null, 2)}</pre> : <div>No dataset data yet</div>}
//       <button onClick={handleButtonClick}>
//         {taskId ? 'Fetch Task Data' : 'Send Request'}
//       </button>
//       <button onClick={handleFetchDataset}>
//         Fetch Dataset Data
//       </button>
//     </div>
//   );
// };

// export default RequestComponent;