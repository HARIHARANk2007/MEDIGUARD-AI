# MediGuard AI — Drug Interaction Analysis

Comprehensive demo platform for clinical drug interaction analysis: a React frontend (Vite) and a FastAPI backend that returns AI-styled interaction summaries.

## Demo Summary
- Frontend: `frontend-react` — Vite + React app that contains pages converted from the original static HTML UI (Interaction Checker, AI Results, Patient Profiles, etc.).
- Backend: `backend` — FastAPI service exposing `/api/analyze` which returns structured analysis JSON (severity, message, riskScore, explanation).

## Visual & Textual Overview

The UI presents:
- Medication input fields (primary + secondary medication)
- Patient physiology (age, weight, renal/hepatic function)
- Advanced toggles (pregnancy, pediatric, geriatric)
- Analyis result page that shows an AI Risk Index, plain-language summary, technical details, and evidence sources.

Mermaid architecture diagram:

```mermaid
graph LR
  A[Browser (Vite React)] -->|POST /api/analyze| B[FastAPI Backend]
  B --> C{Analyzer}
  C --> D[Rules-based Mock]
  C --> E[AI/Model (future)]
  B -->|JSON response| A
```

## Project structure (key folders)

- `frontend-react/` — Vite + React application
  - `src/pages/drug_interaction_checker.jsx` — form to submit interactions
  - `src/pages/ai_analysis_results.jsx` — results viewer (reads sessionStorage.lastAnalysis)
  - `src/services/` — analyzer network + mock fallback
- `backend/` — FastAPI app
  - `backend/app/routes/analyze.py` — POST `/analyze`
  - `backend/app/services/analyzer.py` — mock rules and response shaping

## Quickstart (local dev)

Prereqs: Node 18+, Python 3.10+, pip

1. Start backend

```powershell
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
# health: http://127.0.0.1:8000/health
```

2. Start frontend

```bash
cd frontend-react
npm install
npm run dev
# open http://localhost:5173
```

3. End-to-end test

Fill the Interaction Checker form and click `Analyze Interaction`. The app will POST to `http://127.0.0.1:8000/api/analyze` and navigate to the AI Results page.

You can also POST directly:

```powershell
$body = '{"drugA":"Warfarin","drugB":"Aspirin","age":70}'
Invoke-RestMethod -Uri http://127.0.0.1:8000/api/analyze -Method POST -ContentType 'application/json' -Body $body
```

## API contract

POST `/api/analyze`

Request JSON (examples):

```json
{ "drugA":"Warfarin", "drugB":"Aspirin", "age":70 }
```

Response JSON:

```json
{
  "severity": "high",
  "message": "High-risk interaction: ...",
  "riskScore": 90,
  "explanation": "Clinical details..."
}
```

## Notes & Next Steps

- CORS: backend includes development CORS for `http://localhost:5173`.
- The analyzer currently returns deterministic mock results; replace `backend/app/services/analyzer.py` with production logic or an AI integration for real deployments.
- Consider adding tests, CI/CD, and a PR template.

## Contributing

Open an issue or pull request. For local development follow the Quickstart above.

## License

This demo is provided under MIT-style terms unless otherwise noted.

---
Generated and updated by the project maintainer workflow.
