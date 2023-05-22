import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { ContactList } from 'components/ContactList';
import { ContactForm } from 'components/ContactForm';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter';
import { SectionTitle } from 'components/common/SectionTitle';

export const App =() => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  
useEffect(() => {
  try {
    const storedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(storedContacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  } catch (error) {
    console.log('Error retrieving contacts from localStorage:', error);
  }
}, []);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.log('Error saving contacts to localStorage:', error);
    }
  }, [contacts, initialLoad]);

  const deleteContact = deleteId => {
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== deleteId))
  };

  const addContact = ({ name, number }) => {
    const isAdded = contacts.some(contact => contact.name === name);

    if (isAdded) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [contact, ...prevContacts]);
    console.log(localStorage.getItem('contacts'))
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value)
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

    const filteredContacts = getFilteredContacts();

    return (
      <Container>
        <SectionTitle title="Phonebook" as={'h1'}>
          Phonebook
        </SectionTitle>
        <ContactForm onSubmit={addContact} />

        <SectionTitle title="Contacts"></SectionTitle>
        <Filter onChange={changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      </Container>
    );
  }

