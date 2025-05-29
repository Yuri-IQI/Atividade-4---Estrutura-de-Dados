/*import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import styles from "../styles/TreeOperationsMenu.module.css";

import type { TreeNode } from "../types/TreeNode";
import { findNode } from "../services/binaryTreeService";
import { addNode } from "../services/redBlackTreeService";
import { MenuBody } from "./ops/MenuBody";

interface TreeOperationsMenuProps {
  rootNode: TreeNode | null;
  setRootNode?: (node: TreeNode | null) => void;
}

export const TreeOperationsMenu = ({ rootNode, setRootNode }: TreeOperationsMenuProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const velocity = useRef({ x: 1.2, y: 1 });
  const [bounds, setBounds] = useState({ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight });
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const menu = document.getElementById("ops-menu");
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

  useEffect(() => {
    const animate = () => {
      setPosition((prev) => {
        const nextX = prev.x + velocity.current.x;
        const nextY = prev.y + velocity.current.y;

        const maxX = bounds.right;
        const maxY = bounds.bottom;

        if (nextX <= bounds.left || nextX >= maxX) velocity.current.x *= -1;
        if (nextY <= bounds.top || nextY >= maxY) velocity.current.y *= -1;

        return {
          x: Math.min(Math.max(nextX, bounds.left), maxX),
          y: Math.min(Math.max(nextY, bounds.top), maxY),
        };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [bounds]);

  const handleNodeInsertion = (value: number) => {
    if (isNaN(value)) return alert("Invalid number");
    if (findNode(rootNode, value)) return alert("Node already exists");

    const newRoot = addNode(rootNode, value);
    setRootNode?.({ ...newRoot });
  };

  const handleNodeDeletion = (value: number) => {
    console.log("Deleted value:", value);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle={`.${styles.header}`}
      bounds={bounds}
      position={position}
      onDrag={(_, data) => setPosition({ x: data.x, y: data.y })}
    >
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
              {isCollapsed ? <path d="M12 5v14M5 12h14" /> : <path d="M5 12h14" />}
            </svg>
          </button>
          {!isCollapsed && <h3>Operations</h3>}
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
*/