const CountryList = ({ countries, onShow }) => (
  <div>
    {countries.map((country) => (
      <div key={country.name.common}>
        {country.name.common}{' '}
        <button onClick={() => onShow(country.name.common)}>show</button>
      </div>
    ))}
  </div>
)

export default CountryList