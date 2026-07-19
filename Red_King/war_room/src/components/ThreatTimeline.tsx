import { AlertTriangle, CheckCircle2, Clock3, Radio, ShieldCheck } from 'lucide-react';

const timelineEntries = [
  {
    time: '00:12 UTC',
    title: 'Beacon correlation',
    detail: 'Three dormant implants converged on the same infrastructure node.',
    severity: 'Elevated',
    icon: Radio,
  },
  {
    time: '00:34 UTC',
    title: 'Containment approved',
    detail: 'Isolation procedures queued across the affected subnet.',
    severity: 'Actioned',
    icon: ShieldCheck,
  },
  {
    time: '00:48 UTC',
    title: 'Intel enrichment',
    detail: 'TTPs matched known threat clusters and opened a new investigation thread.',
    severity: 'Observed',
    icon: AlertTriangle,
  },
  {
    time: '01:03 UTC',
    title: 'Operator handoff',
    detail: 'Telemetry handoff completed to the active response cell without gaps.',
    severity: 'Complete',
    icon: CheckCircle2,
  },
];

function ThreatTimeline() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-800/70 bg-slate-950/50 px-4 py-3">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
          <Clock3 size={14} />
          Threat Timeline
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-300">Last 90 min</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {timelineEntries.map((entry, index) => {
            const Icon = entry.icon;
            return (
              <div key={`${entry.time}-${entry.title}`} className="relative rounded-2xl border border-slate-800/70 bg-slate-950/60 p-3">
                {index < timelineEntries.length - 1 && (
                  <span className="absolute left-6 top-10 bottom-[-0.75rem] w-px bg-slate-800" />
                )}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <Icon size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-100">{entry.title}</p>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">{entry.time}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{entry.detail}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-emerald-300">{entry.severity}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ThreatTimeline;
