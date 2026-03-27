import { useEffect, useState, useMemo } from 'react'
import { type Country, CountrySchema } from '../types/country.ts'
import CountryCard from './CountryCard.tsx'
import { z } from 'zod'

export function CountryList() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [searchCountry, setSearchCountry] = useState('')

  const regions = useMemo(
    () => Array.from(new Set(countries.map(c => c.region))).sort(),
    [countries]
  )

  let filteredCountries = countries

  // Apply region filter
  if (selectedRegion) {
    filteredCountries = filteredCountries.filter(
      c => c.region === selectedRegion
    )
  }

  // Apply search filter
  if (searchCountry) {
    filteredCountries = filteredCountries.filter(c =>
      c.name.common.toLowerCase().includes(searchCountry.toLowerCase())
    )
  }

  useEffect(() => {
    async function fetchCountries() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,tld,currencies,borders,cca3'
        )
        if (!response.ok) {
          throw Error('A problem occurred fetching.')
        }
        const data = (await response.json()) as unknown
        const countries = z.array(CountrySchema).parse(data)
        setCountries(countries)
      } catch (error) {
        console.log(error)
        setError('Failed to fetch countries')
      } finally {
        setLoading(false)
      }
    }

    void fetchCountries()
  }, [])

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
      <h1 className="text-3xl font-bold mb-8">Where in the world?</h1>
      <div>
        <input
          type="text"
          placeholder="Search for a country"
          onChange={e => {
            setSearchCountry(e.target.value)
          }}
          value={searchCountry}
        />
        <select
          name="filter-by-region"
          id="filter-by-region"
          value={selectedRegion}
          onChange={e => {
            setSelectedRegion(e.target.value)
          }}
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCountries.map(c => {
          return <CountryCard country={c} key={c.name.common} />
        })}
      </div>
    </div>
  )
}
