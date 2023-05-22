import { Component } from 'react';
import { Container } from './App.styled';
import { ContactList } from 'components/ContactList';
import { ContactForm } from 'components/ContactForm';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter';
import { SectionTitle } from 'components/common/SectionTitle';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

    componentDidUpdate(_, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }


  deleteContact = deleteId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== deleteId),
    }));
  };

  addContact = ({ name, number }) => {
    const isAdded = this.state.contacts.some(contact => contact.name === name);

    if (isAdded) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <Container>
        <SectionTitle title="Phonebook" as={'h1'}>
          Phonebook
        </SectionTitle>
        <ContactForm onSubmit={this.addContact} />

        <SectionTitle title="Contacts"></SectionTitle>
        <Filter onChange={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
