import * as React from 'react';
import ReactJson from 'react-json-view'


import Button from '../../component/Button'

const DefineEvents = ({ nextStep, stateConfig, optionConfig }: { nextStep: () => void; stateConfig: { [key: string]: any };  optionConfig: {[key:string]: any}}) => { 
  return (
    <React.Fragment>
      {/* 
        1. use key on to define state;
        2. define target state
        3. define actions as well. actions are fire-and-forget effect. It has 3 ways.
        4. execute on entry, exit and during the transition.
      */}
      <div className={'font-sans text-sm font-normal text-slate-800 mb-3'}>In each state node, use <strong>on</strong> to define event.</div>
      <div className={'font-sans text-sm font-normal text-slate-800 mb-3'}>Event could make instance transfer from one status to another</div>

      <div className={'font-sans text-sm font-normal text-slate-800 mb-1 italic'}>Example Code: </div>
      <div className={`bg-gray-100`}>
      <div>{`const bugWorkflow = createMachine (` }</div>
      <ReactJson src={stateConfig} name={false} displayDataTypes={false}/>
      <p>{`,` }</p>
      <ReactJson src={optionConfig} name={false} displayDataTypes={false}/>
      <div>{`)` }</div>
      </div>
      <Button text={'Next: add effect (actions)'} onClick={_ => nextStep() }/>
    </React.Fragment>
  )
};

export default DefineEvents;