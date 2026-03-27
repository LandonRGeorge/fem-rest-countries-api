import { useMemo, useState } from 'react'
import { useCountries } from '../context/CountriesContext'
import CountryCard from '../components/CountryCard'

export default function HomePage() {
  const { countries, loading, error } = useCountries()
  const [selectedRegion, setSelectedRegion] = useState('')
  const [searchCountry, setSearchCountry] = useState('')
  const [populationSort, setPopulationSort] = useState<'asc' | 'desc' | ''>('')

  const regions = useMemo(
    () => Array.from(new Set(countries.map(c => c.region))).sort(),
    [countries]
  )

  const filteredCountries = useMemo(() => {
    let result = countries

    if (selectedRegion) {
      result = result.filter(c => c.region === selectedRegion)
    }

    if (searchCountry) {
      result = result.filter(c =>
        c.name.common.toLowerCase().includes(searchCountry.toLowerCase())
      )
    }

    if (populationSort) {
      result = [...result].sort((a, b) =>
        populationSort === 'asc'
          ? a.population - b.population
          : b.population - a.population
      )
    }

    return result
  }, [countries, selectedRegion, searchCountry, populationSort])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center">Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search for a country"
          onChange={e => {
            setSearchCountry(e.target.value)
          }}
          value={searchCountry}
          className="px-8 py-4 rounded shadow-md bg-white dark:bg-[hsl(209,23%,22%)] dark:text-white dark:placeholder-gray-400 w-full sm:w-96"
        />
        <div className="flex gap-4">
          <select
            name="filter-by-region"
            id="filter-by-region"
            value={selectedRegion}
            onChange={e => {
              setSelectedRegion(e.target.value)
            }}
            className="px-8 py-4 rounded shadow-md bg-white dark:bg-[hsl(209,23%,22%)] dark:text-white w-48"
          >
            <option value="">All Regions</option>
            {regions.map(r => {
              return (
                <option key={r} value={r}>
                  {r}
                </option>
              )
            })}
          </select>
          <select
            name="sort-by-population"
            id="sort-by-population"
            value={populationSort}
            onChange={e => {
              setPopulationSort(e.target.value as 'asc' | 'desc' | '')
            }}
            className="px-8 py-4 rounded shadow-md bg-white dark:bg-[hsl(209,23%,22%)] dark:text-white w-60"
          >
            <option value="">Population</option>
            <option value="desc">Most Populated</option>
            <option value="asc">Least Populated</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCountries.map(c => {
          return <CountryCard country={c} key={c.name.common} />
        })}
      </div>
    </div>
  )
}
