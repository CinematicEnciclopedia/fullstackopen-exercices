import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const capital = country.capital?.[0]

    if (!capital) return

    let ignore = false

    weatherService.getWeather(capital).then((data) => {
      if (!ignore) setWeather(data)
    })

    return () => {
      ignore = true
    }
  }, [country])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital.join(', ')}</p>
      <p>area {country.area}</p>

      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flag} alt={`flag of ${country.name.common}`} />

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          {weather.weather && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          )}
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default CountryDetail