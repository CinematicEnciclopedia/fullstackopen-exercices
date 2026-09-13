const Persons = ({ persons, removePerson }) => (
  <ul>
    {persons.map((person) => (
      <li key={person.id}>
        {person.name} {person.number}{' '}
        <button onClick={() => removePerson(person.id, person.name)}>
          delete
        </button>
      </li>
    ))}
  </ul>
)

export default Persons