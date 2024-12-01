// textNode.js

import { useState, useEffect, useRef } from 'react';
import { useUpdateNodeInternals } from 'reactflow';

import { Node } from './node';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [varHandles, setVarHandles] = useState([]);
  const textareaRef = useRef(null);

  const handletext = (val) => {
    setCurrText(val)    
  }

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const textarea = textareaRef.current;
      // textarea.style.height = 'auto';
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      textarea.style.height = `${(textarea.scrollHeight - lineHeight)}px`;
    }

    const regex = /{{(.*?)}}/g;
    const matches = [...currText.matchAll(regex)];
    const variables = matches.map(match => match[1].trim());
    // if (variables.length != varHandles.length) {
    if (true) {
      let newVarHandles = []
      variables.map((v,i) => {
        let y_pos = 100/(variables.length + 1) * (i+1)
        newVarHandles.push({ 
          id: `${id}-value-${i}`, 
          type: 'target',  
          position: 'Left',
          style: {top: `${y_pos}%`},
          name: v,
          y_pos
        })
      })
      setVarHandles(newVarHandles)
    }
  },[currText])

  const updateNodeInternals = useUpdateNodeInternals();
  useEffect(() => {
    updateNodeInternals(id);
  }, [varHandles,updateNodeInternals]);

  return (
    <Node
      config={{
        id,
        name: 'Text-v2',
        handles: [
          { 
            id: `${id}-value`, 
            type: 'source',  
            position: 'Right'  
          },
          ...varHandles
        ],
        fields: [
          {
            type: 'textarea',
            label: 'Name:',
            props: {
              ref: textareaRef,
              rows: 1,
              value: currText,
              onChange: (e) => handletext(e.target.value),
            },
          },
        ],        
      }}
    />
  );
}
