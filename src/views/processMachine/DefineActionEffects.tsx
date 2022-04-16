import * as React from 'react';
import ReactJson from 'react-json-view'

import Button from '../../component/Button'

const DefineActionEffects = ({ nextStep, stateConfig, optionConfig }: { nextStep: () => void; stateConfig: { [key: string]: any };  optionConfig: {[key:string]: any}}) => { 
  return (
    <React.Fragment>
      {/* 
        1. use key on to define state;
        2. define target state
        3. define actions as well. actions are fire-and-forget effect. It has 3 ways.
        4. execute on entry, exit and during the transition.
      */}
      <div className={'font-sans text-sm font-normal text-slate-800 mb-3'}>It has two types side effects: </div>
      <div className={'font-sans text-sm font-normal text-slate-800 mb-3'}>1. "fire-and-forget" effects: there is no impact on the current consequence of state transition </div>
      <div className={'font-sans text-sm font-normal text-slate-800 mb-3'}>2. invoked effects: execute a side-effect that can send and receive events asynchronously </div>


      <div className={'font-sans text-sm font-normal text-slate-800 mb-1 italic'}>Example Code: </div>
      <div className={`bg-gray-100` }>
      <div>{`const bugWorkflow = createMachine (` }</div>
      <ReactJson src={stateConfig} name={false} displayDataTypes={false}/>
      <p>{`,` }</p>
      <ReactJson src={optionConfig} name={false} displayDataTypes={false}/>
      <div>{`)` }</div>
      </div>
      <Button text={'Next: add effect(invoke)'} onClick={_ => nextStep() }/>
    </React.Fragment>
  )
};

export default DefineActionEffects;