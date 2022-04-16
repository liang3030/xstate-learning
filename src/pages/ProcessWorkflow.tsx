import * as React from 'react';
import { useMachine } from '@xstate/react';

import processWorkflow from './../utils/processMachine';
import Init from './../views/processMachine/InitProcess'
import DefineState from '../views/processMachine/DefineState';
import DefineEvents from '../views/processMachine/DefineEvents';
import DefineActionEffects from '../views/processMachine/DefineActionEffects';
import DefineInvokeffects from './../views/processMachine/DefineInvokeEffects';
import DefineGuards from '../views/processMachine/DefineGuards';
import DefineDelay from '../views/processMachine/DefineDelay';

const Process: React.FC = () => { 
  const [current, sendState] = useMachine(processWorkflow);

  return (
    <div className={'md:container md:mx-auto my-8'}>
      <div className={'font-sans text-lg font-semibold text-slate-800 my-3'}>Basic Introduction:</div>
      {current.matches('init') &&
        <Init
          nextStep={() => sendState('DEFINESTATE')}
          stateConfig={current.context.bugMachineStates}
          optionConfig={current.context.bugMachineOthers}
        />
      }
      {current.matches('statesReady') &&
        <DefineState
          nextStep={() => sendState('ADDEVENTS')}
          stateConfig={current.context.bugMachineStates}
          optionConfig={current.context.bugMachineOthers}
        />
      }
      {current.matches('eventsReady') &&
        <DefineEvents
          nextStep={() => sendState('ADDEFFECTS')}
          stateConfig={current.context.bugMachineStates}
          optionConfig={current.context.bugMachineOthers}
        />
      }
      {current.matches('effectsActionReady') &&
        <DefineActionEffects
          nextStep={() => sendState('ADDINVOKE')}
          stateConfig={current.context.bugMachineStates}
          optionConfig={current.context.bugMachineOthers}
        />
      }
      {current.matches('effectsInvokeReady') &&
        <DefineInvokeffects
          nextStep={() => sendState('ADDGUARD')}
          stateConfig={current.context.bugMachineStates}
          optionConfig={current.context.bugMachineOthers}
        />
      }
      {current.matches('guardReady') &&
        <DefineGuards
          nextStep={() => sendState('ADDDELAY')}
          stateConfig={current.context.bugMachineStates}
          optionConfig={current.context.bugMachineOthers}
        />
      } 
      {current.matches('delayReady') &&
        <DefineDelay
          nextStep={() => sendState('ALLREADY')}
          stateConfig={current.context.bugMachineStates}
          optionConfig={current.context.bugMachineOthers}
        />
      } 
    </div>
  )
};

export default Process;