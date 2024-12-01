// outputNode.js

import { useState } from 'react';
import { Node } from './node';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
  <Node
    config={{
      id,
      name: 'Output-v2',
      handles: [
        { 
          id: `${id}-value`, 
          type: 'target',  
          position: 'Left' 
        },
      ],
      fields: [
        {
          type: 'input',
          label: 'Field Name',
          props: {
            type: 'text',
            value: currName,
            onChange: (e) => setCurrName(e.target.value),
          },
        },
        {
          type: 'select',
          label: 'Entry Type',
          props: {
            value: outputType,
            onChange: (e) => setOutputType(e.target.value),
            options: [
              { value: 'Text', label: 'Text' },
              { value: 'File', label: 'File' },
            ],
          },
        },
      ],        
    }}
  />
  );
}
