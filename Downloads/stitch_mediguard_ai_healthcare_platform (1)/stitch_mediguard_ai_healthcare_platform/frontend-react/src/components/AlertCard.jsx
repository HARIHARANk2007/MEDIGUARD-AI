import React from 'react'

export default function AlertCard({title='Alert', children}){
  return (
    <div className="p-3 rounded-lg border-l-4 border-red-500 bg-surface-container-lowest">
      <div className="font-semibold">{title}</div>
      <div className="text-sm">{children}</div>
    </div>
  )
}
