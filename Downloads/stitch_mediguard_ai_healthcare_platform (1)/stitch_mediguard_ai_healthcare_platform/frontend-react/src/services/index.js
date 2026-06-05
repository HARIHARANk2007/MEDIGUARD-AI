// Service entrypoint: add API wrappers here
export const api = {}

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

function mockAnalyze(payload){
	const drugs = (payload.drugs || []).map(d => (d||'').toLowerCase())
	if(drugs.includes('atorvastatin') && drugs.includes('clopidogrel')){
		return {severity:'high', message:'High-risk interaction: Clopidogrel may reduce efficacy of Atorvastatin via CYP pathways. Consider alternative therapy and consult pharmacy.', riskScore:80, explanation: 'CYP-mediated interaction may alter statin metabolism; monitor LFTs and consider dose adjustment.'}
	}
	if(drugs.length < 2){
		return {severity:'info', message:'Provide at least two medications for interaction analysis.', riskScore:0, explanation:'Not enough medications provided.'}
	}
	return {severity:'low', message:'No major interactions detected for the provided regimen. Review patient-specific parameters before finalizing.', riskScore:5, explanation:'No significant interaction rules matched in the mock analyzer.'}
}

// Try backend first; fallback to local mock on failure.
export async function analyzeInteraction(payload){
	const url = `${BACKEND_URL}/api/analyze`
	const body = payload.drugs ? {drugs: payload.drugs} : {drugA: payload.drugA, drugB: payload.drugB}
	try{
		const resp = await fetch(url, {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({...body, age: payload.age, weight: payload.weight, kidney: payload.kidney, liver: payload.liver, pregnancy: payload.pregnancy, pediatric: payload.pediatric, geriatric: payload.geriatric})
		})
		if(!resp.ok) throw new Error('Backend responded with ' + resp.status)
		return await resp.json()
	}catch(err){
		// network error or backend not available — use mock
		return mockAnalyze(payload)
	}
}

export async function fetchHistory(){
	const resp = await fetch(`${BACKEND_URL}/api/history`)
	if(!resp.ok) throw new Error('Backend responded with ' + resp.status)
	return await resp.json()
}

export async function searchDrugs(q){
	if(!q || q.trim().length < 1) return []
	try{
		const resp = await fetch(`${BACKEND_URL}/api/drugs/search?q=${encodeURIComponent(q)}`)
		if(!resp.ok) throw new Error('Backend responded with ' + resp.status)
		return await resp.json()
	}catch(e){
		console.error('searchDrugs failed:', e)
		return []
	}
}
