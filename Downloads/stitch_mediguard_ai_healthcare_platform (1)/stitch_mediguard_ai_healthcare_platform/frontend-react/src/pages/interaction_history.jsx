import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { fetchHistory } from '../services'

function severityClass(severity) {
  const value = (severity || '').toLowerCase()
  if (value === 'severe' || value === 'high') return 'bg-error-container text-on-error-container'
  if (value === 'moderate') return 'bg-[#fff3e0] text-[#e65100]'
  return 'bg-[#e8f5e9] text-[#2e7d32]'
}

export default function InteractionHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)

  function openDetails(item){
    setSelected(item)
  }

  function downloadReport(item){
    const content = `Report for ${item.drugA} + ${item.drugB}\nSeverity: ${item.severity}\nRisk Score: ${item.riskScore}\n\nExplanation:\n${item.explanation || ''}\n\nSources:\n${(item.sources||[]).map(s=>`${s.drug} — ${s.section}`).join('\n')}`
    const blob = new Blob([content], {type: 'text/plain'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${item.drugA || 'report'}_${item.drugB || ''}.txt`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function saveReport(item){
    // Local stub: download the JSON of the report for now
    const blob = new Blob([JSON.stringify(item, null, 2)], {type: 'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report_${item.createdAt ? item.createdAt.split('T')[0] : 'report'}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    let active = true

    async function loadHistory() {
      try {
        const rows = await fetchHistory()
        if (active) setHistory(Array.isArray(rows) ? rows : [])
      } catch (err) {
        if (active) setError(err.message || 'Failed to load history')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadHistory()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 md:ml-72 flex flex-col">
        <header className="w-full top-0 sticky bg-surface border-b border-outline-variant flex items-center justify-between px-margin-mobile py-base z-10 md:hidden">
          <h1 className="font-display-lg text-headline-md-mobile font-bold text-primary">MediGuard AI</h1>
        </header>
        <header className="hidden md:flex w-full sticky top-0 bg-surface/80 backdrop-blur-md border-b border-outline-variant items-center justify-between px-margin-desktop py-4 z-10">
          <h1 className="font-headline-lg text-primary font-bold">Interaction History</h1>
        </header>

        <main className="flex-1 p-margin-mobile md:p-margin-desktop bg-surface-container-low overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            <div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-on-surface">Analysis History</h2>
              <p className="font-body-sm text-on-surface-variant mt-1">Review saved analysis runs from the database.</p>
            </div>

            <section className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-outline-variant flex items-center justify-between">
                <h3 className="font-semibold text-on-surface">Saved Analyses</h3>
                <span className="text-sm text-on-surface-variant">{history.length} records</span>
              </div>

              {loading ? (
                <div className="p-6 text-on-surface-variant">Loading history...</div>
              ) : error ? (
                <div className="p-6 text-error">{error}</div>
              ) : history.length === 0 ? (
                <div className="p-6 text-on-surface-variant">No analysis history yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-lowest text-on-surface-variant text-sm uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3">Drug A</th>
                        <th className="px-5 py-3">Drug B</th>
                        <th className="px-5 py-3">Severity</th>
                        <th className="px-5 py-3">Risk Score</th>
                        <th className="px-5 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((item, index) => (
                        <tr key={`${item.drugA}-${item.drugB}-${index}`} className="border-t border-outline-variant">
                          <td className="px-5 py-4 font-semibold text-on-surface">{item.drugA || '—'}</td>
                          <td className="px-5 py-4 font-semibold text-on-surface">{item.drugB || '—'}</td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${severityClass(item.severity)}`}>
                              {item.severity}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-on-surface font-semibold">{item.riskScore ?? '—'}</td>
                          <td className="px-5 py-4">
                            <button onClick={() => openDetails(item)} className="px-3 py-1 bg-surface border border-outline-variant rounded-md text-sm">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-surface w-full max-w-2xl p-6 rounded-xl border border-outline-variant">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-on-surface">{selected.drugA} + {selected.drugB}</h3>
                <div className="text-sm text-on-surface-variant mt-1">{new Date(selected.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => downloadReport(selected)} className="px-3 py-2 bg-primary-container text-on-primary rounded-md">Download PDF</button>
                <button onClick={() => saveReport(selected)} className="px-3 py-2 bg-surface border border-outline-variant rounded-md">Save Report</button>
                <button onClick={() => setSelected(null)} className="px-3 py-2 bg-surface text-on-surface-variant rounded-md">Close</button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">AI Explanation</h4>
              <p className="mt-2 text-on-surface">{selected.explanation || 'No explanation saved.'}</p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Evidence Sources</h4>
              <div className="mt-2 space-y-2">
                {(selected.sources || []).map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">description</span>
                    <div>
                      <div className="font-semibold">{s.drug}</div>
                      <div className="text-sm text-on-surface-variant">Section: {s.section}</div>
                    </div>
                  </div>
                ))}
                {(!selected.sources || selected.sources.length === 0) && <div className="text-on-surface-variant">No sources available.</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Local component helpers (added below the component to keep patch focused)