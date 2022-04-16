export default function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) { 
  return (
  <div className="accordion-item bg-white border border-gray-200">
    <h2 className="accordion-header mb-0" id="headingOne5">
      <button className="
        accordion-button
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne5" aria-expanded="true"
        aria-controls="collapseOne5">
          { title }
      </button>
    </h2>
    <div id="collapseOne5" className="accordion-collapse collapse show" aria-labelledby="headingOne5">
      <div className="accordion-body py-4 px-5">
        {children}
      </div>
    </div>
  </div>
  )
}