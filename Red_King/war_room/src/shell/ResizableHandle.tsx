/**
 * Red King — Shell
 * ResizableHandle — Premium Drag Strip
 */

import React, { useState } from 'react';
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
  const [active, setActive] = useState(false);

  const isVertical = direction === 'top';

  const handleMouseDown = (e: React.MouseEvent) => {
    setActive(true);
    onMouseDown(e);
    const up = () => { setActive(false); window.removeEventListener('mouseup', up); };
    window.addEventListener('mouseup', up);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className={[
        'group relative shrink-0 flex items-center justify-center z-20 transition-colors duration-150 select-none',
        isVertical
          ? 'h-[5px] w-full cursor-row-resize'
          : 'w-[5px] h-full cursor-col-resize',
        active
          ? 'bg-red-500/25'
          : 'bg-transparent hover:bg-red-500/10',
      ].join(' ')}
      role="separator"
      aria-orientation={isVertical ? 'horizontal' : 'vertical'}
    >
      {/* Grabber indicator */}
      {isVertical ? (
        <div className={[
          'w-10 h-[3px] rounded-full transition-all duration-150',
          active ? 'bg-red-500/60 w-16' : 'bg-white/[0.12] group-hover:bg-red-500/30 group-hover:w-14',
        ].join(' ')} />
      ) : (
        <div className={[
          'h-10 w-[3px] rounded-full transition-all duration-150',
          active ? 'bg-red-500/60 h-16' : 'bg-white/[0.12] group-hover:bg-red-500/30 group-hover:h-14',
        ].join(' ')} />
      )}

      {/* Wider invisible hit area */}
      <div className={[
        'absolute',
        isVertical ? 'inset-x-0 -top-1.5 -bottom-1.5' : 'inset-y-0 -left-1.5 -right-1.5',
      ].join(' ')} />
    </div>
  );
};
