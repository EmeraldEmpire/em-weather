import { useLocations } from '@/contexts/LocationsProvider'

const SearchResultsItem = ({ geoLocation }: any) => {
  const { setCurrentLocation, setSearchTerm } = useLocations()

  const handleClick = () => {
    setCurrentLocation(geoLocation)
    setSearchTerm('')
  }

  return (
    <>
      <p
        className="cursor-pointer hover:bg-neutral-700 rounded-md border-transparent hover:border-neutral-600 font-medium border px-2 py-1.5"
        onClick={() => {
          handleClick()
        }}
      >
        {geoLocation.admin4 ||
          geoLocation.admin3 ||
          geoLocation.admin2 ||
          geoLocation.admin1 ||
          geoLocation.name}
      </p>
    </>
  )
}

export default SearchResultsItem
