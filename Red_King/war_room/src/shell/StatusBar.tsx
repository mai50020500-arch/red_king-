/**
 * Red King — Shell
 * StatusBar
 *
 * Thin 28px strip anchored to the bottom of the shell.
 * Polls /api/status every 10 seconds for live system metrics.
 */

import React, { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';

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

  useEffect(() => {
    let mounted = true;

    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/status');
        if (res.ok && mounted) {
          setData(await res.json());
        }
      } catch {
        // non-fatal — retain stale data
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
    data?.threat_level === 'CRITICAL'
      ? 'text-red-500'
      : data?.threat_level === 'HIGH'
      ? 'text-orange-400'
      : 'text-emerald-400';

  return (
    <footer className="h-7 shrink-0 px-4 flex items-center justify-between border-t border-red-500/10 bg-black/80 z-20">
      {/* Left: operational status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Circle
            size={6}
            className={data ? 'fill-emerald-500 text-emerald-500' : 'fill-zinc-600 text-zinc-600'}
          />
          <span className="text-[9px] font-bold tracking-widest uppercase text-zinc-500">
            {data?.status ?? 'Connecting…'}
          </span>
        </div>

        {data && (
          <>
            <Separator />
            <Metric label="Nodes" value={`${data.nodes_active} / ${data.nodes_total}`} />
            <Separator />
            <Metric label="Uptime" value={data.uptime} />
            <Separator />
            <span className={`text-[9px] font-bold tracking-wider uppercase ${threatColor}`}>
              Threat: {data.threat_level}
            </span>
          </>
        )}
      </div>

      {/* Right: latency + version */}
      <div className="flex items-center gap-3">
        {data && (
          <>
            <Metric label="Latency" value={`${data.latency_ms}ms`} />
            <Separator />
          </>
        )}
        <span className="text-[9px] text-zinc-700 font-mono tracking-wider">
          RED KING v2.1.0
        </span>
      </div>
    </footer>
  );
};

const Separator: React.FC = () => (
  <span className="text-zinc-800 text-[10px]">·</span>
);

const Metric: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <span className="text-[9px] text-zinc-600 tracking-wider">
    <span className="text-zinc-700">{label}: </span>
    <span className="text-zinc-400">{value}</span>
  </span>
);
