import * as React from 'react';

import Textarea from '../../component/Textarea';
import Button from '../../component/Button';


const AnalyzeBug = ({ acceptBug, rejectBug }: { acceptBug: () => void;  rejectBug: (reason: string)=> void}) => { 
  const [state, setState] = React.useState('');
  const [rejectedReason, setRejectedReason] = React.useState('')

  return (
    <React.Fragment>
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
          <Button text={'reject'} onClick={() => rejectBug(rejectedReason)} />
        </>
      ) }
      
    </React.Fragment>
  )
}

export default AnalyzeBug;