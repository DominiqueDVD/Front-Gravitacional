import axios from 'axios';

const RHINO_COMPUTE_URL = process.env.REACT_APP_RHINO_COMPUTE_URL;
const API_KEY = process.env.REACT_APP_RHINO_COMPUTE_KEY;

const algoritmo = "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";
let cacheKey = "md5_853B291B31B4B5DBDD794D45B640DE1C";

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
        "pointer": "md5_853B291B31B4B5DBDD794D45B640DE1C",
        "cachesolve": true,
        "values": [
            {
                "ParamName": "Radius",
                "InnerTree": {
                    "{0}": [
                        {
                            "type": "System.Double",
                            "data": "10.0"
                        }
                    ]
                }
            },
            {
                "ParamName": "Count",
                "InnerTree": {
                    "{0}": [
                        {
                            "type": "System.Double",
                            "data": "100.0"
                        }
                    ]
                }
            },
            {
                "ParamName": "Length",
                "InnerTree": {
                    "{0}": [
                        {
                            "type": "System.Double",
                            "data": "10.0"
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