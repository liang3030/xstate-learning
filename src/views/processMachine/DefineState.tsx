import * as React from 'react';
import ReactJson from 'react-json-view'

import Button from './../../component/Button'

const DefineState = ({ nextStep, stateConfig, optionConfig }: { nextStep: () => void; stateConfig: { [key: string]: string };  optionConfig: {[key:string]: string}}) => { 

  return (
    <React.Fragment>
      {/* 
        1. use states key to specify a state configuration
        2. each state node provides multiple key configuration. the most important one is on. It is used for transfer system state
        2. it is a nested object, in the child object, the keys represent the possible status
        3. expect for states, it also needs to define initial state, id, and context.
      */}
        <div className={'font-sans text-sm font-normal text-slate-800 mb-3'}>Use <strong>states</strong> to define possible status. </div>
        <div className={'font-sans text-sm font-normal text-slate-800 mb-3'}>Use <strong>initial</strong> to set init state. </div>
    
      <div className={'font-sans text-sm font-normal text-slate-800 mb-1 italic'}>Example Code: </div>
      <div className={`bg-gray-100` }>
        <div>{`const bugWorkflow = createMachine (` }</div>
        <ReactJson src={stateConfig} name={false} displayDataTypes={false}/>
        <p>{`,` }</p>
        <ReactJson src={optionConfig} name={false} displayDataTypes={false}/>
          <div>{`)`}</div>
      </div>
   
      <Button text={'Next: add events'} onClick={_ => nextStep() }/>
    </React.Fragment>
  )
};

export default DefineState;