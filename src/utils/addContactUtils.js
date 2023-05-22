import { nanoid } from 'nanoid';

export const addContact = (contacts, setContacts, { name, number }) => {
  const isAdded = contacts.some(contact => contact.name === name);

  if (isAdded) {
    alert(`${name} is already in contacts.`);
    return;
  }

  const newContact = {
    id: nanoid(),
    name,
    number,
  };

  setContacts(prevContacts => [newContact, ...prevContacts]);
};
