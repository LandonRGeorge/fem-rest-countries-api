import { Link } from 'react-router-dom'
import { useCountries } from '../context/CountriesContext'

export function BorderCountries({ borders }: { borders: string[] }) {
  const { getCountryByCode } = useCountries()

  if (borders.length === 0) {
    return <p className="text-gray-600 dark:text-gray-400">No border countries</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {borders.map(code => {
        const country = getCountryByCode(code)
        return (
          <Link
            key={code}
            to={`/country/${code}`}
            className="px-6 py-2 bg-white dark:bg-[hsl(209,23%,22%)] dark:text-white rounded shadow hover:shadow-lg transition-shadow"
          >
            {country?.name.common ?? code}
          </Link>
        )
      })}
    </div>
  )
}
