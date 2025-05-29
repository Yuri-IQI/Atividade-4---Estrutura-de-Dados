import React from 'react';
import type { TreeNode } from '../../types/TreeNode';
import { ColorMap } from '../../types/enums/Color';

type NodeRepresentationProps = {
  node: TreeNode;
  x: number;
  y: number;
};

export const NodeRepresentation: React.FC<NodeRepresentationProps> = ({ node, x, y }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        backgroundColor: ColorMap[node.color as keyof typeof ColorMap],
        color: 'white',
        padding: '8px 12px',
        borderRadius: '50%',
        textAlign: 'center',
        minWidth: 20,
        minHeight: 20,
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold',
        border: '2px solid #aeaeae'
      }}
    >
      {node.value}
    </div>
  );
};