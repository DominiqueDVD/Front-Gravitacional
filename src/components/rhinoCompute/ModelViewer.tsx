import React, { useState } from 'react';
import { computeGrasshopper } from './RhinoComputeService';
// import { computeGrasshopper } from '../services/RhinoComputeService';
import ThreeDView from './ThreeDView';

const ModelViewer: React.FC = () => {
    const [modelData, setModelData] = useState<any>(null);

    const handleCompute = async () => {
        const params = {
            definition: '../../../src/assets/HelloWorld.gh',
            values: {
                // Add your input parameters here
            }
        };

        try {
            const data = await computeGrasshopper(params);
            setModelData(data);
        } catch (error) {
            console.error('Error computing Grasshopper definition:', error);
        }
    };

    return (
        <div>
            <button onClick={handleCompute} className="btn btn-dark">Compute Model</button>
            <ThreeDView modelData={modelData} />
        </div>
    );
};

export default ModelViewer;