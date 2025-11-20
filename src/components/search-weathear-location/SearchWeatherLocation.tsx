import iconSearch from '@/assets/images/icon-search.svg'
import { Button } from '../ui/button'
import SearchResults from './SearchResults'
import { useLocations } from '@/contexts/LocationsProvider'

const SearchLocation = () => {
  const { geoLocations, searchTerm, setSearchTerm } = useLocations()

  return (
    <div className="flex gap-4 w-160">
      <div className="flex gap-4 items-center relative bg-neutral-800 rounded-md py-3.5 px-6 w-full">
        <img src={iconSearch} alt="search-icon" />
        <input
          type="text"
          placeholder="Search for a place..."
          className="text-lg font-medium outline-none w-full placeholder-neutral-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {geoLocations.length > 0 && searchTerm.length > 0 && <SearchResults />}
      </div>
      <Button className="bg-blue-500 hover:bg-blue-500 hover:opacity-80 cursor-pointer py-3 h-auto text-xl font-normal px-6 my-0.25">
        Search
      </Button>
    </div>
  )
}

export default SearchLocation
