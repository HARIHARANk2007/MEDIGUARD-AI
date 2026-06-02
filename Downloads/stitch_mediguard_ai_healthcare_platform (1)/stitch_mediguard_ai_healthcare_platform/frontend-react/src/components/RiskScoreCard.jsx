import React from 'react'

export default function RiskScoreCard({score=72,label='Risk'}){
  return (
    <div className="p-4 rounded-lg bg-surface shadow-sm">
      <div className="text-xs text-on-surface-variant">{label}</div>
      <div className="text-2xl font-bold">{score}%</div>
    </div>
  )
}
