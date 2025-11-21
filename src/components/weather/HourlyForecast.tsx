import { use } from 'react'
import { WeatherContext } from '@/contexts/WeatherProvider'
import HourlyForecastSelectDate from './HourlyForecastSelectDate'
import { WEATHER_OBJECT } from '@/constants'
import { unitConverter } from '@/lib/utils'

const HourlyForecast = () => {
  const { filterHourlyForecastByDate, tempUnit } = use(WeatherContext)

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-[550] my-2">Hourly Forecast</h2>
        <HourlyForecastSelectDate />
      </div>

      <div className="flex flex-col gap-4 overflow-y-scroll custom-scrollbar h-152">
        {filterHourlyForecastByDate().map((data: any, i: any) => {
          const formattedTime = Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            hour12: true,
          }).format(new Date(data.time))

          return (
            <div
              key={i}
              className="flex items-center justify-between rounded-md bg-neutral-700 border-1 border-neutral-600 px-3 py-2.5"
            >
              <div className="flex items-center gap-1 text-xl">
                <img
                  src={`src/assets/images/${
                    WEATHER_OBJECT[data.weather_code].day.image
                  }`}
                  alt="Sunny"
                  width={40}
                  height={40}
                />
                {formattedTime}
              </div>
              <span className="font-light text-neutral-50 text-[16px]">
                {unitConverter(tempUnit, data.temperature)}°
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default HourlyForecast
