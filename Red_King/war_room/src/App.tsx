import { useState } from 'react';
import { Activity, AlertTriangle, Bot, BrainCircuit, Compass, Database, FileSearch, Gauge, Orbit, Radio, ScanLine, Shield, Workflow } from 'lucide-react';
import { AlertProvider } from './alerts/AlertContext';
import { AppShell } from './shell';
import Console from './components/Console';
import IntelFeed from './components/IntelFeed';
import AlertPanel from './components/AlertPanel';
import AchievementPanel from './components/AchievementPanel';
import StrategicAdvisor from './components/StrategicAdvisor';
import SwarmController from './components/SwarmController';
import LiveViewport from './components/LiveViewport';
import StealthPanel from './components/StealthPanel';
import SwarmJobMonitor from './components/SwarmJobMonitor';

const domains = [
  { id: 'threat-intel', label: 'Threat Intelligence', icon: Compass },
  { id: 'investigations', label: 'Investigations', icon: FileSearch },
  { id: 'assets', label: 'Assets', icon: Database },
  { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
  { id: 'pcap', label: 'PCAP Analysis', icon: ScanLine },
  { id: 'ai-agents', label: 'AI Agents', icon: Bot },
  { id: 'monitoring', label: 'Live Monitoring', icon: Radio },
  { id: 'automation', label: 'Automation', icon: Workflow },
];

const domainMetrics = [
  { label: 'Signal Integrity', value: '98.4%', detail: 'Global telemetry health' },
  { label: 'Active Triage', value: '24', detail: 'Priority incidents' },
  { label: 'Agent Sync', value: '12', detail: 'Autonomous workflows' },
];

function App() {
  const [monitoringAgent, setMonitoringAgent] = useState<string | null>(null);
  const [activeDomain, setActiveDomain] = useState('threat-intel');

  const activeItem = domains.find((domain) => domain.id === activeDomain) ?? domains[0];

  return (
    <AlertProvider>
      <AppShell
        left={
          <>
            <div className="ops-panel min-h-[280px] overflow-hidden">
              <SwarmController onMonitor={(id) => setMonitoringAgent(id)} />
            </div>
            <div className="ops-panel min-h-[180px] overflow-hidden">
              <SwarmJobMonitor />
            </div>
            <div className="ops-panel min-h-[150px] overflow-hidden">
              <AchievementPanel />
            </div>
          </>
        }
        right={
          <>
            <div className="ops-panel min-h-[260px] overflow-hidden">
              <AlertPanel />
            </div>
            <div className="ops-panel min-h-[180px] overflow-hidden">
              <StealthPanel />
            </div>
            <div className="ops-panel min-h-[180px] overflow-hidden">
              <StrategicAdvisor />
            </div>
          </>
        }
        bottom={<Console />}
      >
        <div className="flex h-full flex-col bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_38%)] p-5 text-slate-100">
          <header className="mb-5 rounded-2xl border border-slate-800/75 bg-[rgba(7,12,20,0.9)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-slate-500">
                  <Shield size={14} />
                  Enterprise Cyber Operations Platform
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <h2 className="text-2xl font-semibold tracking-[0.22em] text-slate-100">{activeItem.label}</h2>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.3em] text-cyan-300">
                    Command Layer
                  </span>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                  Unified visibility across the defense perimeter with high-density intelligence, rapid triage, and autonomous response readiness.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="ops-topbar-action">
                  <Activity size={14} />
                  Live Status
                </button>
                <button className="ops-topbar-action">
                  <BrainCircuit size={14} />
                  AI Assist
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {domains.map((domain) => {
                const Icon = domain.icon;
                const isActive = domain.id === activeDomain;
                return (
                  <button
                    key={domain.id}
                    onClick={() => setActiveDomain(domain.id)}
                    className={`ops-nav-chip ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={14} />
                    <span>{domain.label}</span>
                  </button>
                );
              })}
            </div>
          </header>

          <section className="mb-5 grid gap-3 md:grid-cols-3">
            {domainMetrics.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-xl font-semibold text-slate-100">{item.value}</p>
                <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
              </div>
            ))}
          </section>

          <section className="grid flex-1 min-h-0 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="ops-panel min-h-0">
              <div className="flex items-center justify-between border-b border-slate-800/70 bg-slate-950/50 px-4 py-3">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  <Orbit size={14} />
                  Operational Workspace
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Live feed
                </div>
              </div>
              <div className="h-[calc(100%-53px)] min-h-0">
                <IntelFeed />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="ops-panel p-4">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  <Gauge size={14} />
                  Mission Readiness
                </div>
                <div className="mt-4 rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4 text-sm text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Coverage ratio</span>
                    <span className="text-emerald-300">98.2%</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-800">
                    <div className="h-2 w-[98%] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                  </div>
                </div>
              </div>
              <div className="ops-panel p-4">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  <Compass size={14} />
                  Mission Brief
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Persistent coverage across intelligence, containment, and autonomous response, all anchored to the active operational domain.
                </p>
              </div>
            </div>
          </section>
        </div>

        {monitoringAgent && (
          <LiveViewport agentId={monitoringAgent} onClose={() => setMonitoringAgent(null)} />
        )}
      </AppShell>
    </AlertProvider>
  );
}

export default App;
