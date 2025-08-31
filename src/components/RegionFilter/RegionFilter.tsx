import styles from './RegionFilter.module.css';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const RegionFilter = ({ value, onChange }: Props) => (
  <select
    className={styles.select}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="all">🌍 All regions</option>
    <option value="europe">🇪🇺 Europe</option>
    <option value="asia">🌏 Asia</option>
    <option value="africa">🌍 Africa</option>
    <option value="americas">🌎 America</option>
  </select>
);
