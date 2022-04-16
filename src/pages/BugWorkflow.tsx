import * as React from 'react';
import { useMachine } from '@xstate/react';

import bugMachine from '../utils/machine';
import AnalyzeBug from '../views/bugMachine/AnalyzeBug';
import AssignOwner from '../views/bugMachine/AssignOwner';
import ProcessBug from '../views/bugMachine/ProcessBug';
import CloseBug from '../views/bugMachine/CloseBug';
import CreateBug from '../views/bugMachine/CreateBug';


const BugWorkflow: React.FC = () => { 
  const [current, sendState] = useMachine(bugMachine);

  const { context: { stateStatus } } = current

  return (
    <React.Fragment>
      <div>current state: {current.value}</div>
      {(current.matches('new') || stateStatus['new']) && <CreateBug submitBug={state => sendState('CREATE', state)} context={current.context} />}
      {(current.matches('triage') || stateStatus['triage']) && <AnalyzeBug acceptBug={() => sendState('ACCEPT')} rejectBug={(reason) => sendState('REJECT',  {rejectedReason: reason}) }/>}
      {(current.matches('open') || stateStatus['open']) && <AssignOwner assignOwner={(value) => sendState('INPROCESS', { owner: value })} />}
      {(current.matches('process') || stateStatus['process']) && <ProcessBug done={() => sendState('REVIEW')} />}
      {(current.matches('review') || stateStatus['review']) && <CloseBug close={() => sendState('REVIEW')} />}
    </React.Fragment>
  )
};

export default BugWorkflow;