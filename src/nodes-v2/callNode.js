// inputNode.js

import { useState } from 'react';
import { Node } from './node';

export const CallNode = ({ id, data }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  return (
    <Node
      config={{
        id,
        name: 'Call-v2',
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
            label: 'Select Date',
            props: {
              type: 'date',
              value: date,
              onChange: (e) => setDate(e.target.value),
            },
          },
          {
            type: 'input',
            label: 'Select Time',
            props: {
              type: 'time',
              value: time,
              onChange: (e) => setTime(e.target.value),
            },
          },
          {
            type: 'button',
            label: 'Schedule Call',
            props: {
              onClick: () => {
                console.log('Call Scheduled')
              }
            },
          },
        ],
      }}
    />
  );
}
