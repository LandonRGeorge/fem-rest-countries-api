import { z } from 'zod'

export const CountrySchema = z.object({
  flags: z.object({
    png: z.string(),
    svg: z.string(),
    alt: z.string(),
  }),
  name: z.object({
    common: z.string(),
    official: z.string(),
    nativeName: z.record(
      z.string(),
      z.object({
        official: z.string(),
        common: z.string(),
      })
    ),
  }),
  currencies: z.record(
    z.string(),
    z.object({
      name: z.string(),
      symbol: z.string(),
    })
  ),
  languages: z.record(z.string(), z.string()),
  tld: z.array(z.string()),
  capital: z.array(z.string()),
  region: z.string(),
  subregion: z.string(),
  borders: z.array(z.string()),
  population: z.number(),
})

export type Country = z.infer<typeof CountrySchema>
