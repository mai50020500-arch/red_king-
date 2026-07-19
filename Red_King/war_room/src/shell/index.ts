/**
 * Red King — Shell
 * Public Barrel Export
 */

export { AppShell } from './AppShell';
export { TopBar } from './TopBar';
export { LeftSidebar } from './LeftSidebar';
export { RightSidebar } from './RightSidebar';
export { Workspace } from './Workspace';
export { BottomConsole } from './BottomConsole';
export { StatusBar } from './StatusBar';
export { ResizableHandle } from './ResizableHandle';

export { useShellLayout } from './hooks/useShellLayout';
export { useResize } from './hooks/useResize';

export type { ShellLayout } from './hooks/useShellLayout';
export type { ResizeDirection, ShellSlots } from './types';
