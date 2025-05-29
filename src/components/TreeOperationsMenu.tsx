import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { OpsHeaderButton } from "./ops/OpsHeaderButton";
import styles from "../styles/TreeOperationsMenu.module.css";
import { InsertionMenu } from "./ops/InsertionMenu";
import { DeleteMenu } from "./ops/DeleteMenu";
import type { TreeNode } from "../types/TreeNode";
import { findNode } from "../services/binaryTreeService";
import { addNode } from "../services/redBlackTreeService";

interface TreeOperationsMenuProps {
    rootNode: TreeNode | null;
    setRootNode?: (node: TreeNode | null) => void;
}

export const TreeOperationsMenu = ({ rootNode, setRootNode }: TreeOperationsMenuProps) => {
    const tabs = ['Insert', 'Delete'];
    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const nodeRef = useRef<HTMLDivElement>(null);
    
    const handleTabSelection = (tab: string) => {
        if (tab !== currentTab) {
            setCurrentTab(tab);
            console.log("Selected Tab:", tab);
        }
    };

    const handleNodeInsertion = (value: number) => {
        if (isNaN(value)) {
            alert("Invalid number");
            return;
        }

        const existing = findNode(rootNode, value);
        if (existing) {
            alert("Node already exists");
            return;
        }

        const newRoot = addNode(rootNode, value);
        setRootNode?.({...newRoot});
    };

    const handleNodeDeletion = (value: number) => {
        console.log("Deleted value:", value);
    };

    return (
        <Draggable handle={`.${styles.header}`} nodeRef={nodeRef as React.RefObject<HTMLElement>}>
            <div className={styles.container} ref={nodeRef}>
                <div className={styles.header}>
                    {tabs.map((tab) => (
                        <span key={tab}>
                            {OpsHeaderButton(tab, {
                                onTabSelection: () => handleTabSelection(tab),
                            })}
                        </span>
                    ))}
                </div>

                <div className={styles.body}>
                    {currentTab === 'Insert' && <InsertionMenu onInsert={handleNodeInsertion} />}
                    {currentTab === 'Delete' && <DeleteMenu onDelete={handleNodeDeletion} />}
                </div>
            </div>
        </Draggable>
    );
};
