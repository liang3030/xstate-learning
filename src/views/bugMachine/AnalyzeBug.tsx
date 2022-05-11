import * as React from 'react';

import { IContext } from './../../utils/machine';
import Textarea from '../../component/Textarea';
import Button from '../../component/Button';
import Title from './../../component/Title'



const AnalyzeBug = ({ acceptBug, rejectBug, context }: { acceptBug: () => void; rejectBug: (reason: string) => void;  context: IContext}) => { 
  const [state, setState] = React.useState('');
  const [rejectedReason, setRejectedReason] = React.useState('')

  return (
    <>
      <Title text={`02 Analyze bug`} />
      {
        context.stateStatus['triage']
          ? <div>{ context.rejectedReason? `reject: ${context.rejectedReason}`: `accept`} </div>
          : <React.Fragment>
              <Button text={'accept'} onClick={_ => acceptBug()} />
              <Button text={'reject'} onClick={_ => setState('reject')} />
              {state === 'reject' && (
                <>
                  <Textarea
                  placeholder={'rejected Reason'}
                  htmlFor={'rejectedReason'}
                  id={'rejectedReason'}
                  name={'rejectedReason'}
                  label={'rejectedReason'}
                  value={rejectedReason}
                  onChange={value => setRejectedReason(value)}
                  />
                  <Button text={'save'} onClick={() => rejectBug(rejectedReason)} />
                </>
              ) }
            </React.Fragment>
      }
      </>
  )
}

export default AnalyzeBug;