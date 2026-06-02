import React, { useEffect, useState } from 'react'
import Landing from './pages/mediguard_ai_landing_page'
import PatientProfiles from './pages/patient_profiles'
import ClinicianDashboard from './pages/clinician_dashboard'
import DrugChecker from './pages/drug_interaction_checker'
import AlertsCenter from './pages/alerts_center'
import InteractionHistory from './pages/interaction_history'
import AIResults from './pages/ai_analysis_results'
import Login from './pages/login_mediguard_ai'

const routes = {
  '/': Landing,
  '/landing': Landing,
  '/patients': PatientProfiles,
  '/dashboard': ClinicianDashboard,
  '/checker': DrugChecker,
  '/alerts': AlertsCenter,
  '/history': InteractionHistory,
  '/results': AIResults,
  '/login': Login,
}

export default function App() {
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || '/')

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#', '') || '/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const Page = routes[route] || (() => <div className="p-8">Page not found: {route}</div>)

  return (
    <div>
      <nav className="p-4 bg-surface border-b">
        <a className="mr-4 text-primary" href="#/landing">Landing</a>
        <a className="mr-4" href="#/dashboard">Dashboard</a>
        <a className="mr-4" href="#/checker">Checker</a>
        <a className="mr-4" href="#/patients">Patients</a>
        <a className="mr-4" href="#/alerts">Alerts</a>
        <a className="mr-4" href="#/history">History</a>
        <a className="mr-4" href="#/results">Results</a>
        <a className="mr-4" href="#/login">Login</a>
      </nav>
      <main>
        <Page />
      </main>
    </div>
  )
}
