import CurrentForecast from './CurrentForecast'
import { use, useEffect } from 'react'
import { WeatherContext } from '@/contexts/WeatherProvider'
import { useLocations } from '@/contexts/LocationsProvider'
import DailyForecast from './DailyForecast'
import HourlyForecast from './HourlyForecast'

const Weather = () => {
  const { isLoading } = use(WeatherContext)
  const { fetchInitialCurrentLocation } = useLocations()

  useEffect(() => {
    fetchInitialCurrentLocation()
  }, [])

  if (isLoading) return <>Loading...</>

  return (
    <div className="grid grid-cols-12 gap-8 items-start w-full">
      <div className="col-span-8 flex flex-col gap-8">
        <CurrentForecast />
        <DailyForecast />
      </div>
      <aside className="col-span-4 bg-neutral-800 p-5 rounded-2xl">
        <HourlyForecast />
      </aside>
    </div>
  )
}

export default Weather
