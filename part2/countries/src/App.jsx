import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    countriesService.getAll().then(
      (data) => {
        setCountries(data)
        setLoadError(false)
      },
      () => {
        setLoadError(true)
      }
    )
  }, [])

  const matched = query.trim()
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.trim().toLowerCase())
      )
    : []

  const isActive = query.trim() !== ''

  let content = null

  if (isActive) {
    if (loadError) {
      content = <p>Could not load country data from the server</p>
    } else if (matched.length === 0) {
      content = <p>No country matching &quot;{query}&quot; was found</p>
    } else if (matched.length > 10) {
      content = <p>Too many matches, specify another filter</p>
    } else if (matched.length === 1) {
      content = (
        <CountryDetail key={matched[0].name.common} country={matched[0]} />
      )
    } else {
      content = <CountryList countries={matched} onShow={setQuery} />
    }
  }

  return (
    <div>
      <div>
        find countries{' '}
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      {content}
    </div>
  )
}

export default App