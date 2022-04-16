import * as React from 'react';

import { IContext } from './../../utils/machine';
import Input from './../../component/Input'
import Textarea from './../../component/Textarea';
import Button from './../../component/Button';

import AccordionItem from '../../component/AccordionItem';

const createBugReducer = (
  state: { version: string; reproduce: string; expected: string },
  action: { type: string; payload: { [key: string]: string } }
) => { 
  const { type, payload } = action;
  switch (type) {
    case 'edit':
      return { ...state, ...payload };
    default: 
      return  {...state}
  }
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const CreateBug = ({ submitBug, context }: { submitBug: (state: Record<string, string>) => void, context: IContext}) => { 
  const [state, dispatch] = React.useReducer(createBugReducer, {version: '', reproduce: '', expected: ''})
  return (
    context.stateStatus['new'] ? (<div>{context.createRequirement.version}</div>): 
    <React.Fragment>
      <Input
        type={'text'}
        htmlFor={'version'}
        id={'version'}
        name={'version'}
        label={'version'}
        value={state.version}
        onChange={value => dispatch({ type: 'edit', payload: {'version': value}})}
      />
      <Textarea
        placeholder={'reproduce steps'}
        htmlFor={'reproduce'}
        id={'reproduce'}
        name={'reproduce'}
        label={'reproduce'}
        value={state.reproduce}
        onChange={value => dispatch({ type: 'edit', payload: {'reproduce': value}})}

      />
      <Textarea
        placeholder={'expected result'}
        htmlFor={'expected'}
        id={'expected'}
        name={'expected'}
        label={'expected'}
        value={state.expected}
        onChange={value => dispatch({ type: 'edit', payload: {'expected': value}})}
      />
      <Button text={'save'} onClick={_ => submitBug(state)}/>
    </React.Fragment>
  )
}

export default CreateBug;