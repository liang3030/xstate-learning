import * as React from 'react';

import { IContext } from './../../utils/machine';
import Button from '../../component/Button';
import Title from './../../component/Title'


const CloseBug = ({ close, context }: { close: () => void; context: IContext }) => { 

  return (
    <>
      <Title text={`05 Review and close bug`} />
      {context.stateStatus['close']
        ? <div>bug is done/close</div>
        : <React.Fragment>
            <Button text={'close'} onClick={_ => close()} />
          </React.Fragment>
      }
    </>
  )
}

export default CloseBug;