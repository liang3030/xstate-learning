import * as React from 'react';

import Button from '../../component/Button';
import Input from '../../component/Input';


const AssignOwner = ({ assignOwner }: { assignOwner: (owner: string) => void }) => { 
  const [owner, setOwner] = React.useState('');

  return (
    <React.Fragment>
      <Input
        type={'text'}
        htmlFor={'owner'}
        id={'owner'}
        name={'owner'}
        label={'owner'}
        value={owner}
        onChange={value => setOwner(value)}
      />
      <Button text={'save'} onClick={_ => assignOwner(owner)} />
      
    </React.Fragment>
  )
}

export default AssignOwner;