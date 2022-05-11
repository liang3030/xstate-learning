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
    <div className="container mx-auto">
      {(current.matches('new') || stateStatus['new']) && <CreateBug submitBug={state => sendState('CREATE', state)} context={current.context} />}
      {(current.matches('triage') || stateStatus['triage']) && <AnalyzeBug acceptBug={() => sendState('ACCEPT')} rejectBug={(reason) => sendState('REJECT',  {rejectedReason: reason}) } context={current.context}/>}
      {(current.matches('open') || stateStatus['open']) && <AssignOwner assignOwner={(value) => sendState('INPROCESS', { owner: value })} context={current.context}/>}
      {(current.matches('process') || stateStatus['process']) && <ProcessBug done={() => sendState('REVIEW')} context={current.context}/>}
      {(current.matches('review') || stateStatus['review']) && <CloseBug close={() => sendState('DONE')} context={current.context}/>}
    </div>
  )
};

export default BugWorkflow;