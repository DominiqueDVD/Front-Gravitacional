import axios from 'axios';

const API_KEY = process.env.REACT_APP_EOS_API_KEY;

const instance = axios.create({
    headers: {
      'x-api-key': API_KEY,
    },
    responseType: 'blob', // Ensure we get the data as a Blob
  });
  
  export const fetchRenderImageUrl = async () => {
    const response = await instance.get('https://api-connect.eos.com/api/render/S2/36/U/XU/2016/5/2/0/B04,B03,B02/10/611/354');
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  };
  
  export const fetchNdviImageUrl = async () => {
    const response = await instance.get('https://api-connect.eos.com/api/render/S2/36/U/XU/2016/5/2/0/NDVI/10/611/354');
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  };












  // import axios from 'axios';

// const API_KEY = process.env.REACT_APP_EOS_API_KEY;
// const BASE_URL = 'https://api-connect.eos.com/api/gdw/api';

// const instance = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     params: {
//         api_key: API_KEY,
//     },
// });

// interface RequestParams {
//     type: string;
//     params: {
//         bm_type: string;
//         date_start: string;
//         date_end: string;
//         geometry: {
//             coordinates: number[][][];
//             type: string;
//         };
//         reference: string;
//         sensors: string[];
//         limit: number;
//     };
// }

// export const sendRequest = async (data: RequestParams) => {
//     const response = await instance.post('', data);
//     return response.data;
// };

// export const fetchTaskById = async (taskId: string) => {
//     const response = await instance.get(`/${taskId}`);
//     return response.data;
// };

// export const fetchDatasetById = async (datasetId: string) => {
//     const response = await axios.get(`https://api-connect.eos.com/api/lms/search/v2/${datasetId}`, {
//         params: {
//             api_key: API_KEY,
//         },
//     });
//     return response.data;
// };