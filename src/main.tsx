import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import WeatherProvider from './contexts/WeatherProvider.tsx'
import LocationsProvider from './contexts/LocationsProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocationsProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </LocationsProvider>
  </StrictMode>
)
