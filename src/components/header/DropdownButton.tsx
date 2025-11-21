import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import iconDropdown from '@/assets/images/icon-dropdown.svg'
import iconUnits from '@/assets/images/icon-units.svg'
import { useWeather } from '@/contexts/WeatherProvider'

const DropdownButton = () => {
  const {
    tempUnit,
    windUnit,
    precipitationUnit,
    setWindUnit,
    setTempUnit,
    setPrecipitationUnit,
  } = useWeather()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="bg-neutral-800 cursor-pointer hover:bg-neutral-800 hover:opacity-80 h-full py-2.5"
      >
        <Button className="flex items-center text-md font-medium">
          <img src={iconUnits} alt="icon-units" />
          <span>Units</span>
          <img src={iconDropdown} alt="icon-dropdown" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-60 p-1.5 bg-neutral-800 text-neutral-0 border-neutral-600 mt-1.5 custom-scrollbar"
      >
        <div>
          <h1 className="px-2 pb-2 pt-1.5">Switch to Imperial</h1>

          <div id="radio-group">
            <DropdownMenuLabel className="text-neutral-400 ">
              Temperature
            </DropdownMenuLabel>
            <label
              className={`radio-item flex justify-between py-2 px-2 rounded-md ${
                tempUnit === 'celsius' && 'bg-neutral-700'
              }`}
            >
              <input
                type="radio"
                name="temp"
                className="radio-input hidden"
                value="celsius"
                onChange={(e) => setTempUnit(e.target.value)}
              />

              <p className="radio-text">Celcius (°C)</p>
              {tempUnit === 'celsius' && <span>✓</span>}
            </label>
            <label
              className={`radio-item flex justify-between py-2 px-2 rounded-md ${
                tempUnit === 'fahrenheit' && 'bg-neutral-700'
              }`}
            >
              <input
                type="radio"
                name="temp"
                className="radio-input hidden"
                value="fahrenheit"
                onChange={(e) => setTempUnit(e.target.value)}
              />

              <p className="radio-text">Fahrenheit (°F)</p>
              {tempUnit === 'fahrenheit' && <span>✓</span>}
            </label>
          </div>
          <DropdownMenuSeparator className="bg-neutral-600 mx-0" />
          <div id="radio-group">
            <DropdownMenuLabel className="text-neutral-400 ">
              Wind Speed
            </DropdownMenuLabel>
            <label
              className={`radio-item flex justify-between py-2 px-2 rounded-md ${
                windUnit === 'kph' && 'bg-neutral-700'
              }`}
            >
              <input
                type="radio"
                name="wind"
                className="radio-input hidden"
                value="kph"
                onChange={(e) => setWindUnit(e.target.value)}
              />

              <p className="radio-text">km/h</p>
              {windUnit === 'kph' && <span>✓</span>}
            </label>
            <label
              className={`radio-item flex justify-between py-2 px-2 rounded-md ${
                windUnit === 'mph' && 'bg-neutral-700'
              }`}
            >
              <input
                type="radio"
                name="wind"
                className="radio-input hidden"
                value="mph"
                onChange={(e) => setWindUnit(e.target.value)}
              />

              <p className="radio-text">mph </p>
              {windUnit === 'mph' && <span>✓</span>}
            </label>
          </div>
          <DropdownMenuSeparator className="bg-neutral-600 mx-0" />
          <div id="radio-group">
            <DropdownMenuLabel className="text-neutral-400 ">
              Precipitation
            </DropdownMenuLabel>
            <label
              className={`radio-item flex justify-between py-2 px-2 rounded-md ${
                precipitationUnit === 'mm' && 'bg-neutral-700'
              }`}
            >
              <input
                type="radio"
                name="precipitation"
                className="radio-input hidden"
                value="mm"
                onChange={(e) => setPrecipitationUnit(e.target.value)}
              />

              <p className="radio-text">Millimeters (mm) </p>
              {precipitationUnit === 'mm' && <span>✓</span>}
            </label>
            <label
              className={`radio-item flex justify-between py-2 px-2 rounded-md ${
                precipitationUnit === 'in' && 'bg-neutral-700'
              }`}
            >
              <input
                type="radio"
                name="precipitation"
                className="radio-input hidden"
                value="in"
                onChange={(e) => setPrecipitationUnit(e.target.value)}
              />

              <p className="radio-text">Inches (in) </p>
              {precipitationUnit === 'in' && <span>✓</span>}
            </label>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownButton
