import { use } from 'react'
import { WeatherContext } from '@/contexts/WeatherProvider'
import { formatDate, unitConverter, weatherUnits } from '@/lib/utils'
import { WEATHER_OBJECT } from '@/constants'
import { useLocations } from '@/contexts/LocationsProvider'
import { APP_URL } from '@/constants'

type UnitKey = keyof typeof weatherUnits

const CurrentForecast = () => {
  const weatherContext = use<any>(WeatherContext)

  const {
    temperature_2m,
    apparent_temperature,
    relative_humidity_2m,
    wind_speed_10m,
    precipitation,
    time,
    weather_code,
  } = weatherContext.weatherData.current

  const {
    tempUnit,
    windUnit,
    precipitationUnit,
  }: { tempUnit: UnitKey; windUnit: UnitKey; precipitationUnit: UnitKey } =
    weatherContext

  const { currentLocation } = useLocations()

  return (
    <>
      <div className="bg-[url('/assets/images/bg-today-large.svg')] bg-center rounded-3xl px-6 py-20">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="text-3xl font-[550]">
              {currentLocation.admin4 ||
                currentLocation.admin3 ||
                currentLocation.admin2 ||
                currentLocation.admin1}
              , {currentLocation.country}
            </p>
            <p className="text-neutral-200">{formatDate(time)}</p>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={`${APP_URL}/assets/images/${WEATHER_OBJECT[weather_code].day.image}`}
              alt="Sunny"
              width={128}
              height={128}
            />
            <p className="text-8xl italic font-[550]">
              {unitConverter(tempUnit, temperature_2m)}°
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="flex col-span-1 flex-col gap-4 rounded-xl bg-neutral-800 px-6 py-4 border-1 border-neutral-600">
          <p className="text-neutral-200">Feels Like</p>
          <p className="font-extralight text-neutral-50 text-3xl">
            {unitConverter(tempUnit, apparent_temperature)}°
          </p>
        </div>
        <div className="flex col-span-1 flex-col gap-4 rounded-xl bg-neutral-800 px-6 py-4 border-1 border-neutral-600">
          <p className="text-neutral-200">Humidity</p>
          <p className="font-extralight text-neutral-50 text-3xl">{`${relative_humidity_2m}%`}</p>
        </div>
        <div className="flex col-span-1 flex-col gap-4 rounded-xl bg-neutral-800 px-6 py-4 border-1 border-neutral-600">
          <p className="text-neutral-200">Wind</p>
          <p className="font-extralight text-neutral-50 text-3xl">{`${unitConverter(
            windUnit,
            wind_speed_10m
          )} ${weatherUnits[windUnit]}`}</p>
        </div>
        <div className="flex col-span-1 flex-col gap-4 rounded-xl bg-neutral-800 px-6 py-4 border-1 border-neutral-600">
          <p className="text-neutral-200">Precipitation</p>
          <p className="font-extralight text-neutral-50 text-3xl">{`${unitConverter(
            precipitationUnit,
            precipitation
          )} ${weatherUnits[precipitationUnit]}`}</p>
        </div>
      </div>
    </>
  )
}

export default CurrentForecast
