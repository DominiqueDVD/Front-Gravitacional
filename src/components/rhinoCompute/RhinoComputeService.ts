import axios from 'axios';

const RHINO_COMPUTE_URL = process.env.REACT_APP_RHINO_COMPUTE_URL;
const API_KEY = process.env.REACT_APP_RHINO_COMPUTE_KEY;

const algoritmo = "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";
let cacheKey = "";

interface RhinoComputeParams {
    // definition: string;
    values: { [key: string]: any };
}

export const computeIO = async () => {
    let data = JSON.stringify({
        "absolutetolerance": 0.001,
        "angletolerance": 1,
        "modelunits": "Millimeters",
        "dataversion": 8,
        "algo": algoritmo,
        "pointer": null,
        "cachesolve": false,
        "values": [],
        "warnings": [],
        "errors": []
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${RHINO_COMPUTE_URL}io`,
        headers: {
            'RhinoComputeKey': API_KEY,
            'Content-Type': 'application/json'
        },
        data: data
    };
    try {
        axios.request(config)
            .then((response) => {
                cacheKey = response.data.CacheKey;
                console.log(response.data);
                return (response.data);
            })
            .catch((error) => {
                return (error)
            });
    } catch (error) {
        console.error('Error computando IO:', error);
        throw error;
    }
}

export const computeGrasshopper = async (params: RhinoComputeParams) => {
    console.log(computeIO());
    let data = JSON.stringify({
        "absolutetolerance": 0.001,
        "angletolerance": 1,
        "modelunits": "Millimeters",
        "dataversion": 7,
        "algo": null,
        "pointer": "md5_4EE4EF785B0FA42D6071F34259D2C580",
        "cachesolve": true,
        "values": [
            {
                "ParamName": "A",
                "InnerTree": {
                    "{0}": [
                        {
                            "type": "System.Int32",
                            "data": "3"
                        }
                    ]
                }
            },
            {
                "ParamName": "B",
                "InnerTree": {
                    "{0}": [
                        {
                            "type": "System.Int32",
                            "data": "6"
                        }
                    ]
                }
            }
        ],
        "warnings": [],
        "errors": []
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${RHINO_COMPUTE_URL}grasshopper`,
        headers: {
            'RhinoComputeKey': API_KEY,
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return (response.data);
        })
        .catch((error) => {
            console.log(error);
            return (error);
        });

};