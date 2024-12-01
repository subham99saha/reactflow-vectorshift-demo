// inputNode.js

import { useState } from 'react';
import { Node } from './node';

export const FileNode = ({ id, data }) => {
  const [fileObj, setFileObj] = useState('');
  const [shouldProcess, setShouldProcess] = useState(false);

  return (
    <Node
      config={{
        id,
        name: 'File-v2',
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
            label: 'Upload file',
            props: {
              type: 'file',
              value: fileObj,
              onChange: (e) => { setFileObj(e.target.value); console.log({file: e.target.value}) },
            },
          },
          {
            type: 'input',
            label: 'Process Files into Text',
            props: {
              type: 'checkbox',
              value: shouldProcess,
              onChange: (e) => setShouldProcess(e.target.value),
            },
          },
        ],
      }}
    />
  );
}
