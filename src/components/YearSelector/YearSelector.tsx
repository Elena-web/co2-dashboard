import styles from './YearSelector.module.css';

interface Props {
  year: number;
  onChange: (val: number) => void;
}

export const YearSelector = ({ year, onChange }: Props) => (
  <input
    className={styles.input}
    type="number"
    value={year}
    onChange={(e) => onChange(Number(e.target.value))}
  />
);
