import Header from './components/header/Header'
import SearchWeatherLocation from './components/search-weathear-location/SearchWeatherLocation'
import Weather from './components/weather/Weather'

function App() {
  return (
    <>
      <Header />
      <main className="container flex flex-col gap-11 items-center justify-center">
        <h1 className="text-center text-[3.5rem] font-[550]">
          How's the sky looking today?{' '}
        </h1>
        <div className="flex justify-center max-w-[767px] w-full px-10">
          <SearchWeatherLocation />
        </div>

        <Weather />
      </main>
    </>
  )
}

export default App
