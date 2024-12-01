// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import Modal from 'react-modal';

import axios from 'axios';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges
});

export const SubmitButton = () => {
    const [message,setMessage] = useState('')
    const [viewResponseModal, setViewResponseModal] = useState(false);

    const {
        nodes,
        edges
    } = useStore(selector,shallow);
    const submit = () => {
        console.log({
            nodes,
            edges
        })

        axios.request({
            method: 'post',
            url: 'http://127.0.0.1:8000/pipelines/parse',
            data: {
                nodes,
                edges
            }
        }).then(function (response) {
            console.log(response);
            setMessage(`The current pipeline consists of ${response.data.num_nodes} nodes, ${response.data.num_edges} edges, and ${!(response.data.is_dag) ? 'does not form' : 'forms'} a Directed Acyclic Graph`)
            setViewResponseModal(true)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    

    return (<>
        <Modal
            isOpen={viewResponseModal}
            onRequestClose={() => setViewResponseModal(false)}
            className="response-modal"
            contentLabel="Response Modal"
        >
            {/* <button onClick={() => setViewResponseModal(false)}>close</button> */}
            <p>{message}</p>
        </Modal>
        <div
            className="submit-button"
            onClick={submit}
        >
            <span className='node-grabber-svg'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg>
            </span>
            <span className='node-grabber-label'>Submit</span>
        </div>
    </>
        
    );
}
