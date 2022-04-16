export default function Textarea(
  { placeholder, htmlFor, name, id, label, value, onChange }: { placeholder: string; htmlFor: string; name: string; id: string; label: string; value: string; onChange: (val:string)=> void }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={"block text-sm font-medium text-gray-700"}>{label}</label>
      <textarea id={id} name={name} rows={3} className={"shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"} placeholder={placeholder} value={value} onChange={e=> onChange(e.target.value) }></textarea>
    </div>
  )
}