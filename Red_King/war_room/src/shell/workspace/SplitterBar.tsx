/**
 * Red King — Docking Workspace
 * SplitterBar — drag-to-resize divider between two sibling panels.
 *
 * Uses the parent group container ref to compute percentage-accurate deltas.
 */

import React, { useState, useRef } from 'react';
import type { Direction } from './types';

interface SplitterBarProps {
  direction:    Direction;       // parent group direction
  index:        number;          // index of the LEFT/TOP sibling being resized
  sizes:        number[];
  containerRef: React.RefObject<HTMLDivElement>;
  onSizesChange: (sizes: number[]) => void;
}

export const SplitterBar: React.FC<SplitterBarProps> = ({
  direction,
  index,
  sizes,
  containerRef,
  onSizesChange,
}) => {
  const [active, setActive] = useState(false);
  const startRef = useRef<{ pos: number; sizeA: number; sizeB: number; containerPx: number } | null>(null);

  const isRow = direction === 'row';
  const MIN_SIZE = 0.08; // minimum 8% of total weight

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    const containerPx = isRow ? container.offsetWidth : container.offsetHeight;
    const totalWeight = sizes.reduce((a, b) => a + b, 0);

    startRef.current = {
      pos:         isRow ? e.clientX : e.clientY,
      sizeA:       sizes[index],
      sizeB:       sizes[index + 1],
      containerPx,
    };

    setActive(true);
    document.body.style.cursor     = isRow ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';

    const onMouseMove = (ev: MouseEvent) => {
      if (!startRef.current) return;
      const { pos, sizeA, sizeB, containerPx: cpx } = startRef.current;
      const delta   = (isRow ? ev.clientX : ev.clientY) - pos;
      const dWeight = (delta / cpx) * totalWeight;

      const newA = Math.max(MIN_SIZE * totalWeight, sizeA + dWeight);
      const newB = Math.max(MIN_SIZE * totalWeight, sizeB - dWeight);

      const next = [...sizes];
      next[index]     = newA;
      next[index + 1] = newB;
      onSizesChange(next);
    };

    const onMouseUp = () => {
      startRef.current = null;
      setActive(false);
      document.body.style.cursor     = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',   onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',   onMouseUp);
  };

  return (
    <div
      onMouseDown={onMouseDown}
      className={[
        'relative shrink-0 flex items-center justify-center select-none z-10 transition-colors duration-150',
        isRow
          ? 'w-[5px] h-full cursor-col-resize'
          : 'h-[5px] w-full cursor-row-resize',
        active
          ? 'bg-red-500/30'
          : 'bg-transparent hover:bg-red-500/15',
      ].join(' ')}
    >
      {/* Visual indicator */}
      {isRow ? (
        <div className={[
          'h-12 w-[3px] rounded-full transition-all duration-150',
          active ? 'bg-red-500/70 h-20' : 'bg-white/[0.10] group-hover:bg-red-500/30',
        ].join(' ')} />
      ) : (
        <div className={[
          'w-12 h-[3px] rounded-full transition-all duration-150',
          active ? 'bg-red-500/70 w-20' : 'bg-white/[0.10] group-hover:bg-red-500/30',
        ].join(' ')} />
      )}

      {/* Wider hit area */}
      <div className={[
        'absolute',
        isRow ? 'inset-y-0 -left-1.5 -right-1.5' : 'inset-x-0 -top-1.5 -bottom-1.5',
      ].join(' ')} />
    </div>
  );
};
