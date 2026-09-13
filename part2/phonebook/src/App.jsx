import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existing = persons.find((p) => p.name === newName)

    if (existing) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(existing.id, { ...existing, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== existing.id ? p : updatedPerson))
            )
            setNewName('')
            setNewNumber('')
            setMessage({
              text: `Updated ${updatedPerson.name}`,
              type: 'success'
            })
            setTimeout(() => setMessage(null), 5000)
          })
          .catch(() => {
            setMessage({
              text: `Information of ${newName} has already been removed from server`,
              type: 'error'
            })
            setTimeout(() => setMessage(null), 5000)
            setPersons(persons.filter((p) => p.id !== existing.id))
          })
      }
    } else {
      const person = { name: newName, number: newNumber }

      personsService
        .create(person)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          setMessage({
            text: `Added ${createdPerson.name}`,
            type: 'success'
          })
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(() => {
          setMessage({
            text: `Could not add ${newName}`,
            type: 'error'
          })
          setTimeout(() => setMessage(null), 5000)
        })
    }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id))
      })
    }
  }

  const personsToShow = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App