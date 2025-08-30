import styles from './SearchBar.module.css';
import type { ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className={styles.wrapper}>
      <span role="img" aria-label="search">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search country..."
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className={styles.input}
      />
    </div>
  );
};
