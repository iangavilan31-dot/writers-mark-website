'use client'

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-secondary-light justify-center py-4 print:hidden"
    >
      Print / Save as PDF
    </button>
  )
}
