import React, {useEffect, useState} from 'react'

export default function AIResults(){
  const [data, setData] = useState(null)

  useEffect(()=>{
    try{
      const raw = sessionStorage.getItem('lastAnalysis')
      if(raw) setData(JSON.parse(raw))
    }catch(e){
      setData(null)
    }
  },[])

  if(!data) return (
    <div className="p-6">
      <h2 className="font-headline-md">No analysis available</h2>
      <p className="text-on-surface-variant">Run the Interaction Checker and submit to view results here.</p>
    </div>
  )

  const {request, response} = data
  const drugs = request?.drugs || [request?.drugA, request?.drugB].filter(Boolean)
  const sources = Array.isArray(response?.sources) ? response.sources : []

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline-lg">Interaction Analysis</h1>
        <span className={`px-3 py-1 rounded-full font-semibold ${response.severity === 'high' ? 'bg-red-600 text-white' : response.severity === 'low' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {response.severity?.toUpperCase()}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {drugs.map((d,i)=>(
          <div key={i} className="bg-surface-container-high text-on-surface-variant px-3 py-1.5 rounded-lg border border-outline-variant">{d}</div>
        ))}
      </div>

      <div className="bg-surface p-4 rounded-xl border border-outline-variant">
        <div className="flex justify-between items-end">
          <span className="text-sm text-on-surface-variant">AI Risk Index</span>
          <span className="text-2xl font-bold text-error">{response.riskScore ?? '—' }<span className="text-sm text-on-surface-variant">/100</span></span>
        </div>
        <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden mt-3">
          <div className="h-full bg-error" style={{width: `${response.riskScore ?? 0}%`}} />
        </div>
      </div>

      <section className="bg-surface border border-outline-variant rounded-xl p-4">
        <h3 className="font-semibold text-on-surface">AI Summary</h3>
        <p className="mt-2 text-on-surface">{response.message}</p>
        {response.explanation && <p className="mt-2 text-sm text-on-surface-variant">{response.explanation}</p>}
      </section>

      <section className="bg-surface border border-outline-variant rounded-xl p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-on-surface">Evidence Sources</h3>
          <span className="text-xs uppercase tracking-wider text-on-surface-variant">OpenFDA</span>
        </div>
        <div className="mt-4 space-y-3">
          {sources.length > 0 ? sources.map((source, index) => (
            <div key={`${source.drug}-${source.section}-${index}`} className="flex items-start gap-3 rounded-lg border border-outline-variant bg-surface-container-low p-3">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">description</span>
              <div>
                <div className="font-semibold text-on-surface">{source.drug}</div>
                <div className="text-sm text-on-surface-variant">Section: {source.section}</div>
              </div>
            </div>
          )) : (
            <p className="text-sm text-on-surface-variant">No evidence sources were returned for this analysis.</p>
          )}
        </div>
      </section>

      <section className="flex gap-3">
        <button className="bg-primary-container text-on-primary w-full py-3 px-4 rounded-xl font-body-md font-semibold">Download PDF Report</button>
        <button className="bg-surface border border-outline-variant w-full py-3 px-4 rounded-xl">Save</button>
      </section>
    </main>
  )
}
