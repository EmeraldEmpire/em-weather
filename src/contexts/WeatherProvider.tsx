import { createContext, useState, useEffect, useContext } from 'react'
import { getWeatherData } from '@/lib/api/open-meteo'
import { useLocations } from './LocationsProvider'

export const WeatherContext = createContext<any>('')

interface WeatherProviderProps {
  children: React.ReactNode
}

const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const { currentLocation } = useLocations()
  const [weatherData, setWeatherData] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [filterDate, setFilterDate] = useState<any>('')
  const [windUnit, setWindUnit] = useState('kph')
  const [tempUnit, setTempUnit] = useState('celsius')
  const [precipitationUnit, setPrecipitationUnit] = useState('mm')

  const mapHourlyForecast = () => {
    return weatherData.hourly.time.map((dataItem: Date, i: number) => {
      const newData = {
        time: dataItem,
        temperature: weatherData.hourly.temperature_2m[i],
        weather_code: weatherData.hourly.weather_code[i],
      }

      return newData
    })
  }

  const filterHourlyForecastByDate = (targetDate = filterDate) => {
    const startOfDay = new Date(targetDate)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(targetDate)
    endOfDay.setHours(23, 59, 59, 999)

    const newData = mapHourlyForecast().filter((entry: any) => {
      const entryDate = new Date(entry.time)

      return entryDate >= startOfDay && entryDate <= endOfDay
    })

    return newData
  }

  const fetchWeather = async (geoLocationParam: any) => {
    try {
      setIsLoading(true)

      const data = await getWeatherData({
        coordinates: {
          latitude: geoLocationParam.latitude,
          longitude: geoLocationParam.longitude,
        },
      })

      setWeatherData(data)
      setFilterDate(data.daily.time[0])

      console.log(data)

      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!currentLocation) return
    fetchWeather(currentLocation)
  }, [currentLocation])

  const value = {
    weatherData,
    isLoading,
    filterDate,
    windUnit,
    tempUnit,
    precipitationUnit,
    setWindUnit,
    setTempUnit,
    setPrecipitationUnit,
    setFilterDate,
    fetchWeather,
    filterHourlyForecastByDate,
  }

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  )
}

export const useWeather = () => {
  return useContext(WeatherContext)
}

export default WeatherProvider
