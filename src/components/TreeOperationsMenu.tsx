import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import styles from "../styles/TreeOperationsMenu.module.css";

import type { TreeNode } from "../types/TreeNode";
import { findNode } from "../services/binaryTreeService";
import { addNode, deleteNode } from "../services/redBlackTreeService";
import { MenuBody } from "./ops/MenuBody";

interface TreeOperationsMenuProps {
  rootNode: TreeNode | null;
  setRootNode?: (node: TreeNode | null) => void;
}

export const TreeOperationsMenu = ({ rootNode, setRootNode }: TreeOperationsMenuProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight });
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const menu = document.getElementById('ops-menu');
      const rect = menu?.getBoundingClientRect();
      setBounds({
        left: 0,
        top: 0,
        right: window.innerWidth - (rect?.width ?? 0),
        bottom: window.innerHeight - (rect?.height ?? 0),
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed]);

  const handleNodeInsertion = (value: number) => {
    if (isNaN(value)) return alert("Invalid number");
    if (findNode(rootNode, value)) return alert("Node already exists");

    const newRoot = addNode(rootNode, value);
    if (newRoot) setRootNode?.({ ...newRoot });
  };

  const handleNodeDeletion = (value: number) => {
    if (isNaN(value)) return alert("Invalid number");
    if (!findNode(rootNode, value)) return alert("Node doesn't exists");

    const newRoot = deleteNode(rootNode, value);
    if (newRoot) {
      setRootNode?.({ ...newRoot });
    } else {
      setRootNode?.(null);
    }
  };

  return (
    <Draggable handle={`.${styles.header}`} nodeRef={nodeRef as React.RefObject<HTMLElement>} bounds={bounds}>
      <div id="ops-menu" className={styles.container} ref={nodeRef}>
        <div className={styles.header}>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
            className={styles.collapseButton}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isCollapsed ? (
                <path d="M12 5v14M5 12h14" />
              ) : (
                <path d="M5 12h14" />
              )}
            </svg>
          </button>
          {!isCollapsed && <h3>Operações</h3>}
        </div>

        {!isCollapsed && (
          <div className={styles.body}>
            <MenuBody onDelete={handleNodeDeletion} onInsert={handleNodeInsertion} />
          </div>
        )}
      </div>
    </Draggable>
  );
};