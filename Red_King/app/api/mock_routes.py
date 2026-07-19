"""
Mock API routes for the War Room dashboard.
All endpoints return static JSON — no external API calls are made here.
Real integrations (Shodan, VirusTotal, etc.) are wired up separately
only when the user explicitly approves a live run.
"""
import asyncio
import json
import os
from fastapi import APIRouter, UploadFile, File, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse
from app.core.llm_commander import hive_mind
from app.core.red_cipher import RedCipher
from app.core.schemas import ConsultationRequest, StrictAgentCheckIn

router = APIRouter(prefix="/api")
cipher_engine = RedCipher(key_material=os.getenv("SECRET_PASSPHRASE", "red_king_default").encode())


# ── Swarm ────────────────────────────────────────────────────────────────────

@router.get("/swarm/stats")
async def swarm_stats():
    return {
        "total": 42,
        "windows": 18,
        "linux": 20,
        "macos": 4,
        "active": 37,
    }


@router.get("/agents")
async def get_agents():
    return [
        {"id": "a1b2c3d4", "ip": "192.168.1.105", "os": "Windows", "status": "ACTIVE"},
        {"id": "e5f6g7h8", "ip": "10.0.0.22",     "os": "Linux",   "status": "ACTIVE"},
        {"id": "i9j0k1l2", "ip": "172.16.0.45",   "os": "macOS",   "status": "IDLE"},
        {"id": "m3n4o5p6", "ip": "192.168.1.200", "os": "Linux",   "status": "COMPROMISED"},
        {"id": "q7r8s9t0", "ip": "10.10.10.10",   "os": "Windows", "status": "ACTIVE"},
    ]


@router.post("/swarm/execute")
async def swarm_execute(body: dict):
    return {"status": "QUEUED", "job_id": "job_mock_abc123", "targets": 37}


@router.get("/swarm/jobs")
async def swarm_jobs():
    return [
        {"id": "job_001", "type": "shell",  "status": "COMPLETE", "targets": ["192.168.1.105", "10.0.0.22"], "progress": 100},
        {"id": "job_002", "type": "recon",  "status": "RUNNING",  "targets": ["172.16.0.45"],               "progress": 65},
        {"id": "job_003", "type": "exfil",  "status": "PENDING",  "targets": ["192.168.1.200"],             "progress": 0},
    ]


# ── Intel / Alerts ───────────────────────────────────────────────────────────

@router.get("/intel")
async def get_intel():
    return [
        {"id": "1", "msg": "New node compromised: 192.168.1.105 (Windows 11)", "type": "WARFARE"},
        {"id": "2", "msg": "AI assessment complete: HIGH threat vector detected", "type": "AI"},
        {"id": "3", "msg": "Stealth redirector RD-01 operational", "type": "ALERT"},
        {"id": "4", "msg": "Strategic analysis updated: lateral movement recommended", "type": "STRATEGY"},
        {"id": "5", "msg": "Ghost recon complete on subnet 10.0.0.0/24", "type": "ALERT"},
    ]


@router.get("/dna_map")
async def get_dna_map():
    return [
        {"file": "svchost.exe", "ip": "192.168.1.105", "dna": "a3f1b2c4d5e6f7a8b9c0d1e2"},
        {"file": "chrome.exe",  "ip": "10.0.0.22",     "dna": "b4c5d6e7f8a9b0c1d2e3f4a5"},
        {"file": "bash",        "ip": "172.16.0.45",   "dna": "c5d6e7f8a9b0c1d2e3f4a5b6"},
        {"file": "python3",     "ip": "10.10.10.10",   "dna": "d6e7f8a9b0c1d2e3f4a5b6c7"},
    ]


@router.post("/ghost_recon")
async def ghost_recon(body: dict):
    ip = body.get("ip", "unknown")
    return {"status": "SUCCESS", "title": f"Ghost recon completed on {ip}"}


@router.post("/ai_assessment")
async def ai_assessment(body: dict):
    return {
        "device_type": "Windows Server 2019",
        "threat_level": "HIGH",
        "attack_vector": "CVE-2023-4911 (Looney Tunables) via exposed SSH",
    }


# ── Graph (NeuralMesh) ───────────────────────────────────────────────────────

@router.get("/graph")
async def get_graph():
    return {
        "nodes": [
            {"id": "RED_KING",     "group": 1, "label": "RED KING (C2)",       "val": 3},
            {"id": "SHADOW_RELAY", "group": 1, "label": "Shadow Relay"},
            {"id": "node_a1b2",    "group": 2, "label": "192.168.1.105 (WIN)"},
            {"id": "node_e5f6",    "group": 2, "label": "10.0.0.22 (LIN)"},
            {"id": "node_i9j0",    "group": 3, "label": "172.16.0.45 (MAC)"},
            {"id": "node_m3n4",    "group": 4, "label": "192.168.1.200 (LIN)"},
            {"id": "node_q7r8",    "group": 2, "label": "10.10.10.10 (WIN)"},
        ],
        "links": [
            {"source": "RED_KING",     "target": "SHADOW_RELAY"},
            {"source": "SHADOW_RELAY", "target": "node_a1b2"},
            {"source": "SHADOW_RELAY", "target": "node_e5f6"},
            {"source": "SHADOW_RELAY", "target": "node_i9j0"},
            {"source": "RED_KING",     "target": "node_m3n4"},
            {"source": "RED_KING",     "target": "node_q7r8"},
        ],
    }


# ── Stealth ──────────────────────────────────────────────────────────────────

@router.get("/stealth/redirectors")
async def get_redirectors():
    return [
        {"id": "rd_01", "ip": "45.33.32.156",   "hostname": "relay-01.darknet.io",   "status": "ACTIVE", "last_seen": "2026-07-17T13:00:00Z"},
        {"id": "rd_02", "ip": "198.51.100.42",  "hostname": "relay-02.proxy.net",    "status": "ACTIVE", "last_seen": "2026-07-17T12:55:00Z"},
        {"id": "rd_03", "ip": "203.0.113.77",   "hostname": "exit-node-eu.anon.net", "status": "IDLE",   "last_seen": "2026-07-17T11:30:00Z"},
    ]


@router.post("/stealth/redirectors/register")
async def register_redirector(body: dict):
    safe_id = body.get("ip", "0.0.0.0").replace(".", "_")
    return {"status": "REGISTERED", "id": f"rd_{safe_id}"}


@router.post("/stealth/redirectors/burn")
async def burn_redirector(body: dict):
    return {"status": "BURNED", "id": body.get("id")}


# ── Strategy ─────────────────────────────────────────────────────────────────

@router.get("/strategy/analyze")
async def strategy_analyze():
    return {
        "summary": "Network segmentation detected. Lateral movement via SMB relay recommended.",
        "priority_node": "192.168.1.105",
        "recommended_technique": "Pass-the-Hash via NTLM relay",
        "rationale": "Target has SMBv1 enabled and no EDR solution detected.",
        "risk_score": 72,
    }


@router.post("/settings/autonomy")
async def set_autonomy(body: dict):
    return {"status": "OK", "autonomy": body.get("enabled", False)}


@router.get("/mission/report")
async def mission_report():
    content = (
        "RED KING MISSION REPORT\n"
        "====================\n"
        "Date: 2026-07-17\n"
        "Active Nodes: 37\n"
        "Compromised: 4\n"
        "Status: OPERATIONAL\n"
    )
    return StreamingResponse(
        iter([content]),
        media_type="text/plain",
        headers={"Content-Disposition": "attachment; filename=mission_report.txt"},
    )


# ── Achievements ─────────────────────────────────────────────────────────────

@router.get("/achievements")
async def get_achievements():
    return [
        {"id": "1", "name": "First Blood",     "description": "Compromise your first node",          "icon": "Skull",  "unlocked": True,  "unlocked_at": "2026-07-17T10:00:00Z"},
        {"id": "2", "name": "Ghost Protocol",  "description": "Maintain 30 days of stealth",         "icon": "Lock",   "unlocked": True,  "unlocked_at": "2026-07-15T08:00:00Z"},
        {"id": "3", "name": "Swarm King",      "description": "Control 50+ nodes simultaneously",    "icon": "Trophy", "unlocked": False, "unlocked_at": None},
        {"id": "4", "name": "Network Reaper",  "description": "Scan 1000+ IPs",                      "icon": "Zap",    "unlocked": False, "unlocked_at": None},
    ]


# ── Console / Hive ────────────────────────────────────────────────────────────

@router.get("/status")
async def get_status():
    return {"system": "ONLINE", "hive_mind": "ONLINE", "active_nodes": 37}


@router.post("/hive/queue")
async def hive_queue(body: dict):
    return {"job_id": "job_hive_mock_xyz"}


@router.post("/hive/checkin")
async def hive_checkin(payload: StrictAgentCheckIn):
    decrypted_payload = json.loads(cipher_engine.decrypt(payload.data))
    response_payload = {
        "agent_id": payload.agent_id,
        "jitter": 42,
        "commands": ["whoami", "hostname", "net view"],
        "status": "ACK",
        "context": decrypted_payload.get("info", {}),
    }
    return {"data": cipher_engine.encrypt(json.dumps(response_payload))}


@router.post("/consult")
async def consult(body: ConsultationRequest):
    adviser = hive_mind.get_strategic_advice
    response = adviser(body.query)
    if hasattr(response, "__await__"):
        response = await response
    return {"response": response}


@router.post("/scan")
async def scan(body: dict):
    return {
        "targets_found": 12,
        "details": [
            "192.168.1.0/24 — 8 hosts up",
            "10.0.0.0/24 — 4 hosts up",
            "SMB open: 192.168.1.105, 192.168.1.110",
            "RDP open: 192.168.1.200",
        ],
    }


# ── Forensics ────────────────────────────────────────────────────────────────

@router.post("/forensics/upload")
async def forensics_upload(file: UploadFile = File(...)):
    return {
        "report": (
            f"Forensics analysis of '{file.filename}': "
            "No live signatures were queried (mock mode). "
            "Entropy analysis: normal. PE headers: valid. "
            "Recommendation: submit to sandbox for dynamic analysis."
        )
    }


@router.post("/war/resurrect")
async def war_resurrect(body: dict):
    return {"status": "RESURRECTION_INITIATED", "module": "self_healing_v2"}


# ── WebSocket: Live Agent Stream ──────────────────────────────────────────────

@router.websocket("/hive/stream/{agent_id}")
async def hive_stream(websocket: WebSocket, agent_id: str):
    await websocket.accept()
    try:
        boot_msgs = [
            f"[{agent_id}] Connection established",
            f"[{agent_id}] Running process enumeration...",
            f"[{agent_id}] 14 processes captured",
            f"[{agent_id}] Stealth check: PASS",
            f"[{agent_id}] Keylogger buffer: 0 bytes",
        ]
        for msg in boot_msgs:
            await websocket.send_text(json.dumps({"type": "log", "msg": msg}))
            await asyncio.sleep(1.2)
        # Keep alive with heartbeats
        while True:
            await asyncio.sleep(6)
            await websocket.send_text(json.dumps({"type": "heartbeat", "msg": f"[{agent_id}] ALIVE"}))
    except WebSocketDisconnect:
        pass
