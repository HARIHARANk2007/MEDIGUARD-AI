import React from 'react'

export default function Sidebar(){
  return (
    <aside className="w-64 bg-surface p-4 hidden lg:block">
      <ul className="space-y-2">
        <li><a href="#/dashboard" className="block">Dashboard</a></li>
        <li><a href="#/patients" className="block">Patients</a></li>
        <li><a href="#/interactions" className="block">Interactions</a></li>
      </ul>
    </aside>
  )
}
