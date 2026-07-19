/**
 * Red King — Shell
 * ResizableHandle
 *
 * A thin drag strip placed between resizable panels.
 * Renders as a 4px hit-area that glows on hover.
 */

import React from 'react';
import { useResize } from './hooks/useResize';
import type { ResizeDirection } from './types';

interface ResizableHandleProps {
  direction: ResizeDirection;
  currentValue: number;
  onChange: (value: number) => void;
}

export const ResizableHandle: React.FC<ResizableHandleProps> = ({
  direction,
  currentValue,
  onChange,
}) => {
  const { onMouseDown } = useResize(direction, currentValue, onChange);

  const isVertical = direction === 'top';

  return (
    <div
      onMouseDown={onMouseDown}
      className={[
        'group shrink-0 relative z-10',
        'transition-colors duration-150',
        isVertical
          ? 'h-1 w-full cursor-row-resize hover:bg-red-500/30'
          : 'w-1 h-full cursor-col-resize hover:bg-red-500/30',
        'bg-red-500/10',
      ].join(' ')}
      role="separator"
      aria-orientation={isVertical ? 'horizontal' : 'vertical'}
      aria-label={`Resize ${direction} panel`}
    >
      {/* Wider invisible hit area */}
      <div
        className={[
          'absolute inset-0',
          isVertical ? '-top-1 -bottom-1' : '-left-1 -right-1',
        ].join(' ')}
      />
    </div>
  );
};
