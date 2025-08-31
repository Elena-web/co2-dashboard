import type { CO2Data } from '../../types/co2';
import styles from './CountryList.module.css';

interface Props {
  data: CO2Data;
  year: number;
  search: string;
  sortBy: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onShowCountry: (name: string) => void;
}

export const CountryList = ({
  data,
  year,
  search,
  sortBy,
  sortOrder,
  onShowCountry,
}: Props) => {
  let entries = Object.entries(data);

  if (search) {
    entries = entries.filter(([name]) =>
      name.toLowerCase().includes(search.toLowerCase())
    );
  }

  entries.sort(([nameA, a], [nameB, b]) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
    const popA = a.data.find((d) => d.year === year)?.population ?? 0;
    const popB = b.data.find((d) => d.year === year)?.population ?? 0;
    return sortOrder === 'asc' ? popA - popB : popB - popA;
  });

  return (
    <div>
      {entries.map(([name, country]) => {
        const latest = country.data.find((d) => d.year === year);
        return (
          <div
            key={name}
            style={{
              border: '1px solid #ccc',
              margin: '0.5rem',
              padding: '0.5rem',
            }}
            className={styles.item}
          >
            <div className={styles.item}>
              <strong>{name}</strong> | ISO: {country.iso_code ?? 'N/A'} |
              Population: {latest?.population ?? 'N/A'}
            </div>
            <button
              className={styles.button}
              onClick={() => onShowCountry(name)}
            >
              Show
            </button>
          </div>
        );
      })}
    </div>
  );
};
