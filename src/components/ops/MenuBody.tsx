import { useState } from "react";
import styles from "../../styles/OpsBody.module.css";

interface MenuBodyProps {
    onInsert: (value: number) => void;
    onDelete: (value: number) => void;
}

export const MenuBody: React.FC<MenuBodyProps> = ({
  onInsert,
  onDelete
}) => {
    const [value, setValue] = useState<number | ''>('');
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && value) {
            onInsert(value);
            setValue('');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.control}>
                <input
                    type="number"
                    id="nodeValue"
                    value={value}
                    onChange={(e) => setValue(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter node value"
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
                        Insert
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
                        Delete
                    </button>
                </span>
            </div>
        </div>
    );
};