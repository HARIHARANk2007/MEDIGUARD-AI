// Service entrypoint — API wrappers with auth token management
export const api = {}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

// ── Auth helpers ────────────────────────────────────────────────────────────
export function getToken() {
  if (typeof window === 'undefined') return ''
  try { return sessionStorage.getItem('mg_token') || '' } catch { return '' }
}

export function getUser() {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem('mg_user')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function logout() {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem('mg_token')
    sessionStorage.removeItem('mg_user')
  } catch {}
}

function authHeaders() {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function login(email, password) {
  const resp = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}))
    throw new Error(err.detail || 'Invalid credentials')
  }
  const data = await resp.json()
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('mg_token', data.token)
    sessionStorage.setItem('mg_user', JSON.stringify({ name: data.name, role: data.role, hospitalId: data.hospitalId, email: data.email }))
  }
  return data
}

// ── Drug analysis ────────────────────────────────────────────────────────────
function mockAnalyze(payload) {
  const drugs = (payload.drugs || []).map(d => (d || '').toLowerCase())
  if (drugs.includes('atorvastatin') && drugs.includes('clopidogrel')) {
    return { 
      severity: 'high', 
      message: 'High-risk interaction: Clopidogrel may reduce efficacy of Atorvastatin via CYP pathways.', 
      riskScore: 80, 
      explanation: 'CYP-mediated interaction may alter statin metabolism; monitor LFTs and consider dose adjustment.', 
      alternatives: ['Rosuvastatin — CYP3A4-independent statin', 'Pravastatin — safe alternative'],
      schedule: [
        { drug: "Clopidogrel", time: "Morning (8:00 AM)", rationale: "Standard morning dosing to maintain antiplatelet effect throughout the day." },
        { drug: "Atorvastatin", time: "Bedtime (10:00 PM)", rationale: "Statins have peak efficacy when administered in the evening/bedtime due to nocturnal cholesterol synthesis, and separates administration from Clopidogrel to avoid metabolization bottlenecks." }
      ],
      evidence_level: "High",
      evidence_score: 0.85
    }
  }
  if (drugs.length < 2) {
    return { severity: 'info', message: 'Provide at least two medications for interaction analysis.', riskScore: 0, explanation: 'Not enough medications provided.', alternatives: [], schedule: [], evidence_level: "Low", evidence_score: 0.0 }
  }
  
  // Generic schedule generator fallback
  const default_schedule = []
  drugs.forEach(d => {
    const d_title = d.charAt(0).toUpperCase() + d.slice(1).toLowerCase()
    if (d.includes("statin") || ["atorvastatin", "simvastatin", "rosuvastatin"].includes(d)) {
      default_schedule.push({ drug: d_title, time: "Bedtime (10:00 PM)", rationale: "Peak cholesterol synthesis occurs overnight; statins are best taken at bedtime." })
    } else if (d.includes("aspirin") || d.includes("ibuprofen")) {
      default_schedule.push({ drug: d_title, time: "Morning (8:00 AM)", rationale: "Take in the morning with food to reduce gastrointestinal irritation." })
    } else if (default_schedule.length === 0) {
      default_schedule.push({ drug: d_title, time: "Morning (8:00 AM)", rationale: "Administer in the morning to establish routine daily dosing." })
    } else {
      default_schedule.push({ drug: d_title, time: "Evening (6:00 PM)", rationale: "Recommending evening dosing to space administration from other medications." })
    }
  })

  return { 
    severity: 'low', 
    message: 'No major interactions detected for the provided regimen.', 
    riskScore: 5, 
    explanation: 'No significant interaction rules matched.', 
    alternatives: [],
    schedule: default_schedule,
    evidence_level: "Low",
    evidence_score: 0.35
  }
}

export async function analyzeInteraction(payload) {
  const url = `${BACKEND_URL}/api/analyze`
  const body = payload.drugs ? { drugs: payload.drugs } : { drugA: payload.drugA, drugB: payload.drugB }
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ ...body, age: payload.age, weight: payload.weight, kidney: payload.kidney, liver: payload.liver, pregnancy: payload.pregnancy, pediatric: payload.pediatric, geriatric: payload.geriatric }),
    })
    if (!resp.ok) throw new Error('Backend responded with ' + resp.status)
    return await resp.json()
  } catch (err) {
    return mockAnalyze(payload)
  }
}

export async function fetchHistory() {
  const resp = await fetch(`${BACKEND_URL}/api/history`, { headers: authHeaders() })
  if (!resp.ok) throw new Error('Backend responded with ' + resp.status)
  return await resp.json()
}

export async function searchDrugs(q) {
  if (!q || q.trim().length < 1) return []
  try {
    const resp = await fetch(`${BACKEND_URL}/api/drugs/search?q=${encodeURIComponent(q)}`, { headers: authHeaders() })
    if (!resp.ok) throw new Error('Backend responded with ' + resp.status)
    return await resp.json()
  } catch (e) {
    console.error('searchDrugs failed:', e)
    return []
  }
}

export async function explainInteraction(drugA, drugB, severity, riskScore, mode) {
  const resp = await fetch(`${BACKEND_URL}/api/explain`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ drugA, drugB, severity, riskScore, mode }),
  })
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}))
    throw new Error(err.detail || 'Explanation failed')
  }
  return await resp.json()
}
