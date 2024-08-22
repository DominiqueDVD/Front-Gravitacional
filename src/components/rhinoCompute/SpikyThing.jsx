import React, { useState, useEffect } from 'react';
import RhinoViewer from './RhinoViewer';

function SpikyThing() {
    const [meshData, setMeshData] = useState(null);

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("RhinoComputeKey", "gravitacional");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "absolutetolerance": 0.001,
            "angletolerance": 1,
            "modelunits": "Millimeters",
            "dataversion": 7,
            "algo": null,
            "pointer": "md5_E1E7CE4C192A75F390CE260306FDFF7C",
            "cachesolve": true,
            "values": [
                {
                    "ParamName": "Radius",
                    "InnerTree": {
                        "{0}": [
                            {
                                "type": "System.Double",
                                "data": "9.0"
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
                                "data": "77.0"
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
                                "data": "5.0"
                            }
                        ]
                    }
                }
            ],
            "warnings": [],
            "errors": []
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const fetchData = async () => {
            // Aquí se haría la solicitud al endpoint /grasshopper
            const response = await fetch("http://rhino-compute-loadbalancer-824415098.us-east-1.elb.amazonaws.com/grasshopper", requestOptions);
            const result = await response.json();

            // Aquí tomas el primer valor de la malla que recibes
            const meshData = result.values[0].InnerTree['{0}'][0];
            setMeshData(meshData);
        };

        fetchData();
    }, []);

    return (
        <div>
            {meshData ? <RhinoViewer meshData={meshData} /> : <p>Loading...</p>}
        </div>
    );
}

export default SpikyThing;