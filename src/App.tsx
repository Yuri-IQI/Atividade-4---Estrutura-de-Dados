import { useState } from 'react';
import './App.css'
import { TreeOperationsMenu } from './components/TreeOperationsMenu'
import type { TreeNode } from './types/TreeNode';
import { TreeVisualization } from './components/TreeVisualization';

function App() {
  const [rootNode, setRootNode] = useState<TreeNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const handleNodeSelection = (node: TreeNode) => {
    setSelectedNode(node);
  };

  return (
    <>
      <TreeOperationsMenu rootNode={rootNode} setRootNode={setRootNode} selectedNode={selectedNode} />
      <TreeVisualization root={rootNode} selectNode={handleNodeSelection} />
    </>
  )
}

export default App