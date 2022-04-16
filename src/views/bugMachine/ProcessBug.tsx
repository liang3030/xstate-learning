import * as React from 'react';

import Button from '../../component/Button';


const ProcessBug = ({ done }: { done: () => void }) => { 

  return (
    <React.Fragment>
      <Button text={'review'} onClick={_ => done()} />
    </React.Fragment>
  )
}

export default ProcessBug;