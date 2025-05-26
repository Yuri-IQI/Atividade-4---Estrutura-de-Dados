import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { OpsHeaderButton } from "./ops/OpsHeaderButton";
import styles from "../styles/TreeOperationsMenu.module.css";
import { InsertionMenu } from "./ops/InsertionMenu";
import { DeleteMenu } from "./ops/DeleteMenu";
import type { TreeNode } from "../types/TreeNode";
import { basicNodeInsertion, findNode } from "../services/binaryTreeService";

interface TreeOperationsMenuProps {
    rootNode: TreeNode | null;
    setRootNode?: (node: TreeNode | null) => void;
}

export const TreeOperationsMenu = ({ rootNode, setRootNode }: TreeOperationsMenuProps) => {
    const tabs = ['Insert', 'Remove'];
    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const nodeRef = useRef<HTMLDivElement>(null);
    
    const handleTabSelection = (tab: string) => {
        if (tab !== currentTab) {
            setCurrentTab(tab);
            console.log("Selected Tab:", tab);
        }
    };

    const handleNodeInsertion = (value: number) => {
        console.log("Inserted value:", value);
        if (findNode(rootNode, value)) return alert("Node already exists");

        const newRoot = basicNodeInsertion(rootNode, value);
        setRootNode?.(newRoot);
        console.log(newRoot);
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
                    {currentTab === 'Remove' && <DeleteMenu onDelete={handleNodeDeletion} />}
                </div>
            </div>
        </Draggable>
    );
};
