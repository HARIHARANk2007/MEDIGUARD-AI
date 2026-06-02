import React from 'react'

export default function SearchBar({placeholder = 'Search patients...'}){
  return (
    <div className="w-full">
      <input aria-label="search" className="w-full p-2 border rounded" placeholder={placeholder} />
    </div>
  )
}
