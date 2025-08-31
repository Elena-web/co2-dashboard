import React, { useCallback, useMemo } from 'react';
import styles from './ColumnSelectorModal.module.css';
import type { YearlyData } from '../../types/co2';

interface Props {
  open: boolean;
  onClose: () => void;
  selected: string[];
  onSave: (cols: string[]) => void;
}

const baseColumns: (keyof YearlyData)[] = [
  'year',
  'population',
  'co2',
  'co2_per_capita',
  'methane',
  'oil_co2',
  'temperature_change_from_co2',
  'total_ghg',
];

export const ColumnSelectorModal = React.memo(function ColumnSelectorModal({
  open,
  onClose,
  selected,
  onSave,
}: Props) {
  const allColumns = useMemo(() => baseColumns, []);

  const toggle = useCallback(
    (col: keyof YearlyData) => {
      const colStr = String(col);
      if (selected.includes(colStr)) {
        onSave(selected.filter((c) => c !== colStr));
      } else {
        onSave([...selected, colStr]);
      }
    },
    [selected, onSave]
  );

  if (!open) return null;

  return (
    <div className={styles.modal}>
      <h3 className={styles.title}>Settings</h3>
      <div className={styles.checkboxGroup}>
        {allColumns.map((col) => {
          const colStr = String(col);
          const isDefault = [
            'year',
            'population',
            'co2',
            'co2_per_capita',
          ].includes(colStr);
          return (
            <label key={col} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selected.includes(colStr) || isDefault}
                onChange={() => toggle(col)}
              />
              {col}
            </label>
          );
        })}
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
    </div>
  );
});
