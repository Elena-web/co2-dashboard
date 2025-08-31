import styles from './SortControls.module.css';

interface Props {
  sortBy: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onChange: (by: 'name' | 'population', order: 'asc' | 'desc') => void;
}

export const SortControls = ({ sortBy, sortOrder, onChange }: Props) => (
  <div className={styles.container}>
    <select
      className={styles.select}
      value={sortBy}
      onChange={(e) =>
        onChange(e.target.value as 'name' | 'population', sortOrder)
      }
    >
      <option value="name">Name</option>
      <option value="population">Population</option>
    </select>
    <select
      className={styles.select}
      value={sortOrder}
      onChange={(e) => onChange(sortBy, e.target.value as 'asc' | 'desc')}
    >
      <option value="asc">↑ Sort Ascending</option>
      <option value="desc">↓ Sort Descending</option>
    </select>
  </div>
);
