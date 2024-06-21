import axios from 'axios';

const RHINO_COMPUTE_URL = process.env.REACT_APP_RHINO_COMPUTE_URL + '/compute/grasshopper';
const API_KEY = process.env.REACT_APP_RHINO_COMPUTE_KEY;

interface RhinoComputeParams {
    definition: string;
    values: { [key: string]: any };
}

export const computeGrasshopper = async (params: RhinoComputeParams) => {
    try {
        const response = await axios.post(RHINO_COMPUTE_URL, params, {
            headers: {
                'RhinoComputeKey': API_KEY,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error computing Grasshopper definition:', error);
        throw error;
    }
};