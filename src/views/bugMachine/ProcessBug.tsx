import * as React from 'react';

import { IContext } from './../../utils/machine';
import Button from '../../component/Button';
import Title from './../../component/Title'


const ProcessBug = ({ done, context }: { done: () => void; context: IContext }) => { 

  return (
    <>
      <Title text={`04 Process bug`} />
      {context.stateStatus['process']
        ? <div>implementing is done</div>
        : <React.Fragment>
          <div>{`${context.owner} is working on this bug`}</div>
            <Button text={'review'} onClick={_ => done()} />
          </React.Fragment>
      }
    </>
  )
}

export default ProcessBug;