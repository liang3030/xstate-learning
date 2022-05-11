export default function Title({ text }: { text: string; }) { 
  return (
    <div className={ "px-0 py-3 text-left sm:px-0 italic text-green-800"} >
      {text}
    </div>
  )
}