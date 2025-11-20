import SearchResultsItem from './SearchResultsItem'
import { useLocations } from '@/contexts/LocationsProvider'

const SearchResults = () => {
  const { geoLocations } = useLocations()
  return (
    <div className="absolute top-full left-0 bg-neutral-800 rounded-lg w-full mt-2.5 p-2">
      {geoLocations.map((item: any) => (
        <SearchResultsItem key={item.id} geoLocation={item} />
      ))}
    </div>
  )
}

export default SearchResults
