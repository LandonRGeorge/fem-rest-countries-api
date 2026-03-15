import { type Country } from '../types/country.ts'

type CountryCardProps = {
  country: Country
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={country.flags.svg}
          alt={country.flags.alt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">{country.name.common}</h2>
        <ul className="space-y-2">
          <li>
            <span className="font-semibold">Population:</span>{' '}
            {country.population.toLocaleString()}
          </li>
          <li>
            <span className="font-semibold">Region:</span> {country.region}
          </li>
          <li>
            <span className="font-semibold">Capital:</span>{' '}
            {country.capital.join(', ')}
          </li>
        </ul>
      </div>
    </div>
  )
}
