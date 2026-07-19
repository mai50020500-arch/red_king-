/**
 * Red King — Shell
 * AppShell
 *
 * Root layout orchestrator. Composes TopBar, LeftSidebar, Workspace,
 * RightSidebar, BottomConsole, and StatusBar into the full application frame.
 *
 * Usage:
 *   <AppShell left={<LeftPanels />} right={<RightPanels />} bottom={<Console />}>
 *     <MainContent />
 *   </AppShell>
 */

import React from 'react';
import { TopBar } from './TopBar';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { Workspace } from './Workspace';
import { BottomConsole } from './BottomConsole';
import { StatusBar } from './StatusBar';
import { ResizableHandle } from './ResizableHandle';
import { useShellLayout } from './hooks/useShellLayout';

interface AppShellProps {
  /** Content rendered in the left sidebar zone */
  left?: React.ReactNode;
  /** Content rendered in the right sidebar zone */
  right?: React.ReactNode;
  /** Content rendered in the bottom console drawer */
  bottom?: React.ReactNode;
  /** Content rendered in the centre Workspace */
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ left, right, bottom, children }) => {
  const {
    layout,
    setLeftWidth,
    setRightWidth,
    setBottomHeight,
    toggleLeft,
    toggleRight,
    toggleBottom,
  } = useShellLayout();

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono overflow-hidden">

      <TopBar
        leftOpen={layout.leftOpen}
        rightOpen={layout.rightOpen}
        bottomOpen={layout.bottomOpen}
        onToggleLeft={toggleLeft}
        onToggleRight={toggleRight}
        onToggleBottom={toggleBottom}
      />

      {/* Shell body: sidebars + workspace */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {left && (
          <>
            <LeftSidebar open={layout.leftOpen} width={layout.leftWidth}>
              {left}
            </LeftSidebar>

            {layout.leftOpen && (
              <ResizableHandle
                direction="right"
                currentValue={layout.leftWidth}
                onChange={setLeftWidth}
              />
            )}
          </>
        )}

        <Workspace>{children}</Workspace>

        {right && (
          <>
            {layout.rightOpen && (
              <ResizableHandle
                direction="left"
                currentValue={layout.rightWidth}
                onChange={setRightWidth}
              />
            )}

            <RightSidebar open={layout.rightOpen} width={layout.rightWidth}>
              {right}
            </RightSidebar>
          </>
        )}
      </div>

      {bottom && (
        <BottomConsole
          open={layout.bottomOpen}
          height={layout.bottomHeight}
          onResize={setBottomHeight}
        >
          {bottom}
        </BottomConsole>
      )}

      <StatusBar />
    </div>
  );
};
