import React from 'react'

export default function DrugInteractionForm(){
  return (
    <form className="space-y-3">
      <input className="w-full p-2 border rounded" placeholder="Drug A" />
      <input className="w-full p-2 border rounded" placeholder="Drug B" />
      <button className="px-3 py-2 bg-primary text-on-primary rounded">Check Interaction</button>
    </form>
  )
}
