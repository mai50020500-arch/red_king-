
import os
import logging
from fastapi import FastAPI, Request, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from scapy.all import rdpcap, IP, TCP, UDP
import shutil
from app.api.mock_routes import router as mock_router


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("RedKing_Core")

app = FastAPI(title="Red King C2", version="2.1.0-Intel")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

static_path = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(static_path):
    os.makedirs(static_path)

# --- API ROUTES (must be defined before static file mount) ---

app.include_router(mock_router)


@app.get("/api/health")
async def health_check():
    return {"status": "OPERATIONAL", "module": "PCAP_ANALYZER_ACTIVE"}


# --- PCAP ANALYSIS ENGINE ---
@app.post("/api/analyze-pcap")
async def analyze_pcap(file: UploadFile = File(...)):
    temp_file = f"/tmp/{file.filename}"
    try:
        with open(temp_file, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        packets = rdpcap(temp_file)
        analysis_report = []
        unique_ips = set()

        for pkt in packets[:50]:
            if IP in pkt:
                src = pkt[IP].src
                dst = pkt[IP].dst
                proto = pkt[IP].proto
                unique_ips.add(src)

                ttl = pkt[IP].ttl
                if ttl == 64:
                    os_guess = "Linux/Mac/Android"
                elif ttl == 128:
                    os_guess = "Windows"
                elif ttl == 255:
                    os_guess = "Cisco/Network Gear"
                else:
                    os_guess = "Unknown"

                analysis_report.append({
                    "src": src,
                    "dst": dst,
                    "ttl": ttl,
                    "os_fingerprint": os_guess,
                    "protocol": proto,
                })

        return {
            "status": "ANALYSIS_COMPLETE",
            "total_packets": len(packets),
            "unique_targets": list(unique_ips),
            "fingerprints": analysis_report[:10],
        }
    except Exception as e:
        return {"error": str(e)}
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)


# --- STATIC / SPA (must come last — catches everything the API doesn't handle) ---
# StaticFiles with html=True serves index.html for any path that lacks a matching file,
# providing correct MIME types for JS/CSS assets and SPA fallback routing.
app.mount("/", StaticFiles(directory=static_path, html=True), name="spa")
