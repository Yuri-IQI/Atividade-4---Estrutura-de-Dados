import { useState } from "react";
import styles from "../../styles/OpsBody.module.css";

interface DeleteMenuProps {
  onDelete: (value: number) => void;
}

export const DeleteMenu: React.FC<DeleteMenuProps> = ({
  onDelete,
}) => {
    const [value, setValue] = useState<number | ''>('');
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && value) {
            onDelete(value);
            setValue('');
        }
    };

    return (
        <div className={styles.container}>
            <label htmlFor="nodeValue" className="input-label">
                Node Value
            </label>
            <div className={styles.control}>
                <input
                    type="number"
                    id="nodeValue"
                    value={value}
                    onChange={(e) => setValue(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter node value"
                    style={{
                        MozAppearance: 'textfield',
                        WebkitAppearance: 'textfield',
                        width: '60%',
                    }}
                />
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
            </div>
        </div>
    );
};