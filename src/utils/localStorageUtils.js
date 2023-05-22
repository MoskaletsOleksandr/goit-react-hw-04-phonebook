export const saveContactsToLocalStorage = contacts => {
  try {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  } catch (error) {
    console.log('Error saving contacts to localStorage:', error);
  }
};

export const getContactsToLocalStorage = contacts => {
  try {
    const storedContacts = localStorage.getItem('contacts');
    return JSON.parse(storedContacts) || [];
  } catch (error) {
    console.log('Error retrieving contacts from localStorage:', error);
    return [];
  }
};
