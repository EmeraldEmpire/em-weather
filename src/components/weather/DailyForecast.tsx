import { use } from 'react'
import { WeatherContext } from '@/contexts/WeatherProvider'
import { WEATHER_OBJECT } from '@/constants'
import { unitConverter } from '@/lib/utils'

const DailyForecast = () => {
  const { weatherData, tempUnit } = use(WeatherContext)

  return (
    <div>
      <h2 className="text-xl font-[550] my-5">Daily Forecast</h2>
      <div className="grid grid-cols-7 gap-4">
        {weatherData.daily.time.map((time: any, i: any) => {
          const now = new Date(time).toLocaleDateString('en-US', {
            weekday: 'short',
          })
          return (
            <div
              key={i}
              className="flex col-span-1 items-center flex-col gap-3 rounded-xl bg-neutral-800  px-2 py-3 border-1 border-neutral-600"
            >
              <p className="text-neutral-50 text-center">{now}</p>
              <img
                src={`src/assets/images/${
                  WEATHER_OBJECT[weatherData.daily.weather_code[i]].day.image
                }`}
                alt="Sunny"
                width={60}
                height={60}
              />
              <p className="flex justify-between w-full font-light text-neutral-50 text-[16px]">
                <span>
                  {unitConverter(
                    tempUnit,
                    weatherData.daily.temperature_2m_max[i]
                  )}
                  °
                </span>
                <span className="text-neutral-200">
                  {unitConverter(
                    tempUnit,
                    weatherData.daily.temperature_2m_min[i]
                  )}
                  °
                </span>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DailyForecast
