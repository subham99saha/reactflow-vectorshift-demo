// inputNode.js

import { useState } from 'react';
import { Node } from './node';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <Node
      config={{
        id,
        name: 'Input-v2',
        handles: [
          { 
            id: `${id}-value`, 
            type: 'source',  
            position: 'Right' 
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
              value: inputType,
              onChange: (e) => setInputType(e.target.value),
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
