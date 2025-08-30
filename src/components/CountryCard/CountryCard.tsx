import type { CountryData } from '../../types/co2';
import { CountryTable } from '../CountryTable/CountryTable';
import styles from './CountryCard.module.css';

interface Props {
  name: string;
  country: CountryData;
  year: number;
  extraColumns: string[];
}

export const CountryCard = ({ name, country, year, extraColumns }: Props) => {
  const latest = country.data.find((d) => d.year === year);

  return (
    <div className={styles.card}>
      <h2 className={styles.header}>
        {name} ({country.iso_code ?? 'N/A'})
      </h2>
      <p className={styles.subtext}>
        Population: {latest?.population ?? 'N/A'}
      </p>
      <CountryTable
        data={{ [name]: country }}
        extraColumns={extraColumns}
        year={year}
        onShowCountry={() => {}}
      />
    </div>
  );
};
