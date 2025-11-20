import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { use } from 'react'
import { WeatherContext } from '@/contexts/WeatherProvider'
import { formatToWeekday } from '@/lib/utils'

const HourlyForecastSelectDate = () => {
  const { weatherData, filterDate, setFilterDate } = use(WeatherContext)

  return (
    <>
      <Select value={filterDate} onValueChange={setFilterDate}>
        <SelectTrigger className="border-0 bg-neutral-600 text-lg p-5">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          align="end"
          className="bg-neutral-800 border-neutral-600 w-[240px] p-1"
        >
          <SelectGroup className="[&_div:focus]:bg-neutral-700 [&_div]:text-neutral-0 [&_div]:py-2 [&_div:focus]:text-neutral-0 [&_div]:text-lg">
            {weatherData.daily.time.map((time: any) => (
              <SelectItem key={time} value={time}>
                {formatToWeekday(time)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

export default HourlyForecastSelectDate
