import { useParams, Link } from 'react-router-dom'
import { useCountries } from '../context/CountriesContext'
import CountryDetail from '../components/CountryDetail'

export default function DetailPage() {
  const { cca3 } = useParams<{ cca3: string }>()
  const { getCountryByCode, loading } = useCountries()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center">Loading...</h1>
      </div>
    )
  }

  if (!cca3) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Invalid URL</h1>
        <p className="mb-4">No country code provided.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to home
        </Link>
      </div>
    )
  }

  const country = getCountryByCode(cca3)

  if (!country) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Country Not Found
        </h1>
        <p className="mb-4">
          No country found with code: <code>{cca3}</code>
        </p>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to home
        </Link>
      </div>
    )
  }

  return <CountryDetail country={country} />
}
