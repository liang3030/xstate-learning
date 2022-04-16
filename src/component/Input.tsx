// import * as React from 'react';

export default function Input(
  { type, htmlFor, name, id, label, value, onChange }: { type: string; htmlFor: string; name: string; id: string; label: string; value: string; onChange: (val: string)=> void }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={"block text-sm font-medium text-gray-700"}>{label}</label>
      <input type={type} name={name} id={id} className={"focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"} placeholder={'placeholder'} value={value} onChange={e=> onChange(e.target.value) }/>
    </div>
  )
}