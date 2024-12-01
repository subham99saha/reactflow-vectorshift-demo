// Node.js

import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { Handle, Position } from 'reactflow';
import './node.css';

const selector = (state) => ({
  removeNode: state.removeNode
});

export const Node = ({ config }) => {
  const {
    id,
    name,
    handles = [],
    fields = [],
    color = 'white'
  } = config;

  const {
    removeNode
  } = useStore(selector,shallow);

  return (
    <div onDoubleClick={() => removeNode(id)} className="node" style={{background: color}}>
      {(name === 'Text-v2') ? 
        handles.filter(h => h.type === 'target').map((handle,idx) => {
          return <div key={idx} className='text-variables' style={{top: `${handle.y_pos}%`}}>{handle.name}</div>
        })  
      : ''}
      <div className='node-head'>
        <span>{name}</span>
      </div>
      <div>
        {fields.map((field, index) => {
          const { type, label, props = {} } = field;

          if (type === 'text') {
            return (
                <div key={index} className="" >
                    <div className='node-field'>
                        <div className='node-label'> {label} </div>              
                    </div>
                    
                </div>
            );
          }

          if (type === 'input') {
            return (
                <div key={index} className="" >
                    <div className='node-field'>
                        {(props.type === 'checkbox') ?
                        <div className='node-input-checkbox'>
                          <input {...props} />
                          <label>{label}</label>
                        </div>
                        : (props.type === 'file') ?
                        <>
                          <label htmlFor={`${id}-${index}-file`} className="node-input-file">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                            {label}
                          </label>
                          {(props.value != '') ? props.value.split('\\')[2] : ''}
                          <input id={`${id}-${index}-file`} {...props} />                        
                        </>
                        : <>
                          <div className='node-label'> {label} </div>  
                          <input {...props} className='node-input' />
                        </>}              
                    </div>
                    
                </div>
            );
          }

          if (type === 'textarea') {
            return (
                <div key={index} className="" >
                    <div className='node-field'>
                        <div className='node-label'> {label} </div>  
                        <textarea {...props} className='node-text' /> 
                    </div>
                    
                </div>
            );
          }

          if (type === 'button') {
            return (
                <div key={index} className="" >
                    <div className='node-field'>
                        <button {...props} className='node-button'> {label} </button>              
                    </div>
                    
                </div>
            );
          }

          if (type === 'select') {
            const { options = [], ...restProps } = props;
            return (
                <div key={index} className="" >
                    <div className='node-field'>
                        <div className='node-label'> {label} </div> 
                        <div>
                            <select {...restProps} className='node-select'>
                                {options.map((opt, i) => (
                                    <option key={i} value={opt.value}>
                                    {opt.label}
                                    </option>
                                ))}
                            </select> 
                        </div>                      
                    </div>
                    
              </div>
            );
          }

          return null;
        })}
      </div>
      {handles.map((handle, idx) => (
        <Handle
          key={idx}
          type={handle.type}
          position={Position[handle.position]}
          id={handle.id}
          className='node-handle'
          style={handle.style || {}}
        />
      ))}
    </div>
  );
};
