import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { type Country, CountrySchema } from '../types/country.ts'
import { z } from 'zod'

interface CountriesContextValue {
  countries: Country[]
  loading: boolean
  error: string
  getCountryByCode: (cca3: string) => Country | undefined
}

const CountriesContext = createContext<CountriesContextValue | null>(null)

export function CountriesProvider({ children }: { children: ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  const getCountryByCode = (cca3: string): Country | undefined => {
    return countries.find(country => country.cca3 === cca3)
  }

  return (
    <CountriesContext.Provider
      value={{ countries, loading, error, getCountryByCode }}
    >
      {children}
    </CountriesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCountries() {
  const context = useContext(CountriesContext)
  if (!context) {
    throw new Error('useCountries must be used within CountriesProvider')
  }
  return context
}
