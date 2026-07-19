import React, { useState } from 'react';
import { AlertProvider } from './alerts/AlertContext';
import { AppShell } from './shell';

import IntelFeed from './components/IntelFeed';
import AlertPanel from './components/AlertPanel';
import AchievementPanel from './components/AchievementPanel';
import StrategicAdvisor from './components/StrategicAdvisor';
import SwarmController from './components/SwarmController';
import LiveViewport from './components/LiveViewport';
import StealthPanel from './components/StealthPanel';
import SwarmJobMonitor from './components/SwarmJobMonitor';
import Console from './components/Console';

function App() {
  const [monitoringAgent, setMonitoringAgent] = useState<string | null>(null);

  return (
    <AlertProvider>
      <AppShell
        left={
          <>
            <div className="flex-1 border border-red-500/20 rounded-lg overflow-hidden bg-black/20 backdrop-blur min-h-[300px]">
              <SwarmController onMonitor={(id) => setMonitoringAgent(id)} />
            </div>
            <div className="h-48 border border-red-500/20 rounded-lg overflow-hidden bg-black/20 backdrop-blur">
              <SwarmJobMonitor />
            </div>
            <div className="h-40 border border-red-500/20 rounded-lg overflow-hidden bg-black/20 backdrop-blur">
              <AchievementPanel />
            </div>
          </>
        }
        right={
          <>
            <div className="flex-1 border border-red-500/20 rounded-lg overflow-hidden bg-black/20 backdrop-blur">
              <AlertPanel />
            </div>
            <div className="h-48 border border-emerald-500/20 rounded-lg overflow-hidden bg-black/20 backdrop-blur">
              <StealthPanel />
            </div>
            <div className="h-48 border border-cyan-500/20 rounded-lg overflow-hidden bg-black/20 backdrop-blur">
              <StrategicAdvisor />
            </div>
          </>
        }
        bottom={<Console />}
      >
        {/* Workspace: primary intel feed */}
        <div className="flex-1 border border-red-500/20 rounded-lg overflow-hidden bg-black/20 backdrop-blur flex flex-col m-4">
          <IntelFeed />
        </div>

        {monitoringAgent && (
          <LiveViewport
            agentId={monitoringAgent}
            onClose={() => setMonitoringAgent(null)}
          />
        )}
      </AppShell>
    </AlertProvider>
  );
}

export default App;
