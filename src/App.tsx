import './App.css'
import { useEffect, useState } from 'react'

type Country = {
  flags: {
    png: string
    svg: string
    alt: string
  }
  name: {
    common: string
    official: string
    nativeName: Record<
      string,
      {
        official: string
        common: string
      }
    >
  }
  currencies: Record<
    string,
    {
      name: string
      symbol: string
    }
  >
  languages: Record<string, string>
  tld: string[]
  capital: string[]
  region: string
  subregion: string
  borders: string[]
  population: number
}

function App() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchCountries() {
      try {
        setLoading(true)
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders'
        )
        const data = (await response.json()) as Country[]
        setCountries(data)
      } catch (error) {
        console.error('Failed to fetch countries:', error)
      } finally {
        setLoading(false)
      }
    }

    void fetchCountries()
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <h1>Countries</h1>
      <ul>
        {countries.map(c => {
          return <li key={c.name.common}>{c.name.common}</li>
        })}
      </ul>
    </>
  )
}

export default App
