import React from 'react'

export default function Navbar(){
  return (
    <nav className="w-full bg-white/50 p-4 flex items-center justify-between shadow-sm">
      <div className="font-bold">MediGuard AI</div>
      <div className="hidden md:flex space-x-4">
        <a href="#/landing" className="text-sm">Home</a>
        <a href="#/patients" className="text-sm">Patients</a>
        <a href="#/alerts" className="text-sm">Alerts</a>
      </div>
    </nav>
  )
}
