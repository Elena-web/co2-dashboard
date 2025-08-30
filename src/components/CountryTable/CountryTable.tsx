import type { CO2Data, YearlyData } from '../../types/co2';
import styles from './CountryTable.module.css';

interface Props {
  data: CO2Data;
  year: number;
  extraColumns: string[];
  onShowCountry: (name: string) => void;
}

const defaultCols: (keyof YearlyData)[] = [
  'year',
  'population',
  'co2',
  'co2_per_capita',
];

export const CountryTable = ({
  data,
  year,
  extraColumns,
  onShowCountry,
}: Props) => {
  const cols = [...defaultCols, ...extraColumns];

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Country</th>
          <th>ISO</th>
          {cols.map((col) => (
            <th key={col}>{col}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([name, country]) => {
          if (!country || !country.data) {
            return null;
          }
          const row = country.data.find((d) => d.year === year);
          if (!row) {
            return null;
          }
          return (
            <tr key={name}>
              <td>{name}</td>
              <td>{country.iso_code ?? 'N/A'}</td>
              {cols.map((col) => (
                <td key={col}>{row[col] ?? 'N/A'}</td>
              ))}
              <td>
                <button
                  className={styles.button}
                  onClick={() => onShowCountry(name)}
                >
                  Show
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
