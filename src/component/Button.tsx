export default function Button({ text, onClick }: { text: string; onClick: (e: React.MouseEvent)=> void }) { 
  return (
    <div className={ "px-4 py-3 text-right sm:px-6"} >
      <button onClick={onClick} className={"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}>{text}</button>
    </div>
  )
}