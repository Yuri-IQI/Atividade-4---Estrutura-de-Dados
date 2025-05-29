import { useState, useRef, useEffect } from "react";
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
    const [bounds, setBounds] = useState({ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight });
    
    useEffect(() => {
        const handleResize = () => {
            setBounds({
                left: 0,
                top: 0,
                right: window.innerWidth - (document.getElementById('ops-menu')?.getBoundingClientRect().width ?? 0),
                bottom: window.innerHeight - (document.getElementById('ops-menu')?.getBoundingClientRect().height ?? 0)
            });
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
        <Draggable handle={`.${styles.header}`} nodeRef={nodeRef as React.RefObject<HTMLElement>} bounds={bounds}>
            <div id="ops-menu" className={styles.container} ref={nodeRef}>
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
