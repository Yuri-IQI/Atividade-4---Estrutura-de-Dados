import { useEffect, useState } from "react";
import styles from "../../styles/OpsBody.module.css";
import type { TreeNode } from "../../types/TreeNode";

interface MenuBodyProps {
    onInsert: (value: number) => void;
    onDelete: (value: number) => void;
    selectedNode: TreeNode | null;
}

export const MenuBody: React.FC<MenuBodyProps> = ({
  onInsert,
  onDelete,
  selectedNode
}) => {
    const [value, setValue] = useState<number | ''>('');
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && value) {
            onInsert(value);
            setValue('');
        }
    };

    useEffect(() => {
    if (selectedNode) {
        setValue(selectedNode.value);
    }
    }, [selectedNode]);

    return (
        <div className={styles.container}>
            <div className={styles.control}>
                <input
                    type="number"
                    id="nodeValue"
                    value={value}
                    onChange={(e) => setValue(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                    onKeyDown={handleKeyDown}
                    placeholder="Valor do Nó"
                    className={styles.inputBar}
                />
                <span className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={() => {
                            if (value !== '') onInsert(value as number);
                            setValue('');
                        }}
                        disabled={value === ''}
                        className={styles.button}
                    >
                        Inserir
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (value !== '') onDelete(value as number);
                            setValue('');
                        }}
                        disabled={value === ''}
                        className={styles.button}
                    >
                        Deletar
                    </button>
                </span>
            </div>
        </div>
    );
};