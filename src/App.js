import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
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

    const isNameExist = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());

    if (isNameExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      setPersons(persons.concat(newPerson));
    }
    setNewName('');
    setNewNumber('');
  };

  const filteredPersons = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

    return (
      <div>
        <h2>Phonebook</h2>
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
        <Persons persons={filteredPersons} />
      </div>
    );
};

export default App;
