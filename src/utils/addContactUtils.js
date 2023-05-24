import { nanoid } from 'nanoid';

export const addContact = (contacts, setContacts, { name, number }) => {
  const normalizedName = name.toLowerCase();
  const isAdded = contacts.some(
    contact => contact.name.toLowerCase() === normalizedName
  );

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
