import { useState, useEffect } from 'react';
import './styles.css';
import personsService from './services/Service';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personsService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.data.id ? person : returnedPerson.data
              )
            );
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${newName}`, 'success');
          })
          .catch((error) => {
            showNotification(
              `Information of ${existingPerson.name} has already been removed from server`,
              'error'
            );
            setPersons(persons.filter((person) => person.id !== existingPerson.id));
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personsService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson.data));
        setNewName('');
        setNewNumber('');
        showNotification(`Added ${newName}`, 'success');
      });
    }
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        showNotification(`Deleted ${personToDelete.name}`, 'success');
      });
    }
  };

  const filteredPersons = searchTerm
    ? persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : persons;

    const showNotification = (message, type) => {
      setNotificationMessage({ message, type });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    };
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
