import { type Country } from '../types/country'
import { BackButton } from './BackButton'
import { BorderCountries } from './BorderCountries'

type CountryDetailProps = {
  country: Country
}

export default function CountryDetail({ country }: CountryDetailProps) {
  const nativeName =
    Object.values(country.name.nativeName)[0]?.common ?? country.name.common

  const currencies = Object.values(country.currencies)
    .map(c => c.name)
    .join(', ')

  const domains = country.tld.join(', ')

  return (
    <div className="container mx-auto px-4 py-8 dark:text-white">
      <div className="mb-8">
        <BackButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div>
          <img
            src={country.flags.svg}
            alt={country.flags.alt}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-6">{country.name.common}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Native Name:</span> {nativeName}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{' '}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{' '}
                {country.subregion}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{' '}
                {country.capital.join(', ')}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Top Level Domain:</span>{' '}
                {domains}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span> {currencies}
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Border Countries:</h2>
            <BorderCountries borders={country.borders} />
          </div>
        </div>
      </div>
    </div>
  )
}
