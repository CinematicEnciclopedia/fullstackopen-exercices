import axios from 'axios'

const getWeather = (capital) => {
  const apiKey = import.meta.env.VITE_API_KEY

  if (!apiKey) {
    return Promise.resolve(null)
  }

  const request = axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: { q: capital, appid: apiKey, units: 'metric' }
  })

  return request.then((response) => response.data)
}

export default {
  getWeather
}