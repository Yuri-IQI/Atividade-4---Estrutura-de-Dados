import { useState } from 'react';
import './App.css'
import { TreeOperationsMenu } from './components/TreeOperationsMenu'
import type { TreeNode } from './types/TreeNode';
import { TreeVisualization } from './components/TreeVisualization';

function App() {
  const [rootNode, setRootNode] = useState<TreeNode | null>(null);

  return (
    <>
      <TreeOperationsMenu rootNode={rootNode} setRootNode={setRootNode} />
      <TreeVisualization root={rootNode} />
    </>
  )
}

export default App