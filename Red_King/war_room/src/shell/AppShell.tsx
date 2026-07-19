/**
 * Red King — Shell
 * AppShell — Root Layout Orchestrator
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
  left?: React.ReactNode;
  right?: React.ReactNode;
  bottom?: React.ReactNode;
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
    <div className="flex flex-col h-screen bg-[#080808] text-[#d4d4d4] font-mono overflow-hidden antialiased">

      <TopBar
        leftOpen={layout.leftOpen}
        rightOpen={layout.rightOpen}
        bottomOpen={layout.bottomOpen}
        onToggleLeft={toggleLeft}
        onToggleRight={toggleRight}
        onToggleBottom={toggleBottom}
      />

      {/* Shell body */}
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
          onClose={toggleBottom}
        >
          {bottom}
        </BottomConsole>
      )}

      <StatusBar />
    </div>
  );
};
