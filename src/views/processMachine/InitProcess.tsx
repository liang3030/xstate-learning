import * as React from 'react';
import ReactJson from 'react-json-view'

import Button from './../../component/Button'

const Init = ({ nextStep, stateConfig, optionConfig }: { nextStep: () => void; stateConfig: { [key: string]: any };  optionConfig: {[key:string]: any}}) => { 
  return (
    <React.Fragment>
      {/* 
        1. Created by createMachine function;
        2. In the function, there are two object parameters
        3. First object is states config with context
        4. Second objcet is options config for actions, guard, service and delay
      */}
      <div className={'font-sans text-sm font-normal text-slate-800 mb-3'}>State machines are defined by <strong>createMachine()</strong> factory function</div>
      
      <div className={'font-sans text-sm font-normal text-slate-800 mb-1 italic'}>Example Code: </div>

      <div className={`bg-gray-100` }>
      <div>{`const bugWorkflow = createMachine (` }</div>
      <ReactJson src={stateConfig} name={false} displayDataTypes={false}/>
      <p>{`,` }</p>
      <ReactJson src={optionConfig} name={false} displayDataTypes={false}/>
        <div>{`)`}</div>
      </div>

      <Button text={'Next: define state'} onClick={_ => nextStep() }/>
    </React.Fragment>
  )
};

export default Init;