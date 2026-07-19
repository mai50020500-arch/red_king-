/**
 * Red King — Docking Workspace
 * SplitContainer — recursively renders the layout tree.
 *
 * - PanelLeaf  → DockPanel
 * - PanelGroup → flex container with SplitterBars between children
 */

import React, { useRef } from 'react';
import type { LayoutNode } from './types';
import { DockPanel } from './DockPanel';
import { SplitterBar } from './SplitterBar';
import { useWorkspace } from './WorkspaceContext';

interface SplitContainerProps {
  node:   LayoutNode;
  isOnly: boolean; // true when the root node is a lone panel
}

export const SplitContainer: React.FC<SplitContainerProps> = ({ node, isOnly }) => {
  const { updateGroupSizes } = useWorkspace();

  if (node.type === 'panel') {
    return <DockPanel node={node} isOnly={isOnly} />;
  }

  /* PanelGroup */
  const containerRef = useRef<HTMLDivElement>(null);
  const isRow = node.direction === 'row';

  return (
    <div
      ref={containerRef}
      className={[
        'flex flex-1 min-w-0 min-h-0 overflow-hidden gap-0',
        isRow ? 'flex-row' : 'flex-col',
      ].join(' ')}
    >
      {node.children.map((child, idx) => (
        <React.Fragment key={child.id}>
          {/* Splitter before every child except the first */}
          {idx > 0 && (
            <SplitterBar
              direction={node.direction}
              index={idx - 1}
              sizes={node.sizes}
              containerRef={containerRef}
              onSizesChange={(sizes) => updateGroupSizes(node.id, sizes)}
            />
          )}

          {/* Child — flex weight controls sizing */}
          <div
            className="min-w-0 min-h-0 overflow-hidden flex"
            style={{
              flex: node.sizes[idx] ?? 1,
              flexDirection: isRow ? 'column' : 'row',
            }}
          >
            <SplitContainer node={child} isOnly={false} />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
