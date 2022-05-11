import * as React from 'react';

import { IContext } from './../../utils/machine';
import Button from '../../component/Button';
import Input from '../../component/Input';
import Title from './../../component/Title'


const AssignOwner = ({ assignOwner, context }: { assignOwner: (owner: string) => void; context: IContext }) => { 
  const [owner, setOwner] = React.useState('');

  return (
    <>
      <Title text={`03 Assign owner`} />
      {context.stateStatus['open']
        ? <div>{ context.owner}</div>
        : <React.Fragment>
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
      }
      </>
  )
}

export default AssignOwner;