import styles from './ColumnSelectorModal.module.css';
import type { YearlyData } from '../../types/co2';

interface Props {
  open: boolean;
  onClose: () => void;
  selected: string[];
  onSave: (cols: string[]) => void;
}

const allColumns: (keyof YearlyData)[] = [
  'year',
  'population',
  'co2',
  'co2_per_capita',
  'methane',
  'oil_co2',
  'temperature_change_from_co2',
  'total_ghg',
];

export const ColumnSelectorModal = ({
  open,
  onClose,
  selected,
  onSave,
}: Props) => {
  if (!open) return null;

  const toggle = (col: keyof YearlyData) => {
    const colStr = String(col);
    if (selected.includes(colStr)) {
      onSave(selected.filter((c) => c !== colStr));
    } else {
      onSave([...selected, colStr]);
    }
  };

  return (
    <div className={styles.modal}>
      <h3 className={styles.title}>Settings</h3>
      <div className={styles.checkboxGroup}>
        {allColumns.map((col) => (
          <label key={col} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={
                selected.includes(String(col)) ||
                ['year', 'population', 'co2', 'co2_per_capita'].includes(
                  String(col)
                )
              }
              onChange={() => toggle(col)}
            />
            {col}
          </label>
        ))}
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
    </div>
  );
};
