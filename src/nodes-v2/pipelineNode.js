// inputNode.js

import { useState } from 'react';
import { Node } from './node';

export const PipelineNode = ({ id, data }) => {
  const [batchMode, setBatchMode] = useState(false);
  const [pipeline, setPipeline] = useState('PIPELINE-A');

  return (
    <Node
      config={{
        id,
        name: 'Pipeline-v2',
        handles: [
          { 
            id: `${id}-value`, 
            type: 'target',  
            position: 'Left' 
          },
          { 
            id: `${id}-value`, 
            type: 'source',  
            position: 'Right' 
          },
        ],
        fields: [
          {
            type: 'input',
            label: 'Batch Mode',
            props: {
              type: 'checkbox',
              value: batchMode,
              onChange: (e) => setBatchMode(e.target.value),
            },
          },
          {
            type: 'select',
            label: 'Pipeline',
            props: {
              value: pipeline,
              onChange: (e) => setPipeline(e.target.value),
              options: [
                { value: 'PIPELINE-A', label: 'PIPELINE-A' },
                { value: 'PIPELINE-B', label: 'PIPELINE-B' },
              ],
            },
          },
        ],
      }}
    />
  );
}
