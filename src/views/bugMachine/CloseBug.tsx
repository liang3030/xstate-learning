import * as React from 'react';

import Button from '../../component/Button';


const CloseBug = ({ close }: { close: () => void }) => { 

  return (
    <React.Fragment>
      <Button text={'close'} onClick={_ => close()} />
    </React.Fragment>
  )
}

export default CloseBug;