'use client'

import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import { getCountries } from '@/data'
import { useState, useEffect } from 'react'

// Define Country type based on Prisma schema
type Country = {
  id: number
  name: string
  code: string
  flagUrl: string
  regions: string[]
}

export function Address() {
  const [countries, setCountries] = useState<Country[]>([])
  const [country, setCountry] = useState<Country | null>(null)
  
  useEffect(() => {
    async function loadData() {
      const countriesData = await getCountries()
      setCountries(countriesData)
      setCountry(countriesData[0])
    }
    
    loadData()
  }, [])

  return (
    <div className="grid grid-cols-2 gap-6">
      <Input
        aria-label="Street Address"
        name="address"
        placeholder="Street Address"
        defaultValue="147 Catalyst Ave"
        className="col-span-2"
      />
      <Input aria-label="City" name="city" placeholder="City" defaultValue="Toronto" className="col-span-2" />
      <Listbox aria-label="Region" name="region" placeholder="Region" defaultValue="Ontario">
        {country?.regions?.map((region: string) => (
          <ListboxOption key={region} value={region}>
            <ListboxLabel>{region}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
      <Input aria-label="Postal code" name="postal_code" placeholder="Postal Code" defaultValue="A1A 1A1" />
      <Listbox
        aria-label="Country"
        name="country"
        placeholder="Country"
        by="code"
        value={country}
        onChange={(selectedCountry) => setCountry(selectedCountry as Country)}
        className="col-span-2"
      >
        {countries.map((countryItem) => (
          <ListboxOption key={countryItem.code} value={countryItem}>
            <img className="w-5 sm:w-4" src={countryItem.flagUrl} alt="" />
            <ListboxLabel>{countryItem.name}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  )
}
