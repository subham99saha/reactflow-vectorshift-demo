// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    removeNode: (id) => {
      let nodesList = get().nodes
      let edgesList = get().edges
      set({
        nodes: [...nodesList.filter(node => node.id != id)]
      });
      set({
        edges: [...edgesList.filter(edge => (edge.source != id) && (edge.target != id))]
      });
      console.log('Node removed')
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      // console.log({connection})
      set({
        edges: addEdge({
          ...connection,
          type: 'buttonedge',
          animated: true, 
          markerEnd: {
            type: MarkerType.ArrowClosed, 
            height: '20px', 
            width: '20px',
            color: '#8080ff',
          },
          // label: 'label',
          style: {
            strokeWidth: 2,
            stroke: '#8080ff',
          }
        }, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
  }));
