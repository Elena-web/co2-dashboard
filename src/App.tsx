import { Suspense, useState, useCallback } from 'react';
import { useCO2Data } from './hooks/useCO2Data';
import Spinner from './components/Spinner/Spinner';
import { YearSelector } from './components/YearSelector/YearSelector';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SortControls } from './components/SortControls/SortControls';
import { ColumnSelectorModal } from './components/ColumnSelectorModal/ColumnSelectorModal';
import { CountryCard } from './components/CountryCard/CountryCard';
import { CountryTable } from './components/CountryTable/CountryTable';
import type { CO2Data } from './types/co2';
import './App.css';
export default function App() {
  const data: CO2Data = useCO2Data();

  const [year, setYear] = useState<number>(2020);
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [extraColumns, setExtraColumns] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleSearch = useCallback((val: string) => setSearch(val), []);

  const handleSort = useCallback(
    (by: 'name' | 'population') => {
      if (sortBy === by) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(by);
        setSortOrder('asc');
      }
    },
    [sortBy, sortOrder]
  );

  const filteredData = Object.fromEntries(
    Object.entries(data)
      .filter(
        ([name, country]) =>
          country && name.toLowerCase().includes(search.toLowerCase())
      )
      .sort(([nameA, a], [nameB, b]) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc'
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        }

        const popA = a.data.find((d) => d.year === year)?.population ?? 0;
        const popB = b.data.find((d) => d.year === year)?.population ?? 0;

        return sortOrder === 'asc' ? popA - popB : popB - popA;
      })
  );

  return (
    <Suspense fallback={<Spinner />}>
      <div>
        <h1>🌍 CO₂ Emissions Dashboard</h1>
        <YearSelector year={year} onChange={setYear} />
        <SearchBar value={search} onChange={handleSearch} />
        <SortControls
          sortBy={sortBy}
          sortOrder={sortOrder}
          onChange={handleSort}
        />
        <button onClick={() => setModalOpen(true)}>⚙️ Settings</button>
        <ColumnSelectorModal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          selected={extraColumns}
          onSave={setExtraColumns}
        />
        {selectedCountry && data[selectedCountry] ? (
          <div>
            <button onClick={() => setSelectedCountry(null)}>Hide</button>
            <CountryCard
              name={selectedCountry}
              country={data[selectedCountry]}
              year={year}
              extraColumns={extraColumns}
            />
          </div>
        ) : (
          <CountryTable
            data={filteredData}
            year={year}
            extraColumns={extraColumns}
            onShowCountry={setSelectedCountry}
          />
        )}
      </div>
    </Suspense>
  );
}
