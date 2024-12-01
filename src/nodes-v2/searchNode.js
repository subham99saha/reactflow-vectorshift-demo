// inputNode.js

import { useState } from 'react';
import { Node } from './node';

export const SearchNode = ({ id, data }) => {
  const [query, setQuery] = useState('');
  const [resultsCount, setResultsCount] = useState(3);

  return (
    <Node
      config={{
        id,
        name: 'Search-v2',
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
            label: 'Query',
            props: {
              type: 'text',
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: 'Search query'
            },
          },
          {
            type: 'input',
            label: 'Results Count',
            props: {
              type: 'number',
              value: resultsCount,
              onChange: (e) => setResultsCount(e.target.value),
            },
          },
        ],
      }}
    />
  );
}
