/**
 * Red King — Shell
 * useResize
 *
 * Drag-to-resize primitive. Attaches global mousemove/mouseup listeners
 * during a drag and calls onChange with the new size value.
 *
 * @param direction
 *   'right'  — dragging the right edge of a left panel (clientX increases → grows)
 *   'left'   — dragging the left edge of a right panel (clientX decreases → grows)
 *   'top'    — dragging the top edge of a bottom panel (clientY decreases → grows)
 *
 * @param currentValue  Current width or height in px
 * @param onChange      Called with the new value during drag
 */

import { useCallback } from 'react';
import type React from 'react';

type ResizeDirection = 'right' | 'left' | 'top';

export function useResize(
  direction: ResizeDirection,
  currentValue: number,
  onChange: (newValue: number) => void,
): { onMouseDown: (e: React.MouseEvent) => void } {
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const isVertical = direction === 'top';
      const startPos = isVertical ? e.clientY : e.clientX;
      const startValue = currentValue;

      const onMouseMove = (ev: MouseEvent) => {
        const pos = isVertical ? ev.clientY : ev.clientX;
        let delta: number;

        if (direction === 'right') delta = pos - startPos;   // right edge: move right = expand
        else if (direction === 'left') delta = startPos - pos; // left edge: move left = expand
        else delta = startPos - pos;                           // top edge: move up = expand

        onChange(startValue + delta);
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };

      document.body.style.cursor = isVertical ? 'row-resize' : 'col-resize';
      document.body.style.userSelect = 'none';

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [direction, currentValue, onChange],
  );

  return { onMouseDown };
}
