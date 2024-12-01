// toolbar.js

import { DraggableNode } from './draggableNode';
import { SubmitButton } from './submit';

export const PipelineToolbar = () => {

    return (
        <div className='toolbar'>
            <div className='node-grabber-panel'>
                <div className=''>
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='text' label='Text' />
                    <DraggableNode type='llm' label='LLM' />
                </div>
                <div>
                    <DraggableNode type='pipeline' label='Pipeline' />
                    <DraggableNode type='search' label='Search' />
                    <DraggableNode type='file' label='File' />
                    <DraggableNode type='call' label='Call' />
                    <DraggableNode type='note' label='Note' />
                </div>
                
            </div>
            <div className='node-submit-panel'>
                <div className=''>
                    <SubmitButton />
                </div>
            </div>
            
        </div>
    );
};
