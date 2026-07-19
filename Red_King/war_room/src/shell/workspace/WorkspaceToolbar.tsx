/**
 * Red King — Docking Workspace
 * WorkspaceToolbar — profile switcher and layout controls.
 */

import React from 'react';
import { RotateCcw, Square, Columns, Rows, LayoutTemplate } from 'lucide-react';
import { useWorkspace } from './WorkspaceContext';

const PROFILE_ICONS: Record<string, React.ReactNode> = {
  'focus':   <Square        size={11} strokeWidth={1.8} />,
  'h-split': <Columns       size={11} strokeWidth={1.8} />,
  'v-split': <Rows          size={11} strokeWidth={1.8} />,
  'triage':  <LayoutTemplate size={11} strokeWidth={1.8} />,
};

export const WorkspaceToolbar: React.FC = () => {
  const { profiles, activeProfileId, setProfile, resetLayout } = useWorkspace();

  return (
    <div className="h-8 shrink-0 flex items-center justify-between px-3 bg-[#0c0c0c] border-b border-white/[0.05]">

      {/* Profile switcher */}
      <div className="flex items-center gap-1">
        <span className="text-[9px] font-bold tracking-[0.12em] text-zinc-700 uppercase mr-2">
          Layout
        </span>

        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => setProfile(profile.id)}
            title={profile.name}
            className={[
              'flex items-center gap-1.5 h-5 px-2 rounded text-[9px] font-semibold tracking-[0.08em] uppercase transition-all duration-150',
              profile.id === activeProfileId
                ? 'bg-red-500/15 text-red-400 border border-red-500/30 shadow-[0_0_6px_rgba(239,68,68,0.12)]'
                : 'text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.05] border border-transparent',
            ].join(' ')}
          >
            {PROFILE_ICONS[profile.id] ?? <Square size={11} />}
            {profile.name}
          </button>
        ))}
      </div>

      {/* Right: reset */}
      <button
        onClick={resetLayout}
        title="Reset layout to profile default"
        className="flex items-center gap-1.5 h-5 px-2 rounded text-[9px] font-semibold tracking-[0.08em] uppercase text-zinc-700 hover:text-zinc-300 hover:bg-white/[0.05] border border-transparent transition-all duration-150"
      >
        <RotateCcw size={10} strokeWidth={2} />
        Reset
      </button>
    </div>
  );
};
