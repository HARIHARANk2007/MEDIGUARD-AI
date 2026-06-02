import React from 'react'

export default function PatientForm(){
  return (
    <form className="space-y-3">
      <input className="w-full p-2 border rounded" placeholder="Patient name" />
      <input className="w-full p-2 border rounded" placeholder="DOB" />
      <button className="px-3 py-2 bg-primary text-on-primary rounded">Save</button>
    </form>
  )
}
