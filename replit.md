# Red King — Cybersecurity Intelligence Platform

## Overview
Red King is a cybersecurity C2/intel dashboard with:
- **Backend**: Python FastAPI (`Red_King/app/main.py`), served via uvicorn on port 5000
- **Frontend**: React + TypeScript "War Room" dashboard (`Red_King/war_room/`), built to `Red_King/app/static/`
- **AI/Intel APIs**: Gemini, Shodan, VirusTotal, WhoisXML, SecurityTrails

## How to run
The workflow `Start application` runs:
```
cd Red_King && uvicorn app.main:app --host 0.0.0.0 --port 5000
```

## Frontend build
When you change the War Room UI, rebuild and copy the output:
```
cd Red_King/war_room && npm run build && cp -r dist/* ../app/static/
```

## Environment / Secrets
All API keys are stored as **Replit Secrets** (not in `.env`):
- `GEMINI_API_KEY`
- `SHODAN_API_KEY`
- `VIRUSTOTAL_API_KEY`
- `WHOISXML_API_KEY`
- `SECURITYTRAILS_API_KEY`
- `SECRET_PASSPHRASE`

Non-secret rate-limit settings (`VT_RATE_LIMIT`, `VT_DAILY_LIMIT`) live in `.env`.

## User preferences
- Keep project structure as imported; do not migrate or restructure without asking.
