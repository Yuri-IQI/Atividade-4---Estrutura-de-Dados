import { useState } from "react";
import styles from "../../styles/OpsBody.module.css";

interface InsertionMenuProps {
  onInsert: (value: number) => void;
}

export const InsertionMenu: React.FC<InsertionMenuProps> = ({
  onInsert,
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
                    onClick={() => { if (typeof value === 'number') onInsert(value); setValue(''); }}
                    disabled={!value}
                    className={styles.button}
                >
                    Insert
                </button>
            </div>
        </div>
    );
};