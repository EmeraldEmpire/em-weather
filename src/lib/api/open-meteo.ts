import { fetchWeatherApi } from 'openmeteo'

const url = 'https://api.open-meteo.com/v1/forecast'

// const removeDecimal = (num: number) => Math.trunc(num)

export const getWeatherData = async (
  geoLocation = { coordinates: { latitude: 14.5869, longitude: 121.0614 } }
) => {
  const params = {
    ...geoLocation.coordinates,
    daily: ['temperature_2m_max', 'temperature_2m_min', 'weather_code'],
    hourly: ['temperature_2m', 'weather_code'],
    current: [
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'relative_humidity_2m',
      'apparent_temperature',
      'temperature_2m',
      'is_day',
    ],
    // timezone: 'Asia/Singapore',
  }

  const responses = await fetchWeatherApi(url, params)

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0]

  // Attributes for timezone and locatio
  const utcOffsetSeconds = response.utcOffsetSeconds()

  const current = response.current()!
  const hourly = response.hourly()!
  const daily = response.daily()!

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      precipitation: current.variables(0)!.value(),
      weather_code: current.variables(1)!.value(),
      wind_speed_10m: current.variables(2)!.value(),
      relative_humidity_2m: current.variables(3)!.value(),
      apparent_temperature: current.variables(4)!.value(),
      temperature_2m: current.variables(5)!.value(),
      is_day: current.variables(6)!.value(),
    },
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000
          )
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      weather_code: hourly.variables(1)!.valuesArray(),
    },
    daily: {
      time: Array.from(
        {
          length:
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
        },
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000
          )
      ),
      temperature_2m_max: daily.variables(0)!.valuesArray(),
      temperature_2m_min: daily.variables(1)!.valuesArray(),
      weather_code: daily.variables(2)!.valuesArray(),
    },
  }

  return weatherData
}

export const getGeoLocation = async (searchParam: string = 'berlin') => {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${searchParam}&count=10&language=en&format=json`

  try {
    const res = await fetch(geoUrl)
    if (!res.ok) throw new Error(`Error with status code of: ${res.status}`)

    return await res.json()
  } catch (err) {
    console.error(err)
  }
}

// Note: The order of weather variables in the URL query and the indices below need to match!
