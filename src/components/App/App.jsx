import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { ContactList } from 'components/ContactList';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { SectionTitle } from 'components/common/SectionTitle';
import {
  saveContactsToLocalStorage,
  getContactsToLocalStorage,
} from 'utils/localStorageUtils';
import { addContact } from 'utils/addContactUtils';
import { getFilteredContacts } from 'utils/filterUtils';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const storedContacts = getContactsToLocalStorage();
    setContacts(storedContacts);
  }, []);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    saveContactsToLocalStorage(contacts);
  }, [contacts, initialLoad]);

  const deleteContact = deleteId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== deleteId)
    );
  };

  const addContactHandler = ({ name, number }) => {
    addContact(contacts, setContacts, { name, number });
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  // const getFilteredContacts = () => {
  //   const normalizedFilter = filter.toLowerCase();

  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };

  const filteredContacts = getFilteredContacts(contacts, filter);

  return (
    <Container>
      <SectionTitle title="Phonebook" as={'h1'}>
        Phonebook
      </SectionTitle>
      <ContactForm onSubmit={addContactHandler} />

      <SectionTitle title="Contacts"></SectionTitle>
      <Filter onChange={changeFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
};
