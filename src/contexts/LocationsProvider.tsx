import { getGeoLocation } from '@/lib/api/open-meteo'
import { createContext, use, useState, useEffect } from 'react'
import { useDebounce } from '@/hooks'
import { getClientLocation } from '@/lib/api/ipapi'

interface LocationsContextType {
  isLoading: boolean
  searchTerm: string
  geoLocations: object[]
  currentLocation: Location | InitialLocation | null
}

export const LocationsContext = createContext<LocationsContextType | any>(null)

interface LocationsProviderProps {
  children: React.ReactNode
}

type Location = {
  id: number
  name: string
  latitude: number
  longitude: number
  elevation: number
  feature_code: string
  country_code: string
  admin1_id: number
  admin2_id?: number
  admin3_id?: number
  admin4_id?: number
  timezone: string
  population: number
  postcodes: string[]
  country_id: number
  country: string
  admin1: string
  admin2?: string
  admin3?: string
  admin4?: string
}

type InitialLocation = Pick<
  Location,
  'latitude' | 'longitude' | 'country' | 'admin1'
>

const LocationsProvider = ({ children }: LocationsProviderProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [geoLocations, setGeoLocations] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentLocation, setCurrentLocation] = useState<
    Location | InitialLocation | null
  >(null)
  const debouncedSearchTerm = useDebounce(searchTerm)

  const fetchGeoLocations = async (searchTerm: string) => {
    setIsLoading(true)
    const data = await getGeoLocation(searchTerm)
    const results = data.results ? data.results : []
    setGeoLocations(results)
    console.log(results)
    setIsLoading(false)
  }

  const fetchInitialCurrentLocation = async () => {
    const data = await getClientLocation()
    console.log(data)
    setCurrentLocation(data)
  }

  const onSearchGeoLocations = async () => {
    const trimmedSearchTerm = debouncedSearchTerm.trim()
    if (trimmedSearchTerm.length > 1) {
      await fetchGeoLocations(trimmedSearchTerm)
    }
  }

  useEffect(() => {
    onSearchGeoLocations()
  }, [debouncedSearchTerm])

  const value = {
    isLoading,
    searchTerm,
    geoLocations,
    currentLocation,
    setSearchTerm,
    setCurrentLocation,
    fetchGeoLocations,
    fetchInitialCurrentLocation,
  }

  return <LocationsContext value={value}>{children}</LocationsContext>
}

export const useLocations = () => use(LocationsContext)

export default LocationsProvider
