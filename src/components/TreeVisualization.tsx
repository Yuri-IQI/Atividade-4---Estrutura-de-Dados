import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import type { TreeNode } from '../types/TreeNode';
import { NodeRepresentation } from './representations/NodeRepresentation';

type TreeVisualizationProps = {
  root: TreeNode | null;
  selectNode: (selectedNode: TreeNode) => void;
};

type PositionedNode = {
  x: number;
  y: number;
  data: TreeNode;
};

export const TreeVisualization: React.FC<TreeVisualizationProps> = ({ root, selectNode }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [nodes, setNodes] = useState<PositionedNode[]>([]);
  const [links, setLinks] = useState<d3.HierarchyPointLink<TreeNode>[]>([]);
  const [currentlySelectedNode, setcurrentlySelectedNode] = useState<TreeNode | null>(null);

  const handleNodeSelection = (selectedNode: TreeNode) => {
    if (currentlySelectedNode === selectedNode) setcurrentlySelectedNode(null);

    setcurrentlySelectedNode(selectedNode)
    selectNode(selectedNode);
  }

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!root) {
      setLinks([]);
      setNodes([]);
      return;
    }

    const hierarchyData = d3.hierarchy<TreeNode>(root, node => {
      const children: TreeNode[] = [];
      if (node.left) children.push(node.left);
      if (node.right) children.push(node.right);
      return children.length ? children : null;
    });

    const treeLayout = d3.tree<TreeNode>().size([dimensions.width - 100, dimensions.height - 100]);
    const treeData = treeLayout(hierarchyData);

    const spacing = 100;
    treeData.each(d => {
      if (d.parent) {
        const isLeft = d.parent.data.left === d.data;
        if (d.parent.children?.length === 1) d.x = d.parent.x + (isLeft ? -spacing : spacing);
      }
    });

    setLinks(treeData.links());
    setNodes(treeData.descendants().map(d => ({
      x: d.x + 50,
      y: d.y + 50,
      data: d.data,
    })));
  }, [root, dimensions]);

  return (
    <div>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <g>
          {links.map((link, i) => (
            <line
              key={i}
              x1={link.source.x + 50}
              y1={link.source.y + 50}
              x2={link.target.x + 50}
              y2={link.target.y + 50}
              stroke="#999"
              strokeWidth={2}
            />
          ))}
        </g>
      </svg>
      {nodes.map((node, i) => (
        <NodeRepresentation key={i} node={node.data} x={node.x} y={node.y} selectNode={handleNodeSelection} />
      ))}
    </div>
  );
};