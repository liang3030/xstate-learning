import * as React from 'react';
import ReactJson from 'react-json-view'

import Button from '../../component/Button'

const DefineGuards = ({ nextStep, stateConfig, optionConfig }: { nextStep: () => void; stateConfig: { [key: string]: any };  optionConfig: {[key:string]: any}}) => { 
  return (
    <React.Fragment>
      {/* 

      */}
      <div className={'font-sans text-sm font-normal text-slate-800 mb-3'}>In each state node, use <strong>on</strong> to define events object.</div>
      <div className={'font-sans text-sm font-normal text-slate-800 mb-3'}>It could define target state and the actions during the transition.</div>

      <div className={'font-sans text-sm font-normal text-slate-800 mb-1 italic'}>Example Code: </div>
      <div className={`bg-gray-100` }>
      <div>{`const bugWorkflow = createMachine (` }</div>
      <ReactJson src={stateConfig} name={false} displayDataTypes={false}/>
      <p>{`,` }</p>
      <ReactJson src={optionConfig} name={false} displayDataTypes={false}/>
      <div>{`)` }</div>
      </div>
      <Button text={'Next: add delay'} onClick={_ => nextStep() }/>
    </React.Fragment>
  )
};

export default DefineGuards;