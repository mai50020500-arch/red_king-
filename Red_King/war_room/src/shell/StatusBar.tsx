/**
 * Red King — Shell
 * StatusBar — Premium Enterprise Status Strip
 */

import React, { useState, useEffect } from 'react';
import { Wifi, Cpu, Shield, Clock } from 'lucide-react';

interface StatusData {
  status: string;
  uptime: string;
  nodes_active: number;
  nodes_total: number;
  threat_level: string;
  latency_ms: number;
}

const POLL_INTERVAL = 10_000;

export const StatusBar: React.FC = () => {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/status');
        if (res.ok && mounted) {
          setData(await res.json());
          setLoading(false);
        }
      } catch {
        // retain stale data silently
      }
    };

    fetchStatus();
    const id = setInterval(fetchStatus, POLL_INTERVAL);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const threatColor =
    data?.threat_level === 'CRITICAL' ? 'text-red-400' :
    data?.threat_level === 'HIGH'     ? 'text-orange-400' :
    data?.threat_level === 'ELEVATED' ? 'text-amber-400' :
                                        'text-emerald-400';

  const threatDot =
    data?.threat_level === 'CRITICAL' ? 'bg-red-500' :
    data?.threat_level === 'HIGH'     ? 'bg-orange-500' :
    data?.threat_level === 'ELEVATED' ? 'bg-amber-500' :
                                        'bg-emerald-500';

  return (
    <footer className="h-[26px] shrink-0 flex items-center justify-between px-3 border-t border-white/[0.05] bg-[#080808]/95 backdrop-blur-md z-20">

      {/* ── Left metrics ───────────────────────────────── */}
      <div className="flex items-center gap-0">

        {/* Operational status */}
        <StatusPill>
          <span className={`h-1.5 w-1.5 rounded-full ${loading ? 'bg-zinc-600 animate-pulse' : 'bg-emerald-500'}`} />
          <span className={loading ? 'text-zinc-600' : 'text-emerald-400/80'}>
            {loading ? 'Connecting' : (data?.status ?? 'Operational')}
          </span>
        </StatusPill>

        <Sep />

        {!loading && data && (
          <>
            <StatusPill icon={<Wifi size={9} strokeWidth={2} className="text-zinc-600" />}>
              <span className="text-zinc-500">Nodes</span>
              <span className="text-zinc-300 font-medium">
                {data.nodes_active}
                <span className="text-zinc-700">/{data.nodes_total}</span>
              </span>
            </StatusPill>

            <Sep />

            <StatusPill icon={<Shield size={9} strokeWidth={2} className={threatColor} />}>
              <span className="text-zinc-500">Threat</span>
              <span className={`font-semibold ${threatColor} flex items-center gap-1`}>
                <span className={`h-1 w-1 rounded-full ${threatDot}`} />
                {data.threat_level}
              </span>
            </StatusPill>

            <Sep />

            <StatusPill icon={<Clock size={9} strokeWidth={2} className="text-zinc-600" />}>
              <span className="text-zinc-500">Up</span>
              <span className="text-zinc-400">{data.uptime}</span>
            </StatusPill>

            <Sep />

            <StatusPill icon={<Cpu size={9} strokeWidth={2} className="text-zinc-600" />}>
              <span className="text-zinc-500">Latency</span>
              <span className={data.latency_ms > 200 ? 'text-amber-400' : 'text-zinc-400'}>
                {data.latency_ms}
                <span className="text-zinc-600">ms</span>
              </span>
            </StatusPill>
          </>
        )}
      </div>

      {/* ── Right: version tag ─────────────────────────── */}
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-mono tracking-[0.08em] text-zinc-700">
          RED KING v2.1.0-INTEL
        </span>
      </div>
    </footer>
  );
};

/* ── Sub-components ───────────────────────────────────────────── */

const Sep: React.FC = () => (
  <span className="text-zinc-800 mx-2 text-[10px] select-none">·</span>
);

interface StatusPillProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const StatusPill: React.FC<StatusPillProps> = ({ icon, children }) => (
  <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-wide">
    {icon}
    {children}
  </div>
);
